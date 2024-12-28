import { FinancialStatement } from '../../entities/FinancialStatement';

export class FinancialStatementPresenter {
  static present(financialStatements: FinancialStatement[]) {
    return financialStatements.map(statement => ({
      year: statement.year,
      revenue: statement.incomeStatement.revenue,
      netIncome: statement.incomeStatement.netIncome,
      totalAssets: statement.balanceSheet.totalAssets,
      totalLiabilities: statement.balanceSheet.totalLiabilities,
      operatingCashFlow: statement.cashFlowStatement.operatingCashFlow,
      freeCashFlow: statement.cashFlowStatement.freeCashFlow,
      keyMetrics: {
        profitMargin: statement.incomeStatement.netIncome / statement.incomeStatement.revenue,
        debtToEquity: statement.balanceSheet.totalLiabilities / statement.balanceSheet.totalEquity,
        currentRatio: statement.balanceSheet.currentAssets / statement.balanceSheet.currentLiabilities,
      }
    }));
  }
}