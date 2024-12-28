import 'dotenv/config';
import express from 'express';
import stockRoutes from './frameworks-and-drivers/api/express/stockRoutes';
import { PostgresStockRepository } from './frameworks-and-drivers/database/PostgresStockRepository';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', stockRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});