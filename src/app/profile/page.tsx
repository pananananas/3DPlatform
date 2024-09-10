import { ModelsGallery } from "~/components/models-gallery";
import { getMyModels3d } from "~/server/queries";

export default async function HomePage() {
  const models3d = await getMyModels3d();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-6 text-3xl font-bold">My 3D Models</h1>
      <ModelsGallery models3d={models3d} />
    </div>
  );
}
