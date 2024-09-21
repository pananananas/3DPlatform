import { LucidePlus, LucideMinus, LucideDownload } from "lucide-react";
import { DeleteModelDialog } from "~/components/delete-model-dialog";
import { changeRotation, changeTranslation } from "~/server/queries";
import { UserCard } from "~/components/user-card";
import { Button } from "~/components/ui/button";
import { type Model3D } from "~/types/models";
import { Link } from "next-view-transitions";
import { auth } from "@clerk/nextjs/server";

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
      <div className="flex flex-row justify-between gap-2">
        <UserCard userId={model.userId} />
        <Link href={model.url}>
          <Button variant="outline" size="icon">
            <LucideDownload strokeWidth={1.5} />
          </Button>
        </Link>
        {isOwner && <DeleteModelDialog params={params} />}
      </div>
      {/* Rotation Controls */}
      <div className="flex flex-col gap-2 pt-3">
        <h3 className="text-md">Rotation</h3>
        {["X", "Y", "Z"].map((axis) => (
          <div key={`rotate-${axis}`} className="flex items-center gap-2 px-4">
            <span className="w-8">{axis}:</span>
            <form
              action={async () => {
                "use server";
                const newRotation = {
                  X: axis === "X" ? model.rotateX - Math.PI / 2 : model.rotateX,
                  Y: axis === "Y" ? model.rotateY - Math.PI / 2 : model.rotateY,
                  Z: axis === "Z" ? model.rotateZ - Math.PI / 2 : model.rotateZ,
                };
                await changeRotation(
                  params.id,
                  newRotation.X,
                  newRotation.Y,
                  newRotation.Z,
                );
              }}
            >
              <Button type="submit" variant="outline" size="icon">
                <LucideMinus className="h-4 w-4" />
              </Button>
            </form>
            <span className="w-20 text-center">
              {typeof model[`rotate${axis}` as keyof Model3D] === "number" &&
              model[`rotate${axis}` as keyof Model3D] !== null
                ? (model[`rotate${axis}` as keyof Model3D] as number).toFixed(2)
                : "N/A"}
            </span>
            <form
              action={async () => {
                "use server";
                const newRotation = {
                  X: axis === "X" ? model.rotateX + Math.PI / 2 : model.rotateX,
                  Y: axis === "Y" ? model.rotateY + Math.PI / 2 : model.rotateY,
                  Z: axis === "Z" ? model.rotateZ + Math.PI / 2 : model.rotateZ,
                };
                await changeRotation(
                  params.id,
                  newRotation.X,
                  newRotation.Y,
                  newRotation.Z,
                );
              }}
            >
              <Button type="submit" variant="outline" size="icon">
                <LucidePlus className="h-4 w-4" />
              </Button>
            </form>
          </div>
        ))}
      </div>

      {/* Translation Controls */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-md">Translation</h3>
        {["X", "Y", "Z"].map((axis) => (
          <div
            key={`translate-${axis}`}
            className="flex items-center gap-2 px-4"
          >
            <span className="w-8">{axis}:</span>
            <form
              action={async () => {
                "use server";
                const newTranslation = {
                  X: axis === "X" ? model.translateX - 1 : model.translateX,
                  Y: axis === "Y" ? model.translateY - 1 : model.translateY,
                  Z: axis === "Z" ? model.translateZ - 1 : model.translateZ,
                };
                await changeTranslation(
                  params.id,
                  newTranslation.X,
                  newTranslation.Y,
                  newTranslation.Z,
                );
              }}
            >
              <Button type="submit" variant="outline" size="icon">
                <LucideMinus className="h-4 w-4" />
              </Button>
            </form>
            <span className="w-20 text-center">
              {typeof model[`translate${axis}` as keyof Model3D] === "number" &&
              model[`translate${axis}` as keyof Model3D] !== null
                ? (
                    model[`translate${axis}` as keyof Model3D] as number
                  ).toFixed(2)
                : "N/A"}
            </span>
            <form
              action={async () => {
                "use server";
                const newTranslation = {
                  X: axis === "X" ? model.translateX + 1 : model.translateX,
                  Y: axis === "Y" ? model.translateY + 1 : model.translateY,
                  Z: axis === "Z" ? model.translateZ + 1 : model.translateZ,
                };
                await changeTranslation(
                  params.id,
                  newTranslation.X,
                  newTranslation.Y,
                  newTranslation.Z,
                );
              }}
            >
              <Button type="submit" variant="outline" size="icon">
                <LucidePlus className="h-4 w-4" />
              </Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
