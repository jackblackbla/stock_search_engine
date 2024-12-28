-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exchange" TEXT NOT NULL,
    "sector" TEXT,
    "industry" TEXT,
    "marketCap" DOUBLE PRECISION,
    "price" DOUBLE PRECISION,
    "volume" DOUBLE PRECISION,
    "dividendYield" DOUBLE PRECISION,
    "peRatio" DOUBLE PRECISION,
    "eps" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialStatement" (
    "id" SERIAL NOT NULL,
    "stockId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "costOfRevenue" DOUBLE PRECISION NOT NULL,
    "grossProfit" DOUBLE PRECISION NOT NULL,
    "operatingExpenses" DOUBLE PRECISION NOT NULL,
    "operatingIncome" DOUBLE PRECISION NOT NULL,
    "netIncome" DOUBLE PRECISION NOT NULL,
    "eps" DOUBLE PRECISION NOT NULL,
    "totalAssets" DOUBLE PRECISION NOT NULL,
    "totalLiabilities" DOUBLE PRECISION NOT NULL,
    "totalEquity" DOUBLE PRECISION NOT NULL,
    "currentAssets" DOUBLE PRECISION NOT NULL,
    "currentLiabilities" DOUBLE PRECISION NOT NULL,
    "longTermDebt" DOUBLE PRECISION NOT NULL,
    "operatingCashFlow" DOUBLE PRECISION NOT NULL,
    "investingCashFlow" DOUBLE PRECISION NOT NULL,
    "financingCashFlow" DOUBLE PRECISION NOT NULL,
    "freeCashFlow" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialStatement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_symbol_key" ON "Stock"("symbol");

-- AddForeignKey
ALTER TABLE "FinancialStatement" ADD CONSTRAINT "FinancialStatement_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
