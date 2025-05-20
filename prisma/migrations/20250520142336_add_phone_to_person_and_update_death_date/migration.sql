/*
  Warnings:

  - You are about to drop the column `deathData` on the `Person` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "deathData",
ADD COLUMN     "deathDate" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT;
