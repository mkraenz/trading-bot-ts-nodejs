import {PATH_TO__PRICES} from "./settings";
import fs = require('fs');

export function PricesFromCsv(rel_path: string): number[]
{
    // Each line of csv data from yahoo finance has format 
    // 0. Date, 1. Open, 2. High, 3. Low, 4. Close 5. Volume 6. Adjusted Close
    let CLOSE_INDEX = 5;
    let lines = fs.readFileSync(rel_path, 'utf-8').split('\n').filter(Boolean);
    let closingPrices: number[] = [];
    for(let i = 0; i< lines.length; i++)
    {
        let close = lines[i].split(',')[CLOSE_INDEX];
        closingPrices.push(Number(close));
    }
    closingPrices.shift(); // remove line for data description
    console.log("Imported " + closingPrices.length + " prices.");
    return closingPrices;
}
