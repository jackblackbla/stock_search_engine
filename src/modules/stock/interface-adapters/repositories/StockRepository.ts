import { Stock } from '../../entities/Stock';
import { ScreenerCriteria } from '../../../common/entities/ScreenerCriteria';

export interface StockRepository {
  searchStocks(criteria: ScreenerCriteria): Promise<Stock[]>;
}

export default StockRepository;