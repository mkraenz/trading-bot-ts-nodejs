
import {DbToMarketDataAdapter} from "./DbToMarketDataAdapter";
import {FakeBroker} from "./FakeBroker";
import {IBroker} from "./IBroker";
import {Bot} from "./Bot";
import { MarketDataViaGraphQL } from "./MarketDataViaGraphQL";
import {PERIODS, STOCK_SYMBOL} from "./settings";

async function main(): Promise<void>
{
    let marketData = new MarketDataViaGraphQL();
    let broker = new FakeBroker(marketData);
    let bot = new Bot(broker, marketData);
    bot.run(PERIODS);
}

main()