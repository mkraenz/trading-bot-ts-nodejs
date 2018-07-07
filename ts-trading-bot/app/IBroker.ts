/**
 * New typescript file
 */
export interface IBroker
{
    stocks: number;
    fee: number;
    cash: number;
    buy(stocksymbol: string, amount: number): boolean;
    sell(stocksymbol: string, amount: number): boolean;
}