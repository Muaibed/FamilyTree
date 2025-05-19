export async function deletePerson(id: string) {
    const res = await fetch(`/api/person?id=${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) {
      throw new Error('Failed to delete person');
    }
  }