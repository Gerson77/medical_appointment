/*
  Warnings:

  - You are about to drop the column `is_finisched` on the `appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "is_finisched",
ADD COLUMN     "is_finished" BOOLEAN NOT NULL DEFAULT false;
