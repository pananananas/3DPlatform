"use client";
import { UploadDropzone } from "~/utils/uploadthing";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export function AddModelDialog() {
  const router = useRouter();
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
        {/* <div className="grid gap-2"> */}
        {/* <div className="grid-row-4 grid items-center gap-2">
            <Label htmlFor="filename" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              placeholder="By default is the file name"
              className="col-span-3 text-neutral-500"
            />
          </div> */}
        <UploadDropzone
          className="ut-label:text-m ut-button:bg-neutral-800 ut-button:text-neutral-200 dark:ut-button:bg-neutral-200 dark:ut-button:text-neutral-900 ut-label:text-neutral-900 dark:ut-label:text-neutral-100 ut-button:ut-uploading:after:bg-neutral-900 p-3 dark:border-neutral-700"
          endpoint="model3dUploader"
          onClientUploadComplete={() => {
            toast("Model uploaded successfully");
            router.refresh();
          }}
        />
        {/* </div> */}
        {/* <DialogFooter> 
          <Button type="submit">Send model</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
