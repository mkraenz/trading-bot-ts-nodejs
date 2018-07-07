import fs = require('fs');
import readline = require('readline');

export function importPrices(rel_path: string): number[]
{
    // Each line of csv data from yahoo finance has format 
    // 0. Date, 1. Open, 2. High, 3. Low, 4. Close 5. Volume 6. Adjusted Close
    let CLOSE_INDEX = 5;
    let lineReader = readline.createInterface({
        input: fs.createReadStream(rel_path)
    });

    let closingPrices = [];
    lineReader.on('line', (line) =>
    {
        let close = line.split(',')[CLOSE_INDEX];
        closingPrices.push(Number(close));
    });
    
    console.log("Imported " + closingPrices.length +" prices.")
    return closingPrices.shift(); // remove first line = data description
}
