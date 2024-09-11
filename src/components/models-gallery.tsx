"use client";
import { Link } from 'next-view-transitions'
import { toast } from "sonner";
import { SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { type Models } from "~/types/models";
import { Badge } from "~/components/ui/badge";
import { UploadDropzone } from "~/utils/uploadthing";
import { extractExtension, removeFileExtension } from "~/utils/filenames";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function ModelsGallery({ models3d }: Models) {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {models3d.map((model) => (
          <Link href={`/models/view/${model.id}`} key={model.id}>
            <Card className="rounded-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  {removeFileExtension(model.name)}{" "}
                  <Badge>.{extractExtension(model.name)}</Badge>
                </CardTitle>
                <CardDescription>
                  Created at:{" "}
                  {new Date(model.createdAt).toLocaleDateString("en-GB")}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <div className="py-6">
        <SignedIn>
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle>Upload model</CardTitle>
              <CardDescription>Add new 3D model</CardDescription>

              <CardContent>
                <UploadDropzone
                  className="ut-label:text-m p-3 ut-button:bg-neutral-800 ut-button:text-neutral-200 ut-label:text-neutral-900 ut-button:ut-uploading:after:bg-neutral-900 dark:border-neutral-700 dark:ut-button:bg-neutral-200 dark:ut-button:text-neutral-900 dark:ut-label:text-neutral-100"
                  endpoint="model3dUploader"
                  onClientUploadComplete={() => {
                    toast("Model uploaded successfully!", {
                      description: "Added model to gallery.",
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
                />
              </CardContent>
            </CardHeader>
          </Card>
        </SignedIn>
      </div>
    </>
  );
}
