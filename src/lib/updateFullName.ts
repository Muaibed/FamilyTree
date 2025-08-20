import { prisma } from '@/lib/prisma'

export async function updateFullNames(personId: string, parentFullName = '') {
  const person = await prisma.person.findUnique({
    where: { id: personId },
    include: { family: true, father: true, fatherChildren: true, motherChildren: true },
  })

  if (!person) return

  let newFullName;
  if (!parentFullName) {
    if (person.father)
      parentFullName = person.father.fullName

    if (!person.father)
      newFullName = person.firstName + " " + person.family.name
  }

  if (parentFullName) {
    newFullName = person.gender === "MALE" ? `${person.firstName} بن ${parentFullName}`
      : `${person.firstName} بنت ${parentFullName}`
  }

  // console.log(newFullName)
  await prisma.person.update({
    where: { id: person.id },
    data: { fullName: newFullName },
  })

  if (person.gender === "MALE") 
    for (const child of person.fatherChildren) {
        await updateFullNames(child.id, newFullName)
  }
}
