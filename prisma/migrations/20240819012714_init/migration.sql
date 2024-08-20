/*
  Warnings:

  - You are about to drop the column `categoryid` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryid_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categoryid",
ADD COLUMN     "category_id" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
