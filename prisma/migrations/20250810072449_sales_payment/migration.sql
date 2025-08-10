-- CreateTable
CREATE TABLE "sales_payment" (
    "id" SERIAL NOT NULL,
    "salesId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sales_payment" ADD CONSTRAINT "sales_payment_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
