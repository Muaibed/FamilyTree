-- CreateTable
CREATE TABLE "Family" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rootPersonId" INTEGER NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Family_rootPersonId_key" ON "Family"("rootPersonId");

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_rootPersonId_fkey" FOREIGN KEY ("rootPersonId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
