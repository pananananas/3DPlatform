"use client";

import { UploadDropzone } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { toast } from "sonner";

export default function ModelUploadDropzone() {
  const router = useRouter();

  return (
    <UploadDropzone
      className="ut-label:text-m p-3 ut-button:bg-neutral-800 ut-button:text-neutral-200 ut-label:text-neutral-900 ut-button:ut-uploading:after:bg-neutral-900 dark:border-neutral-700 dark:ut-button:bg-neutral-200 dark:ut-button:text-neutral-900 dark:ut-label:text-neutral-100"
      endpoint="model3dUploader"
      onClientUploadComplete={() => {
        toast("Scene uploaded successfully!", {
          description: "Added scene to gallery.",
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        router.refresh();
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
      onUploadBegin={() => {
        toast("Uploading model...");
        posthog.capture("model_upload_started");
      }}
    />
  );
}
