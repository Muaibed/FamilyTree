'use client';

import { SpouseRelationship } from '@/generated/prisma';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useDeleteSpouseRelationshipById } from '@/hooks/useSpouseRelationship';

const DeleteSpouseRelationship = ({
  relation,
  onSubmit,
}: {
  relation: SpouseRelationship;
  onSubmit: () => void;
}) => {
  const { mutateAsync: deleteRelation } = useDeleteSpouseRelationshipById();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteRelation(relation.id);
      toast('Relation has been deleted successfully.');
    } catch (error) {
      toast('Deleting Relation Failed.', { description: `${error}` });
    } finally {
      onSubmit();
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-2">
        هل أنت متأكد من حذف هذه العلاقة؟
      </h2>
      <Button
        className="p-1 pl-4 pr-4"
        variant="destructive"
        onClick={handleSubmit}
      >
        تأكيد
      </Button>
    </div>
  );
};

export default DeleteSpouseRelationship;
