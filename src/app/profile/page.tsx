import { ModelsPage } from "~/components/models-page";
import { getMyModels3d } from "~/server/queries";

export default async function HomePage() {
  const models3d = await getMyModels3d();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">My 3D Models</h1>
      <ModelsPage models3d={models3d} />
    </div>
  );
}
