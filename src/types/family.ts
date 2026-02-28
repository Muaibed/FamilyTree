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
  family: true,
});

export type PersonWithRelations = Prisma.PersonGetPayload<{
  include: typeof personWithRelations;
}>;

export type FamilyWithRootPerson = Prisma.FamilyGetPayload<{
  include: Record<string, never>;
}>;

const spouseRelationshipWithPartners = Prisma.validator<Prisma.SpouseRelationshipInclude>()({
  male: true,
  female: true,
})

export type SpouseRelationshipWithPartners = Prisma.SpouseRelationshipGetPayload<{
  include: typeof spouseRelationshipWithPartners
}>

const familyTreeWithDetails = Prisma.validator<Prisma.FamilyTreeInclude>()({
  rootPerson: true,
  collapsedBranches: {
    include: { person: true }
  },
});

export type FamilyTreeWithDetails = Prisma.FamilyTreeGetPayload<{
  include: typeof familyTreeWithDetails;
}>;