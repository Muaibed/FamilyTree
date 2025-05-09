import { prisma } from '@/lib/prisma';

export default async function handler(req:any, res:any) {
  const person = await prisma.person.create({
    data: {
      firstName: 'حسين',
      familyName: 'المعيبد',
      gender: 'MALE',
    },
  });

  res.json(person);
}
