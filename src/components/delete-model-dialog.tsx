import { Button } from "~/components/ui/button";
import { deleteModel } from "~/server/queries";
import { LucideTrash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export function DeleteModelDialog({ params }: { params: { id: number } }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="submit" variant="destructive" size="icon">
          <LucideTrash2 strokeWidth={1.5} className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete model</DialogTitle>
          <DialogDescription>
            Do you want to delete this model?
          </DialogDescription>
        </DialogHeader>
        <form
          action={async () => {
            "use server";
            await deleteModel(params.id);
          }}
        >
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
