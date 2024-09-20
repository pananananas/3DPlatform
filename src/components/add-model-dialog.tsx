import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import ModelUploadDropzone from "./3d-model-upload-dropzone";

export function AddModelDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add model</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add model</DialogTitle>
          <DialogDescription>
            Upload a new model to the platform.
          </DialogDescription>
        </DialogHeader>
        <ModelUploadDropzone />
      </DialogContent>
    </Dialog>
  );
}
