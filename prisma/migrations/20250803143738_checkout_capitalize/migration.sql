/*
  Warnings:

  - You are about to drop the column `checkoutAt` on the `sales_line` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sales_line" DROP COLUMN "checkoutAt",
ADD COLUMN     "checkOutAt" TIMESTAMP(3);
