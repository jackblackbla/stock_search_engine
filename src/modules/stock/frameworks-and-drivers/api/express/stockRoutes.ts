import express from 'express';
import { SearchStocksUseCase } from '../../../use-cases/SearchStocksUseCase';
import { PostgresStockRepository } from '../../database/PostgresStockRepository';

const router = express.Router();
const repository = new PostgresStockRepository();
const searchStocksUseCase = new SearchStocksUseCase(repository);

router.get('/stocks', async (req, res) => {
  try {
    const stocks = await searchStocksUseCase.execute(req.query);
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;