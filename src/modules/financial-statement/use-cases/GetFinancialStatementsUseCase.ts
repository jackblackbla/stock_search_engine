import { FinancialStatement } from '../entities/FinancialStatement';
import { FinancialStatementRepository } from '../interface-adapters/repositories/FinancialStatementRepository';

export class GetFinancialStatementsUseCase {
  constructor(private readonly repository: FinancialStatementRepository) {}

  async execute(companyId: string): Promise<FinancialStatement[]> {
    return this.repository.getFinancialStatements(companyId);
  }
}