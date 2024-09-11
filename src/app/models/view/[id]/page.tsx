import { extractExtension, removeFileExtension } from "~/utils/filenames";
import ViewModel from "~/components/3D/view-model";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { getModel3d } from "~/server/queries";
import { Link } from "next-view-transitions";

export default async function ModelPage({
  params,
}: {
  params: { id: number };
}) {
  const model3d = await getModel3d(params.id);

  return (
    <div className="h-full w-full">
      <div className="fixed bottom-2 right-2 top-[72px] z-50 hidden w-72 transform rounded-lg border bg-background/85 p-6 md:block">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">
            {removeFileExtension(model3d.name)}
          </h2>
          <Badge>{extractExtension(model3d.name)}</Badge>
        </div>
        <p className="pt-4">This is the right floating panel content.</p>
      </div>

      <Link
        href="/models"
        className=" items-center justify-center md:block"
      >
        <Button
          variant="outline"
          size={"icon"}
          className="fixed left-2 top-[72px] z-10 transform rounded-lg bg-background/85"
        >
          <ChevronLeft />
        </Button>
      </Link>

      <div className="fixed bottom-2 left-2 right-2 z-50 block transform rounded-lg border bg-background/85 p-6 md:hidden">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">
            {removeFileExtension(model3d.name)}
          </h2>
          <Badge>{extractExtension(model3d.name)}</Badge>
        </div>
        <p className="pb-2 pt-4">This is the bottom floating panel content.</p>
      </div>

      <ViewModel model={model3d} />
    </div>
  );
}
