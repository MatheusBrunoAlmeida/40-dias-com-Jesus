/*
  Warnings:

  - Added the required column `timestamp` to the `DaysRead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DaysRead" ADD COLUMN     "timestamp" TEXT NOT NULL;
