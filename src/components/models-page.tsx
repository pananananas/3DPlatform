"use client";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { type Models } from "~/types/models";
import { UploadDropzone } from "~/utils/uploadthing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function ModelsPage({ models3d }: Models) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">3D Models Gallery</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {models3d.map((model) => (
          <Link href={`/models/${model.id}`} key={model.id}>
            <Card className="rounded-md">
              <CardHeader>
                <CardTitle>{model.name}</CardTitle>
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
              <CardTitle>Add model</CardTitle>
              <CardDescription>
                Click here to upload a new 3D model
              </CardDescription>
              <CardContent>
                <UploadDropzone
                  endpoint="model3dUploader"
                  onClientUploadComplete={() => {
                    router.refresh();
                  }}
                />
              </CardContent>
            </CardHeader>
          </Card>
        </SignedIn>
      </div>
    </div>
  );
}
