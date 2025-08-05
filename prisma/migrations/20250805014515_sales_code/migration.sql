/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `sales` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sales_code_key" ON "sales"("code");
