export const STOCK_SYMBOL = "EOAN.DE";
//export const STOCK_SYMBOL = "GOOG";




// db
export let dbUrl = "mongodb://localhost:27017/";
export let dbName = "pricedb";
export let dbPricesCollection = "prices";


// PricesFromCsv and others
//export const PATH_TO__PRICES = '../data/EOAN.DE.csv';

// PricesFromCsv and others
export const PATH_TO__PRICES = '../data/GOOG.csv';
//


// bot
//export const PERIODS = 504; // # entries in GOOG.csv
export const PERIODS = 256; // # entries in EOAN.DE.csv 
export const ROI = 1.2; // sell if ROI threshold is reached
export const AMOUNT = 6000 // buy and sell batches of AMOUNT stocks


// broker
export const INITIAL_STOCKS = 0;
export const FEE = 2.5;
export const INITIAL_CASH = 100000;