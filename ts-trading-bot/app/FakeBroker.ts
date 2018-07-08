import {DbToMarketDataAdapter} from "./DbToMarketDataAdapter";
import {IBroker} from "./IBroker";
import {MarketDataViaGraphQL} from "./MarketDataViaGraphQL";
import {INITIAL_STOCKS, FEE, INITIAL_CASH} from "./settings";

export class FakeBroker implements IBroker
{
    private _stocks = INITIAL_STOCKS;
    private _fee = FEE;
    private _cash = INITIAL_CASH;

    constructor(private marketData: MarketDataViaGraphQL) {}

    async buy(stocksymbol: string, amount: number): Promise<void>
    {
        let price = await this.price(stocksymbol);
        let total_price = this.fee + amount * price;
        if (total_price <= this.cash - this.fee) // must be able to sell with fees
        {
            console.log('total buy price: ', total_price);
            console.log('broker buy price: ', price);
            this._stocks += amount;
            this._cash -= total_price;
        } else
        {
            throw Error("Not enough cash to buy.");
        }
    }

    async sell(stocksymbol: string, amount: number): Promise<void>
    {
        if (amount <= this._stocks)
        {
            this._stocks -= amount;
            let price = await this.price(stocksymbol);
            let total_value = amount * price - this.fee;
            console.log("total sell value: " + total_value);
            console.log('broker sell price: ', price);
            this._cash += total_value;
        } else
        {
            throw Error("Not enough stocks to sell.")
        }
    }

    get stocks()
    {
        return this._stocks;
    }

    get fee()
    {
        return this._fee;
    }

    get cash()
    {
        return this._cash;
    }

    private price(stocksymbol: string): Promise<number>
    {
        return this.marketData.priceNoTimePassing(stocksymbol)
    }
}
