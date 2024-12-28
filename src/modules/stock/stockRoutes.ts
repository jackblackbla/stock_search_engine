import express from 'express';
import { StockController } from '../../../interface-adapters/controllers/StockController';
import { PostgresStockRepository } from '../../database/PostgresStockRepository';
import { SearchStocksUseCase } from '../../../use-cases/SearchStocksUseCase';
import { GetFinancialStatementsUseCase } from '../../../use-cases/GetFinancialStatementsUseCase';

const router = express.Router();
const stockController = new StockController(
  new SearchStocksUseCase(new PostgresStockRepository()),
  new GetFinancialStatementsUseCase(new PostgresStockRepository())
);

router.get('/stocks', stockController.searchStocks.bind(stockController));
router.get('/stocks/:symbol/financial-statements', stockController.getFinancialStatements.bind(stockController));

export default router;