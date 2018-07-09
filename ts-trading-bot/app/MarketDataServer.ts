import { DbToMarketDataAdapter } from "./DbToMarketDataAdapter";
import { STOCK_SYMBOL } from "./settings";
import { buildSchema } from "graphql";
let express = require('express');
let express_graphql = require('express-graphql');

let schema = buildSchema(`
    type Query {
        price(stocksymbol: String!): Float
        priceNoTimePassing(stocksymbol: String!): Float
    }
`);

let marketData = new DbToMarketDataAdapter();
marketData.loadData(STOCK_SYMBOL);

let resolver = {
    price: (stocksymbol: string) => marketData.price(stocksymbol),
    priceNoTimePassing: (stocksymbol: string) => marketData.priceNoTimePassing(stocksymbol)
};

let app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
