//import {connect, Connection, Channel} from "amqplib";
//
//connect('amqp://localhost', (err: any, conn: Connection) =>
//{
//    console.log('connection to rabbitmq established')
//    conn.createChannel().then((ch) =>
//        {
//            let q = 'hello';
//            let msg = 'Hello World!'
//
//            ch.assertQueue(q, {durable: false});
//            ch.sendToQueue(q, new Buffer(msg));
//            console.log(" [x] Sent %s", msg)
//        })
//        .catch(err => {throw err;});
//    setTimeout(() =>
//    {
//        conn.close();
//        process.exit(0)
//    }, 500);
//});

import { LOG_QUEUE } from "../settings";

export function sendLogMsg(msg: string)
{
    var amqp = require('amqplib/callback_api');

    amqp.connect('amqp://localhost', function(err, conn)
    {
        conn.createChannel(function(err, ch)
        {
            var q = LOG_QUEUE;

            ch.assertQueue(q, {durable: false});
            // Note: on Node 6 Buffer.from(msg) should be used
            ch.sendToQueue(q, new Buffer(msg));
            console.log(" [x] Sent %s", msg);
        });
        setTimeout(function() {conn.close(); process.exit(0)}, 500);
    });
}