import { Inbox } from "lucide-react";

const NoDataAlert = ({ title, message }: { title?: string, message?: string }) => {
  return (
    <div className="whitespace-pre-line flex flex-col items-center justify-center text-center py-10">
      <Inbox className="w-10 h-10 text-muted-foreground" />
      <p className="mt-2 text-lg font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  );
};

export default NoDataAlert;
