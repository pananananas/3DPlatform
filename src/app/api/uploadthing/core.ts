import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { models3d } from "~/server/db/schema";

const f = createUploadthing();

const getMimeTypeFromExtension = (filename: string): string => {
  const extension = filename.split(".").pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    glb: "model/gltf-binary",
    gltf: "model/gltf+json",
    stl: "application/sla",
    ply: "application/x-ply",
    splat: "application/x-splat",
  };
  return mimeTypes[extension ?? ""] ?? "unsupported";
};


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  model3dUploader: f({ blob: { maxFileSize: "1GB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = auth();

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      const mimeType = getMimeTypeFromExtension(file.name);
      const filename = file.name;

      if (mimeType === "unsupported")
        throw new Error(`Unsupported file extension for file: ${filename}`);

      await db.insert(models3d).values({
        name: filename,
        fileType: mimeType,
        url: file.url,
        fileKey: file.key,
        userId: metadata.userId,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

  // This is for future image uploads:
  // imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 150 } })
  //   .middleware(async ({ req }) => {
  //     const user = auth();
  //     if (!user.userId) throw new Error("Unauthorized");
  //     return { userId: user.userId };
  //   })
  //   .onUploadComplete(async ({ metadata, file }) => {
  //     const filename = file.name;
  //     await db.insert(models3d).values({
  //       name: filename,
  //       url: file.url,
  //       fileKey: file.key,
  //       userId: metadata.userId,
  //     });

  //     return { uploadedBy: metadata.userId };
  //   }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
