import { DeleteModelDialog } from "~/components/delete-model-dialog";
import { UserCard } from "~/components/user-card";
import { Button } from "~/components/ui/button";
import { LucideDownload } from "lucide-react";
import { type Model3D } from "~/types/models";
import { Link } from "next-view-transitions";
import { auth } from "@clerk/nextjs/server";
import ModifyXYZ from "./modify-xyz";

export default function ModelControls({
  model,
  params,
}: {
  model: Model3D;
  params: { id: number };
}) {
  const user = auth();
  const isOwner = user.userId === model.userId;

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-row items-center justify-between gap-2">
        <UserCard userId={model.userId} />
        <div className="flex gap-2">
          <Link href={model.url}>
            <Button variant="outline" size="icon">
              <LucideDownload strokeWidth={1.5} className="h-5 w-5" />
            </Button>
          </Link>
          {isOwner && <DeleteModelDialog params={params} />}
        </div>
      </div>
      {isOwner && (
        <>
          <div className="flex flex-col gap-2 pt-3">
            <h3 className="text-md">Rotation</h3>
            <ModifyXYZ model={model} id={params.id} variable="rotate" />
          </div>

          <div className="flex flex-col gap-2 pt-3">
            <h3 className="text-md">Translation</h3>
            <ModifyXYZ model={model} id={params.id} variable="translate" />
          </div>

          <div className="flex flex-col gap-2 pt-3">
            <h3 className="text-md">Center Point</h3>
            <ModifyXYZ model={model} id={params.id} variable="center" />
          </div>
        </>
      )}
    </div>
  );
}
