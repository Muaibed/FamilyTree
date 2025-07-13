import { Prisma } from "@/generated/prisma";

const personWithRelations = Prisma.validator<Prisma.PersonInclude>()({
  father: true,
  mother: true,
  fatherChildren: true,
  motherChildren: true,
  maleSpouses: {
    include: { male: true, female: true }
  },
  femaleSpouses: {
    include: { male: true, female: true }
  },
  family: {
    include: { rootPerson: true }
  },
});

export type PersonWithRelations = Prisma.PersonGetPayload<{
  include: typeof personWithRelations;
}>;

const familyWithRootPerson = Prisma.validator<Prisma.FamilyInclude>()({
  rootPerson: true,
})

export type FamilyWithRootPerson = Prisma.FamilyGetPayload<{
  include: typeof familyWithRootPerson;
}>;

const spouseRelationshipWithPartners = Prisma.validator<Prisma.SpouseRelationshipInclude>()({
  male: true,
  female: true,
})

export type SpouseRelationshipWithPartners = Prisma.SpouseRelationshipGetPayload<{
  include: typeof spouseRelationshipWithPartners
}>

