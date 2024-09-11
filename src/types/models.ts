export interface Model3D {
  id: number;
  userId: string;
  name: string;
  fileType: string;
  url: string;
  fileKey: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Models {
  models3d: Model3D[];
}
