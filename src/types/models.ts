import { type Model3D } from "~/server/db/schema"

export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

export interface Models {
  models3d: Model3D[];
}
