-- CreateTable
CREATE TABLE "SpouseRelationship" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "spouseId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SpouseRelationship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpouseRelationship_personId_spouseId_key" ON "SpouseRelationship"("personId", "spouseId");

-- AddForeignKey
ALTER TABLE "SpouseRelationship" ADD CONSTRAINT "SpouseRelationship_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpouseRelationship" ADD CONSTRAINT "SpouseRelationship_spouseId_fkey" FOREIGN KEY ("spouseId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
