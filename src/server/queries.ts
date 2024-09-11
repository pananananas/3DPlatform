import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

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
