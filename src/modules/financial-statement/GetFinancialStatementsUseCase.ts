import { FinancialStatement } from '../entities/FinancialStatement';

export class GetFinancialStatementsUseCase {
  constructor(private financialDataRepository: FinancialDataRepository) {}

  async execute(symbol: string): Promise<FinancialStatement[]> {
    return this.financialDataRepository.getFinancialStatements(symbol);
  }
}

export interface FinancialDataRepository {
  getFinancialStatements(symbol: string): Promise<FinancialStatement[]>;
}