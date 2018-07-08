import {IMarketData} from "./IMarketData";
import fetch from 'node-fetch';

export class MarketDataViaGraphQL implements IMarketData
{

    async price(stocksymbol: string): Promise<number>
    {
        var query = `query price($stocksymbol: String!) {
                                price(stocksymbol: $stocksymbol)
                    }`;
        return await this.sendQueryToServer(query, stocksymbol, (data) => data.data.price);
    }

    async priceNoTimePassing(stocksymbol: string): Promise<number>
    {
        let query = `query priceNoTimePassing($stocksymbol: String!) {
                                priceNoTimePassing(stocksymbol: $stocksymbol)
                    }`;
        return await this.sendQueryToServer(query, stocksymbol, (data) => data.data.priceNoTimePassing);
    }


    sendQueryToServer(query: string, stocksymbol: string, cb: Function): Promise<number>
    {
        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: {stocksymbol: stocksymbol},
            })
        };

        let price: Promise<number> = fetch('http://localhost:4000/graphql', request)
            .then(r => r.json())
            .then(data => cb(data))
            .catch(err => {throw err});
        return price;
    }
}


import {STOCK_SYMBOL} from "./settings";

async function main()
{
    let md = new MarketDataViaGraphQL()
    console.log(await md.price(STOCK_SYMBOL))
    console.log(await md.priceNoTimePassing(STOCK_SYMBOL))
    console.log(await md.priceNoTimePassing(STOCK_SYMBOL))
    console.log(await md.price(STOCK_SYMBOL))
}

//main()
