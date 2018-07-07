import {DbToMarketDataAdapter} from "./DbToMarketDataAdapter";
import {IBroker} from "./IBroker";
import {IMarketData} from "./IMarketData";
import {INITIAL_STOCKS, FEE, INITIAL_CASH} from "./settings";

export class FakeBroker implements IBroker
{
    private _stocks = INITIAL_STOCKS;
    private _fee = FEE;
    private _cash = INITIAL_CASH;

    constructor(private dbToMarketDataAdapter: DbToMarketDataAdapter) {}

    buy(stocksymbol: string, amount: number): boolean
    {
        let total_price = this.fee + amount * this.price(stocksymbol);
        if (total_price <= this.cash - this.fee) // must be able to sell with fees
        {
            console.log('total buy price: ' + total_price);
            this._stocks += amount;
            this._cash -= total_price;
            return true;
        } else
        {
            throw Error("Not enough cash to buy.");
        }
    }

    sell(stocksymbol: string, amount: number): boolean
    {
        if (amount <= this._stocks)
        {
            this._stocks -= amount;
            let total_value = amount * this.price(stocksymbol) - this.fee;
            console.log("total sell value: " + total_value);
            this._cash += total_value;
            return true;
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

    private price(stocksymbol: string): number
    {
        return this.dbToMarketDataAdapter.previousPrice(stocksymbol)
    }

}