import {IMarketData} from "./IMarketData";
import {dbUrl, dbName, dbPricesCollection, STOCK_SYMBOL, PERIODS} from "./settings";
import {MongoClient, Db} from "mongodb";

export class DbToMarketDataAdapter
/**
 * Only provides prices for a single stock defined in settings.
 */
{
    private period = 0;
    private prices: number[];

    async loadData(stocksymbol: string): Promise<void>
    {
        let db: Db = await MongoClient.connect(dbUrl);
        let dbo = db.db(dbName);
        let query = {stocksymbol: stocksymbol};
        let result = await dbo.collection(dbPricesCollection).findOne(query)
        this.prices = result.prices;
        db.close();
    }

    price(stocksymbol: string): number
    {
        
        if(this.period == PERIODS ){ // instead of resetting server again and again
            console.log('server reset at period: ', this.period);
            this.period = 0
        }
        this.period++;
        return this.prices[this.period - 1];
    }

    priceNoTimePassing(stocksymbol: string): number
    {
        return this.period > 0 ? this.prices[this.period - 1] : this.prices[this.period]
    }
}


async function main(): Promise<void>
{
    let marketdata = new DbToMarketDataAdapter();
    await marketdata.loadData(STOCK_SYMBOL);
    console.log(marketdata.price(STOCK_SYMBOL))
    console.log(marketdata.price(STOCK_SYMBOL))
    console.log(marketdata.priceNoTimePassing(STOCK_SYMBOL))
}
