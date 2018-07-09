/**
 * New typescript file
 */
export interface IBroker
{
    stocks: number;
    fee: number;
    cash: number;
    buy(stocksymbol: string, amount: number): Promise<void>;
    sell(stocksymbol: string, amount: number): Promise<void>;
}