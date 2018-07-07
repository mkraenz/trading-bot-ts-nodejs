import {IMarketData} from "./IMarketData";
import {dbUrl, dbName, dbPricesCollection, STOCK_SYMBOL} from "./settings";
import {MongoClient, Db} from "mongodb";

export class DbToMarketDataAdapter implements IMarketData
/**
 * Only provides prices for a single stock defined in settings.
 */
{
    private period = 0;
    private prices: number[];

    async loadData(): Promise<void>{
        let db: Db = await MongoClient.connect(dbUrl);
        let dbo = db.db(dbName);
        let query = {stocksymbol: STOCK_SYMBOL};
        let result = await dbo.collection(dbPricesCollection).findOne(query)
        this.prices = result.prices;
        db.close();
    }

    price(stocksymbol: string): number
    {
        this.period++;
        return this.prices[this.period];
    }

    previousPrice(stocksymbol: string)
    {
        return this.period > 0 ? this.prices[this.period - 1] : this.prices[this.period]
    }
}


async function main(): Promise<void>
{
    let marketdata = new DbToMarketDataAdapter();
    await marketdata.loadData();
    console.log(marketdata.price(STOCK_SYMBOL))
    console.log(marketdata.price(STOCK_SYMBOL))
    console.log(marketdata.previousPrice(STOCK_SYMBOL))
}

main()