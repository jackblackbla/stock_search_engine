export interface IncomeStatement {
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  operatingExpenses: number;
  operatingIncome: number;
  netIncome: number;
  eps: number;
}

export interface BalanceSheet {
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  currentAssets: number;
  currentLiabilities: number;
  longTermDebt: number;
}

export interface CashFlowStatement {
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  freeCashFlow: number;
}

export interface FinancialStatement {
  year: number;
  incomeStatement: IncomeStatement;
  balanceSheet: BalanceSheet;
  cashFlowStatement: CashFlowStatement;
}