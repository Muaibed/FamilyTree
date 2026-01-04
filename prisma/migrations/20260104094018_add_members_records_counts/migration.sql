-- CreateEnum
CREATE TYPE "Subscribtion" AS ENUM ('TRIAL', 'PRO');

-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "membersCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "recordsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subscribtion" "Subscribtion" NOT NULL DEFAULT 'TRIAL';
