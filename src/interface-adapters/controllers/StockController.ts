import { Request, Response } from 'express';
import { SearchStocksUseCase } from '../../use-cases/SearchStocksUseCase';
import { GetFinancialStatementsUseCase } from '../../use-cases/GetFinancialStatementsUseCase';
import { ScreenerCriteria } from '../../entities/ScreenerCriteria';

export class StockController {
  constructor(
    private searchStocksUseCase: SearchStocksUseCase,
    private getFinancialStatementsUseCase: GetFinancialStatementsUseCase
  ) {}

  async searchStocks(req: Request, res: Response) {
    try {
      const criteria: ScreenerCriteria = req.query;
      const stocks = await this.searchStocksUseCase.execute(criteria);
      res.json(stocks);
    } catch (error) {
      console.error('Error searching stocks:', error);
      res.status(500).json({
        error: 'Failed to search stocks',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      });
    }
  }

  async getFinancialStatements(req: Request, res: Response) {
    try {
      const { symbol } = req.params;
      const financialStatements = await this.getFinancialStatementsUseCase.execute(symbol);
      res.json(financialStatements);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get financial statements' });
    }
  }
}