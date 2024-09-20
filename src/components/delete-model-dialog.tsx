import { Button } from "~/components/ui/button";
import { IconTrash } from "./icons/icon-trash";
import { deleteModel } from "~/server/queries";
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
          <IconTrash />
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
