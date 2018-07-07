import { DbToMarketDataAdapter } from "./DbToMarketDataAdapter";
import {IBroker} from "./IBroker";
import {IMarketData} from "./IMarketData";

export class FakeBroker implements IBroker
{
    private _stocks = 0;
    private _fee = 2.5; // TODO: move to settings
    private _cash = 10000; // TODO: move to settings

    constructor(private dbToMarketDataAdapter: DbToMarketDataAdapter) {}

    buy(stocksymbol: string, amount: number): boolean
    {
        let total_price = this.fee + amount * this.price(stocksymbol);
        if (amount <= this._stocks && total_price <= this.cash - this.fee) // must be able to sell with fees
        {
            this._stocks += amount;
            this._cash -= total_price;
            return true;
        } else
        {
            return false;
        }
    }

    sell(stocksymbol: string, amount: number): boolean
    {
        let total_value = amount * this.price(stocksymbol) - this.fee;
        if (amount <= this._stocks && total_value <= this.cash)
        {
            this._stocks -= amount;
            this._cash += total_value;
            return true;
        } else
        {
            return false;
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