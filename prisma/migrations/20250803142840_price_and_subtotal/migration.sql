/*
  Warnings:

  - Added the required column `price` to the `sales_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `sales_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales_line" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL;
