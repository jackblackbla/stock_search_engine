import { PrismaClient } from '@prisma/client';
import yahooFinance from 'yahoo-finance2';

const prisma = new PrismaClient();

async function main() {
  const symbols = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'TSLA'];

  for (const symbol of symbols) {
    const quote = await yahooFinance.quote(symbol);
    const financials = await yahooFinance.quoteSummary(symbol, { modules: ['financialData', 'balanceSheetHistory'] });

    if (!quote || !financials?.financialData) {
      console.warn(`Skipping ${symbol} due to missing data`);
      continue;
    }

    const stockData = {
      symbol: quote.symbol,
      name: quote.shortName || '',
      exchange: quote.exchange || 'NYSE',
      sector: 'Unknown',
      industry: 'Unknown',
      marketCap: quote.marketCap || 0,
      price: quote.regularMarketPrice || 0,
      volume: quote.regularMarketVolume || 0,
      dividendYield: 0,
      peRatio: quote.trailingPE || 0,
      eps: quote.epsTrailingTwelveMonths || 0
    };

    const financialData = financials.financialData;
    const statementData = {
      year: new Date().getFullYear() - 1,
      revenue: financialData.totalRevenue || 0,
      costOfRevenue: 0, // Not available in API
      grossProfit: financialData.grossProfits || 0,
      operatingExpenses: 0, // Not available in API
      operatingIncome: financialData.operatingCashflow || 0,
      netIncome: 0,
      eps: financialData.earningsGrowth || 0,
      totalAssets: 0, // Not available in API
      totalLiabilities: 0, // Not available in API
      totalEquity: 0, // Not available in API
      currentAssets: 0, // Not available in API
      currentLiabilities: 0, // Not available in API
      longTermDebt: 0, // Not available in API
      operatingCashFlow: financialData.operatingCashflow || 0,
      investingCashFlow: 0, // Not available in API
      financingCashFlow: 0, // Not available in API
      freeCashFlow: financialData.freeCashflow || 0
    };

    await prisma.stock.upsert({
      where: { symbol },
      update: {},
      create: {
        ...stockData,
        financialStatements: {
          create: statementData
        }
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });