/*
  Warnings:

  - The `stops` column on the `Tour` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "stops",
ADD COLUMN     "stops" TEXT[];
