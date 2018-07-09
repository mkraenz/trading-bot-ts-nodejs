import {dbUrl, dbName, LOG_COLLECTION, LOG_QUEUE} from "../settings";
import {MongoClient, Db} from "mongodb";
var amqp = require('amqplib/callback_api');
import assert = require('assert');

export function log()
{
    amqp.connect('amqp://localhost', function(err, conn)
    {
        conn.createChannel(function(err, ch)
        {
            let q = LOG_QUEUE;

            ch.assertQueue(q, {durable: false});

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
            ch.consume(q, function(msg)
            {
                logToDb(msg.content.toString())
                console.log("logged %s", msg.content.toString());
            }, {noAck: true});
        });
    });
}


function logToDb(msg: string): void
{
    MongoClient.connect(dbUrl)
        .then((db) => {writeToDb(db, msg);})
        .catch((err) => {throw err;});
}


function writeToDb(db: Db, msg: string): void
{
    let pricedb = db.db(dbName);
    let myobj = {msg: msg};
    let collection = pricedb.collection(LOG_COLLECTION);

    collection.insertOne(myobj)
        .then((result) => 
        {
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            console.log("Inserted 1 document into the log collection");
            db.close();
        })
        .catch((err) => {throw err;});
}

log()