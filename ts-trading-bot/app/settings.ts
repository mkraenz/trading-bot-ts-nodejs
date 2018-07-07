// db
export let dbUrl = "mongodb://localhost:27017/";
export let dbName = "pricedb";
export let dbPricesCollection = "prices";


// PricesFromCsv and others
export const PATH_TO__PRICES = '../data/pricesGOOG.csv';

// many
export const STOCK_SYMBOL = "GOOG";


// bot
export const PERIODS = 504; // # entries in pricesGOOG.csv
export const ROI = 1.5; // sell if ROI threshold is reached
export const AMOUNT = 50 // buy and sell batches of 50 stocks


// broker
export const INITIAL_STOCKS = 0;
export const FEE = 50;
export const INITIAL_CASH = 100000;