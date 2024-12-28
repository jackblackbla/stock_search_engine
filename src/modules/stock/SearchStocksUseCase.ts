import { Stock } from '../entities/Stock';
import { ScreenerCriteria } from '../entities/ScreenerCriteria';

export class SearchStocksUseCase {
  constructor(private stockRepository: StockRepository) {}

  async execute(criteria: ScreenerCriteria): Promise<Stock[]> {
    const allStocks = await this.stockRepository.getAllStocks();
    return this.filterStocks(allStocks, criteria);
  }

  private filterStocks(stocks: Stock[], criteria: ScreenerCriteria): Stock[] {
    return stocks.filter(stock => {
      if (criteria.minMarketCap && (stock.marketCap ?? Infinity) < criteria.minMarketCap) return false;
      if (criteria.maxMarketCap && (stock.marketCap ?? -Infinity) > criteria.maxMarketCap) return false;
      if (criteria.minPrice && (stock.price ?? Infinity) < criteria.minPrice) return false;
      if (criteria.maxPrice && (stock.price ?? -Infinity) > criteria.maxPrice) return false;
      if (criteria.minVolume && (stock.volume ?? Infinity) < criteria.minVolume) return false;
      if (criteria.minDividendYield && (stock.dividendYield ?? -Infinity) < criteria.minDividendYield) return false;
      if (criteria.maxPeRatio && (stock.peRatio ?? Infinity) > criteria.maxPeRatio) return false;
      if (criteria.minEps && (stock.eps ?? -Infinity) < criteria.minEps) return false;
      if (criteria.sectors && stock.sector && !criteria.sectors.includes(stock.sector)) return false;
      if (criteria.exchanges && stock.exchange && !criteria.exchanges.includes(stock.exchange)) return false;
      return true;
    });
  }
}

export interface StockRepository {
  getAllStocks(): Promise<Stock[]>;
}