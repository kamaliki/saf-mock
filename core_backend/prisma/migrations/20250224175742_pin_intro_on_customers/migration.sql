-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('CustomerPayBillOnline');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "msisdn" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "personalBalance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "pin" VARCHAR(4) NOT NULL DEFAULT '0000',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "shortcode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "orgAccountBalance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "transID" TEXT NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "transTime" TIMESTAMP(3) NOT NULL,
    "transAmount" DECIMAL(65,30) NOT NULL,
    "businessShortCode" TEXT NOT NULL,
    "billRefNumber" TEXT,
    "invoiceNumber" TEXT NOT NULL,
    "orgAccountBalance" DECIMAL(65,30) NOT NULL,
    "thirdPartyTransID" TEXT,
    "MSISDN" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_msisdn_key" ON "Customer"("msisdn");

-- CreateIndex
CREATE UNIQUE INDEX "Business_shortcode_key" ON "Business"("shortcode");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transID_key" ON "Transaction"("transID");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_invoiceNumber_key" ON "Transaction"("invoiceNumber");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
