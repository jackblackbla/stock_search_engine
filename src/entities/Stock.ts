export interface Stock {
  symbol: string;
  name: string;
  exchange: string;
  sector?: string;
  industry?: string;
  marketCap?: number;
  price?: number;
  volume?: number;
  dividendYield?: number;
  peRatio?: number;
  eps?: number;
}

export interface StockDetails extends Stock {
  description: string;
  website: string;
  ceo: string;
  employees: number;
  founded: number;
}