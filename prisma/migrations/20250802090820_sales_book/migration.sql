/*
  Warnings:

  - You are about to drop the column `inDate` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `outDate` on the `sales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sales" DROP COLUMN "inDate",
DROP COLUMN "outDate",
ADD COLUMN     "bookedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "sales_line" ADD COLUMN     "checkInAt" TIMESTAMP(3),
ADD COLUMN     "checkoutAt" TIMESTAMP(3);
