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
    spouses: [string, boolean][];
  }
  
  export interface FamilyTreeData {
    people: Record<string, Person>;
    rootPersonId: string; 
  }

  export interface SpouseRelationship {
    id: string,
    person: string;
    spouse: string;
    isActive: boolean;
  }