import 'dotenv/config';
import express from 'express';
import stockRoutes from './modules/stock/frameworks-and-drivers/api/express/stockRoutes';
import { PostgresStockRepository } from './modules/stock/frameworks-and-drivers/database/PostgresStockRepository';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', stockRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});