import { ScenesGallery } from "~/components/scenes-gallery";
import { getModels3d } from "~/server/queries";

export default async function HomePage() {
  const models3d = await getModels3d();

  return (
    <div className="lg:px-16 xl:px-32">
      <div className="container mx-auto px-4 py-32">
        <h1 className="mb-6 text-3xl font-bold">3D Scenes Coming Soon</h1>
        <ScenesGallery models3d={models3d} />
      </div>
    </div>
  );
}
