import { Stock } from '../entities/Stock';
import { ScreenerCriteria } from '../../common/entities/ScreenerCriteria';
import { StockRepository } from '../interface-adapters/repositories/StockRepository';

export class SearchStocksUseCase {
  constructor(private readonly repository: StockRepository) {}

  async execute(criteria: ScreenerCriteria): Promise<Stock[]> {
    return this.repository.searchStocks(criteria);
  }
}