"use server";
import { changeRotation, changeTranslation } from "~/server/queries";

export async function changeRotationAction(
  id: number,
  x: number,
  y: number,
  z: number,
) {
  await changeRotation(id, x, y, z);
}

export async function changeTranslationAction(
  id: number,
  x: number,
  y: number,
  z: number,
) {
  await changeTranslation(id, x, y, z);
}
