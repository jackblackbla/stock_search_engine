import { PrismaClient } from '@prisma/client';
import { Stock } from '../../entities/Stock';
import { FinancialStatement } from '../../entities/FinancialStatement';
import { StockRepository } from '../../use-cases/SearchStocksUseCase';
import { FinancialDataRepository } from '../../use-cases/GetFinancialStatementsUseCase';

const prisma = new PrismaClient();

export class PostgresStockRepository implements StockRepository, FinancialDataRepository {
  async getAllStocks(): Promise<Stock[]> {
    const stocks = await prisma.stock.findMany();
    return stocks.map(stock => ({
      symbol: stock.symbol,
      name: stock.name,
      exchange: stock.exchange,
      sector: stock.sector ?? undefined,
      industry: stock.industry ?? undefined,
      marketCap: stock.marketCap ?? undefined,
      price: stock.price ?? undefined,
      volume: stock.volume ?? undefined,
      dividendYield: stock.dividendYield ?? undefined,
      peRatio: stock.peRatio ?? undefined,
      eps: stock.eps ?? undefined
    }));
  }

  async getFinancialStatements(symbol: string): Promise<FinancialStatement[]> {
    const stock = await prisma.stock.findUnique({
      where: { symbol },
      include: { financialStatements: true }
    });

    if (!stock?.financialStatements) return [];

    return stock.financialStatements.map(statement => ({
      year: statement.year,
      incomeStatement: {
        revenue: statement.revenue,
        costOfRevenue: statement.costOfRevenue,
        grossProfit: statement.grossProfit,
        operatingExpenses: statement.operatingExpenses,
        operatingIncome: statement.operatingIncome,
        netIncome: statement.netIncome,
        eps: statement.eps
      },
      balanceSheet: {
        totalAssets: statement.totalAssets,
        totalLiabilities: statement.totalLiabilities,
        totalEquity: statement.totalEquity,
        currentAssets: statement.currentAssets,
        currentLiabilities: statement.currentLiabilities,
        longTermDebt: statement.longTermDebt
      },
      cashFlowStatement: {
        operatingCashFlow: statement.operatingCashFlow,
        investingCashFlow: statement.investingCashFlow,
        financingCashFlow: statement.financingCashFlow,
        freeCashFlow: statement.freeCashFlow
      }
    }));
  }
}