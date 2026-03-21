'use client';

import { PersonWithRelations } from '@/types/family';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useDeletePerson } from '@/hooks/usePerson';

const DeletePerson = ({
  person,
  onSubmit,
}: {
  person: PersonWithRelations;
  onSubmit: () => void;
}) => {
  const { mutateAsync: deletePerson } = useDeletePerson();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deletePerson(person.id);
      toast(`${person.firstName} has been deleted successfully.`);
    } catch (error) {
      toast(`Deleting ${person.firstName} Failed.`, { description: `${error}` });
    } finally {
      onSubmit();
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4 mt-2">
        هل أنت متأكد من حذف {person.firstName}؟
      </h2>
      <Button
        className="p-1 pl-4 pr-4 w-1/6"
        variant="destructive"
        onClick={handleSubmit}
      >
        حذف
      </Button>
    </div>
  );
};

export default DeletePerson;
