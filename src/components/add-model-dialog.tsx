"use client";
import { useTransitionRouter } from "next-view-transitions";
import { UploadDropzone } from "~/utils/uploadthing";
import { Button } from "~/components/ui/button";
import posthog from "posthog-js";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export function AddModelDialog() {
  const router = useTransitionRouter();
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
        <UploadDropzone
          className="ut-label:text-m p-3 ut-button:bg-neutral-800 ut-button:text-neutral-200 ut-label:text-neutral-900 ut-button:ut-uploading:after:bg-neutral-900 dark:border-neutral-700 dark:ut-button:bg-neutral-200 dark:ut-button:text-neutral-900 dark:ut-label:text-neutral-100"
          endpoint="model3dUploader"
          onClientUploadComplete={() => {
            toast("Model uploaded successfully");
            router.refresh();
          }}
          onUploadBegin={
            () => {
              toast("Uploading model...")
              posthog.capture("model_upload_started");
            }
          }
        />
      </DialogContent>
    </Dialog>
  );
}
