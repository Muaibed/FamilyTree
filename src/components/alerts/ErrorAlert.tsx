import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorPage({
  title = "Something went wrong",
  message = "We couldn’t load the data. Please try again later.",
}: {
  title?: string;
  message?: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <AlertTriangle className="h-12 w-12 text-destructive" />
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground max-w-md">{message}</p>
      <Button variant="outline" onClick={() => router.refresh()}>
        Try Again
      </Button>
    </div>
  );
}
