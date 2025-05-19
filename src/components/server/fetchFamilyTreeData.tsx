export async function getFamilyTreeData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/json`, {
        // next: { revalidate: 10 }  
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch family tree data");
    }
  
    const data = await res.json();
    return data;
  }
  