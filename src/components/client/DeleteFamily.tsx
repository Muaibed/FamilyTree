'use client';

import { Family } from '@/generated/prisma';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useDeleteFamily } from '@/hooks/useFamily';

const DeleteFamily = ({
  family,
  onSubmit,
}: {
  family: Family;
  onSubmit: () => void;
}) => {
  const { mutateAsync: deleteFamily } = useDeleteFamily();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteFamily(family.id);
      toast(`${family.name} has been deleted successfully.`);
    } catch (error) {
      toast(`Deleting ${family.name} Failed.`, { description: `${error}` });
    } finally {
      onSubmit();
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-2">
        هل أنت متأكد من حذف {family.name}؟
      </h2>
      <Button
        className="p-1 pl-4 pr-4 w-1/6"
        variant="destructive"
        onClick={handleSubmit}
      >
        تأكيد
      </Button>
    </div>
  );
};

export default DeleteFamily;
