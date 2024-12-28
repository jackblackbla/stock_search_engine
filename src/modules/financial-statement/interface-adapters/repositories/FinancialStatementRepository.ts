import { FinancialStatement } from '../../entities/FinancialStatement';

export interface FinancialStatementRepository {
  getFinancialStatements(companyId: string): Promise<FinancialStatement[]>;
}