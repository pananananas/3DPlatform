import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { models3d as models3dTable } from "./db/schema";
import { eq } from "drizzle-orm";

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
  // const user = auth();
  // if (!user.userId) throw new Error("Unauthorized");

  const model3d = await db.query.models3d.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!model3d) throw new Error("Model not found");

  // if (image.userId !== user.userId) throw new Error("Unauthorized");

  return model3d;
}

export async function changeRotation(
  id: number,
  rotX: number,
  rotY: number,
  rotZ: number,
) {
  const updatedModel = await db
    .update(models3dTable)
    .set({
      rotateX: rotX,
      rotateY: rotY,
      rotateZ: rotZ,
    })
    .where(eq(models3dTable.id, id))
    .returning();

  if (!updatedModel || updatedModel.length === 0) {
    throw new Error("Model not found or update failed");
  }

  return updatedModel[0];
}

export async function changeTranslation(
  id: number,
  transX: number,
  transY: number,
  transZ: number,
) {
  const updatedModel = await db
    .update(models3dTable)
    .set({
      translateX: transX,
      translateY: transY,
      translateZ: transZ,
    })
    .where(eq(models3dTable.id, id))
    .returning();

  if (!updatedModel || updatedModel.length === 0) {
    throw new Error("Model not found or update failed");
  }

  return updatedModel[0];
}
