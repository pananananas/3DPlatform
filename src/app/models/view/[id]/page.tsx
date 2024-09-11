import { getModel3d } from "~/server/queries";
import ViewModel from "~/components/3D/view-model";

export default async function ModelPage({
  params,
}: {
  params: { id: number };
}) {
  const model3d = await getModel3d(params.id);
  const modelUrl = model3d.url;


  return (
    <div className="h-screen w-full">
      <ViewModel model={model3d} />
    </div>
  );
}
