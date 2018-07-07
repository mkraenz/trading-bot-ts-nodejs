import {importPrices} from "./PricesImporter";
import {dbUrl, dbName, dbPricesCollection, STOCK_SYMBOL, PATH_TO__PRICES} from "./settings";
import {MongoClient, Db} from "mongodb";
import assert = require('assert');

export function writePricesToDb(prices: number[], stocksymbol: string): void
{
    MongoClient.connect(dbUrl)
    .then((db) => 
    {
        insertPrices(db.db(dbName), prices, stocksymbol, (err, result) =>
        {
            console.log(result)
            db.close();
        });
    })
    .catch((err) => {throw err;});
}

function insertPrices(db: Db, prices: number[], 
    stocksymbol: string, callback: Function): void
{
    let myobj = {stocksymbol: stocksymbol, prices: prices};
    let collection = db.collection(dbPricesCollection);
    
    collection.insert(myobj, (err, result) =>
    {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        console.log("Inserted 1 document into the document collection");
        callback(result);
    });
}

writePricesToDb(importPrices(PATH_TO__PRICES), STOCK_SYMBOL);