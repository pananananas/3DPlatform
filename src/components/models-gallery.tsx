"use client";
import { extractExtension, removeFileExtension } from "~/utils/filenames";
import ModelUploadDropzone from "./3d-model-upload-dropzone";
import { Badge } from "~/components/ui/badge";
import { Link } from "next-view-transitions";
import { type Models } from "~/types/models";
import { SignedIn } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function ModelsGallery({ models3d }: Models) {

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {models3d.map((model) => (
          <Card className="min-w-60 rounded-md" key={model.id}>
            <Link href={`/models/view/${model.id}`}>
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
            </Link>
          </Card>
        ))}
      </div>
      <div className="py-6">
        <SignedIn>
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle>Upload model</CardTitle>
              <CardDescription>Add new 3D model</CardDescription>

              <CardContent>
                <ModelUploadDropzone/>
              </CardContent>
            </CardHeader>
          </Card>
        </SignedIn>
      </div>
    </>
  );
}
