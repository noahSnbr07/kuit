/*
  Warnings:

  - You are about to drop the column `severity` on the `Habit` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Habit_name_key";

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "severity",
ADD COLUMN     "value" INTEGER NOT NULL DEFAULT 2;

-- DropEnum
DROP TYPE "Severity";
