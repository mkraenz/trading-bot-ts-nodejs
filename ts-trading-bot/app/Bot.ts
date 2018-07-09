import {IBroker} from "./IBroker";
import {IMarketData} from "./IMarketData";
import {STOCK_SYMBOL, AMOUNT, ROI} from "./settings";

export class Bot
{

    private purchasePrice: number = 0;

    constructor(private broker: IBroker, private marketData: IMarketData) {}

    async run(periods: number)
    {

        await this.buyInitialStocks();
        for (let i = 0; i < periods; i++)
        {
            if (await this.isProfitableSell())
            {
                this.broker.sell(STOCK_SYMBOL, this.broker.stocks);
                console.log("sell in period: " + i);
            }

            if (i == periods - 1)
            {
                console.log('final cash = ' + this.broker.cash)
            }
        }
    }

    private async buyInitialStocks()
    {
        this.purchasePrice = await this.marketData.price(STOCK_SYMBOL);
        await this.broker.buy(STOCK_SYMBOL, AMOUNT);
        console.log('bot buy price: ', this.purchasePrice)
        console.log('cash after initial buy: ' + this.broker.cash);
    }

    private async isProfitableSell()
    {
        let curr_rev = await this.current_revenue();
        return curr_rev > ROI * this.total_costs();
    }

    private async current_revenue(): Promise<number>
    {
        return (await this.marketData.price(STOCK_SYMBOL)) * this.broker.stocks - this.broker.fee;
    }

    private total_costs(): number
    {
        return this.purchasePrice * this.broker.stocks + this.broker.fee;
    }
}