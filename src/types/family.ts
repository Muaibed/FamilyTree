export interface Person {
    id: string;
    name: string;
    familyName: string;
    gender: 'MALE' | 'FEMALE';
    phone: string;
    birthDate?: string;
    deathDate?: string;
    fatherId?: string;
    motherId?: string;
    childrenIds: string[];
    spouses: string[];
  }
  
  export interface FamilyTreeData {
    people: Record<string, Person>;
    rootPersonId: string; 
  }