import {IBroker} from "./IBroker";
import {IMarketData} from "./IMarketData";
import {STOCK_SYMBOL, AMOUNT, ROI} from "./settings";

export class Bot
{

    private purchasePrice: number = 0;

    constructor(private broker: IBroker, private marketData: IMarketData) {}

    run(periods: number)
    {

        this.buyInitialStocks();
        for (let i = 0; i < periods; i++)
        {
            if (this.profitableSell())
            {
                this.broker.sell(STOCK_SYMBOL, this.broker.stocks); // todo: try catch?
                console.log("sell in period: " + i);
            }
        }
    }

    private buyInitialStocks()
    {
        this.purchasePrice = this.marketData.price(STOCK_SYMBOL);
        this.broker.buy(STOCK_SYMBOL, AMOUNT); // todo: try catch?
        console.log('cash after initial buy: ' + this.broker.cash);
    }

    private profitableSell()
    {
        return this.current_revenue() > ROI * this.total_costs();
    }


    private current_revenue(): number
    {
        return this.marketData.price(STOCK_SYMBOL) * this.broker.stocks - this.broker.fee;
    }

    private total_costs(): number
    {
        return this.purchasePrice * this.broker.stocks + this.broker.fee; // TODO this is almost a constant
    }
}