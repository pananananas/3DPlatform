export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

export interface Model3D {
  id: number;
  userId: string;
  name: string;
  fileType: string;
  url: string;
  fileKey: string;
  createdAt: Date;
  updatedAt: Date | null;
  translateX: number;
  translateY: number;
  translateZ: number;
  rotateX:    number;
  rotateY:    number;
  rotateZ:    number;
  centerX:    number;
  centerY:    number;
  centerZ:    number;
}

export interface Models {
  models3d: Model3D[];
}
