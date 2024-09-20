import { extractExtension, removeFileExtension } from "~/utils/filenames";
import { DeleteModelDialog } from "~/components/delete-model-dialog";
import NavigateBackButton from "~/components/navigate-back-button";
import ViewModel from "~/components/3D/view-model";
import { Button } from "~/components/ui/button";
import { type Model3D } from "~/types/models";
import { Badge } from "~/components/ui/badge";
import { Suspense } from "react";
import {
  changeRotation,
  changeTranslation,
  getModel3d,
} from "~/server/queries";
import { UserCard } from "~/components/user-card";


function ModelInfo({ model }: { model: Model3D }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          {removeFileExtension(model.name)}
        </h2>
        <Badge>{extractExtension(model.name)}</Badge>
      </div>
    </>
  );
}

export default async function ModelPage({
  params,
}: {
  params: { id: number };
}) {
  const model3d = await getModel3d(params.id);
  // console.log(model3d);


  return (
    <div className="h-full w-full">
      <div className="fixed bottom-2 right-2 top-[72px] z-50 hidden w-72 transform rounded-lg border bg-background/85 p-6 md:block">
        <ModelInfo model={model3d} />
        <div className="flex flex-col gap-4 py-4">
          <DeleteModelDialog params={params} />
          <form
            action={async () => {
              "use server";
              await changeRotation(params.id, 0, 3.14, 3.14);
            }}
          >
            <Button type="submit">Change Rotation</Button>
          </form>
          <form
            action={async () => {
              "use server";
              await changeTranslation(params.id, 0, 0, 0);
            }}
          >
            <Button type="submit">Reset Translation</Button>
          </form>
          <div className="flex flex-col gap-4 py-4">
            <span className="ml-2">
              T: [{model3d.translateX}, {model3d.translateY}, {model3d.translateZ}]
            </span>
            <span className="ml-2">
              R: [{model3d.rotateX}, {model3d.rotateY}, {model3d.rotateZ}]
            </span>
            <UserCard userId={model3d.userId} />
          </div>
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
        <ViewModel model={model3d} />
      </Suspense>
    </div>
  );
}
