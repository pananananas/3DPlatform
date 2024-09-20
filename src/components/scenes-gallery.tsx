
// import { Link } from 'next-view-transitions'
import { type Models } from "~/types/models";
import { SignedIn } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import ModelUploadDropzone from "./3d-model-upload-dropzone";

// const removeFileExtension = (filename: string) => {
//   return filename.replace(/\.[^/.]+$/, "");
// };

// const extractExtension = (filename: string) => {
//   return filename.split(".").pop()?.toLowerCase();
// };

export function ScenesGallery({ models3d }: Models) {


  return (
    <>
      {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {models3d.map((model) => (
          <Card className="rounded-md" key={model.id}>
            <Link href={`/models/view/${model.id}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  {removeFileExtension(model.name)}{" "}
                  <Badge>{extractExtension(model.name)}</Badge>
                </CardTitle>
                <CardDescription>
                  Created at:{" "}
                  {new Date(model.createdAt).toLocaleDateString("en-GB")}
                </CardDescription>
              </CardHeader>
              </Link>
            </Card>
        ))}
      </div> */}
      <div className="py-6">
        <SignedIn>
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle>Upload scene</CardTitle>
              <CardDescription>Add new 3D scene</CardDescription>

              <CardContent>
                <ModelUploadDropzone />
              </CardContent>
            </CardHeader>
          </Card>
        </SignedIn>
      </div>
    </>
  );
}
