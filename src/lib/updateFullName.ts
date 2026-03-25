import { prisma } from '@/lib/prisma'

export async function updateFullNames(personId: string, parentFullName = '') {
  const person = await prisma.person.findUnique({
    where: { id: personId },
    select: {
      id: true,
      firstName: true,
      gender: true,
      family: { select: { name: true } },
      ...(parentFullName === '' && {
        father: { select: { fullName: true } },
      }),
      fatherChildren: { select: { id: true } },
    },
  })

  if (!person) return

  let newFullName: string | undefined;
  if (!parentFullName) {
    const father = (person as any).father;
    if (father)
      parentFullName = father.fullName

    if (!father)
      newFullName = person.firstName + " " + person.family.name
  }

  if (parentFullName) {
    newFullName = person.gender === "MALE"
      ? `${person.firstName} بن ${parentFullName}`
      : `${person.firstName} بنت ${parentFullName}`
  }

  await prisma.person.update({
    where: { id: person.id },
    data: { fullName: newFullName },
  })

  if (person.gender === "MALE" && person.fatherChildren.length > 0) {
    await Promise.all(
      person.fatherChildren.map(child => updateFullNames(child.id, newFullName))
    )
  }
}
