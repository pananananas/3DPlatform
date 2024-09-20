import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { models3d as models3dTable } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

export const utapi = new UTApi();

export async function getModels3d() {
  const models3d = await db.query.models3d.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return models3d;
}

export async function getMyModels3d() {
  const user = auth();
  if (!user.userId) throw new Error("User not found");

  const models3d = await db.query.models3d.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return models3d;
}

export async function getModel3d(id: number) {
  const model3d = await db.query.models3d.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!model3d) throw new Error("Model not found");

  return model3d;
}

export async function changeRotation(
  id: number,
  rotX: number,
  rotY: number,
  rotZ: number,
) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const updatedModel = await db
    .update(models3dTable)
    .set({
      rotateX: rotX,
      rotateY: rotY,
      rotateZ: rotZ,
    })
    .where(and(eq(models3dTable.id, id), eq(models3dTable.userId, user.userId)))
    .returning();

  if (!updatedModel || updatedModel.length === 0) {
    throw new Error("Model not found or update failed");
  }

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "Edited Rotation",
    properties: {
      modelId: id,
    },
  });

  revalidatePath(`/models/view/${id}`);
  redirect(`/models/view/${id}`);
  return updatedModel[0];
}

export async function changeTranslation(
  id: number,
  transX: number,
  transY: number,
  transZ: number,
) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const updatedModel = await db
    .update(models3dTable)
    .set({
      translateX: transX,
      translateY: transY,
      translateZ: transZ,
    })
    .where(and(eq(models3dTable.id, id), eq(models3dTable.userId, user.userId)))
    .returning();

  if (!updatedModel || updatedModel.length === 0) {
    throw new Error("Model not found or update failed");
  }

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "Edited Translation",
    properties: {
      modelId: id,
    },
  });

  revalidatePath(`/models/view/${id}`);
  redirect(`/models/view/${id}`);
  return updatedModel[0];
}

export async function deleteModel(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(models3dTable)
    .where(
      and(eq(models3dTable.id, id), eq(models3dTable.userId, user.userId)),
    );
  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "Model Deleted",
    properties: {
      modelId: id,
    },
  });

  revalidatePath("/models");
  redirect("/models");
}
