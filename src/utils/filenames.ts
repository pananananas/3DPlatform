export const removeFileExtension = (filename: string) => {
  return filename.replace(/\.[^/.]+$/, "");
};

export const extractExtension = (filename: string) => {
  return filename.split(".").pop()?.toLowerCase();
};
