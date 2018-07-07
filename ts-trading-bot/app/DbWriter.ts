import {PricesFromCsv} from "./PricesFromCsv";
import {dbUrl, dbName, dbPricesCollection, STOCK_SYMBOL, PATH_TO__PRICES} from "./settings";
import {MongoClient, Db} from "mongodb";
import assert = require('assert');

export function writePricesToDb(prices: number[], stocksymbol: string): void
{
    MongoClient.connect(dbUrl)
        .then((db) => {insertPrices(db, prices, stocksymbol);})
        .catch((err) => {throw err;});
}

function insertPrices(db: Db, prices: number[],
    stocksymbol: string): void
{
    let pricedb = db.db(dbName);
    let myobj = {stocksymbol: stocksymbol, prices: prices};
    let collection = pricedb.collection(dbPricesCollection);
    console.log(collection)

    collection.insertOne(myobj)
        .then((result) => 
        {
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            console.log("Inserted 1 document into the document collection");
            db.close();
        })
        .catch((err) => {throw err;});
}

writePricesToDb(PricesFromCsv(PATH_TO__PRICES), STOCK_SYMBOL);