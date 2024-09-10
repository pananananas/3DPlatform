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
