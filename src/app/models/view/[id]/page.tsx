import { changeRotationAction, changeTranslationAction } from "./actions";
import { extractExtension, removeFileExtension } from "~/utils/filenames";
import NavigateBackButton from "~/components/navigate-back-button";
import ViewModel from "~/components/3D/view-model";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { getModel3d } from "~/server/queries";
import { type Model3D } from "~/types/models";
import { Suspense } from "react";

async function Model3DViewer({ id }: { id: number }) {
  const model3d = await getModel3d(id);
  return <ViewModel model={model3d} />;
}

function ModelInfo({ model }: { model: Model3D }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          {removeFileExtension(model.name)}
        </h2>
        <Badge>{extractExtension(model.name)}</Badge>
      </div>
      <p className="pt-4">This is the right floating panel content.</p>
    </>
  );
}

export default async function ModelPage({
  params,
}: {
  params: { id: number };
}) {
  const model3d = await getModel3d(params.id);

  return (
    <div className="h-full w-full">
      <div className="fixed bottom-2 right-2 top-[72px] z-50 hidden w-72 transform rounded-lg border bg-background/85 p-6 md:block">
        <ModelInfo model={model3d} />
        <div className="flex flex-col gap-4 py-4">
          <form
            action={changeRotationAction.bind(null, params.id, 0, 3.14, 3.14)}
            method="post"
          >
            <Button type="submit">Change Rotation</Button>
          </form>
          <form
            action={changeTranslationAction.bind(null, params.id, 0, 0, 0)}
            method="post"
          >
            <Button type="submit">Reset Translation</Button>
          </form>
        </div>
      </div>

      <div className="items-center justify-center md:block">
        <NavigateBackButton />
      </div>

      <div className="fixed bottom-2 left-2 right-2 z-50 block transform rounded-lg border bg-background/85 p-6 md:hidden">
        <ModelInfo model={model3d} />
      </div>

      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center text-2xl">
            Loading 3D Model...
          </div>
        }
      >
        <Model3DViewer id={params.id} />
      </Suspense>
    </div>
  );
}
