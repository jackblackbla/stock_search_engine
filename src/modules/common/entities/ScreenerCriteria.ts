export interface ScreenerCriteria {
  minMarketCap?: number;
  maxMarketCap?: number;
  minPrice?: number;
  maxPrice?: number;
  minVolume?: number;
  minDividendYield?: number;
  maxPeRatio?: number;
  minEps?: number;
  sectors?: string[];
  exchanges?: string[];
  minRevenueGrowth?: number;
  minProfitMargin?: number;
  maxDebtToEquity?: number;
}