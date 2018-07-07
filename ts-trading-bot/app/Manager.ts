
import {DbToMarketDataAdapter} from "./DbToMarketDataAdapter";
import {FakeBroker} from "./FakeBroker";
import {IBroker} from "./IBroker";
import {Bot} from "./Bot";
import {PERIODS} from "./settings";

async function main(): Promise<void>
{
    let marketData = new DbToMarketDataAdapter();
    await marketData.loadData();
    let broker = new FakeBroker(marketData);
    let bot = new Bot(broker, marketData);


    bot.run(PERIODS);
    console.log('final cash = ' + broker.cash)
}

main()