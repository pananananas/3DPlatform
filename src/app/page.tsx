"use client";

import Link from "next/link";
import { db } from "~/server/db";
import { SignedIn } from "@clerk/nextjs";
import { UploadDropzone } from "~/utils/uploadthing";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useRouter } from "next/navigation";

// export const dynamic = "force-dynamic";

export default async function HomePage() {
  const models3d = await db.query.models3d.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">3D Models Gallery</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {models3d.map((model) => (
          <Link href={`/models/${model.id}`} key={model.id}>
            <Card className="rounded-md">
              {/* <CardContent>
                <p>Card Content</p>
              </CardContent> */}
              <CardHeader>
                <CardTitle>{model.name}</CardTitle>
                <CardDescription>
                  Created: {new Date(model.createdAt).toLocaleDateString()}
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
