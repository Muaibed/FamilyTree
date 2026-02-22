-- DropForeignKey
ALTER TABLE "SpouseRelationship" DROP CONSTRAINT "SpouseRelationship_femaleId_fkey";

-- DropForeignKey
ALTER TABLE "SpouseRelationship" DROP CONSTRAINT "SpouseRelationship_maleId_fkey";

-- AddForeignKey
ALTER TABLE "SpouseRelationship" ADD CONSTRAINT "SpouseRelationship_maleId_fkey" FOREIGN KEY ("maleId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpouseRelationship" ADD CONSTRAINT "SpouseRelationship_femaleId_fkey" FOREIGN KEY ("femaleId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
