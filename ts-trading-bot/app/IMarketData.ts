export interface IMarketData{
    price(stocksymbol: string): Promise<number>;
}