import { extractExtension, removeFileExtension } from "~/utils/filenames";
import NavigateBackButton from "~/components/navigate-back-button";
import ModelControls from "~/components/3D/model-controls";
import ViewModel from "~/components/3D/view-model";
import { Button } from "~/components/ui/button";
import { type Model3D } from "~/types/models";
import { getModel3d } from "~/server/queries";
import { Badge } from "~/components/ui/badge";
import { Suspense } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

function ModelInfo({ model }: { model: Model3D }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h2 className="text-xl font-semibold">
        {removeFileExtension(model.name)}
      </h2>
      <Badge>{extractExtension(model.name)}</Badge>
    </div>
  );
}

function DrawerModelControls({
  model,
  params,
}: {
  model: Model3D;
  params: { id: number };
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Model Info</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <ModelInfo model={model} />
          </DrawerTitle>
          <ModelControls model={model} params={params} />
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
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
      {/* Desktop view: */}
      <div className="fixed bottom-2 right-2 top-[72px] z-50 hidden w-72 transform rounded-lg border bg-background/85 p-6 md:block">
        <ModelInfo model={model3d} />
        <ModelControls model={model3d} params={params} />
      </div>
      {/* Mobile view: */}
      <div className="fixed bottom-2 left-2 right-2 z-50 block transform rounded-lg border bg-background/85 p-6 md:hidden">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">
            {removeFileExtension(model3d.name)}
          </h2>
          <div className="flex">
            <DrawerModelControls model={model3d} params={params} />
          </div>
        </div>
      </div>
      <div className="items-center justify-center md:block">
        <NavigateBackButton />
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
