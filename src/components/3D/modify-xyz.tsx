import { changeRotation, changeTranslation } from "~/server/queries";
import { type Model3D } from "~/types/models";
import { Button } from "../ui/button";

export default function ModifyXYZ({
  model,
  id,
  variable,
}: {
  model: Model3D;
  id: number;
  variable: "rotate" | "translate" | "centerPoint";
}) {
  return (
    <>
      {["X", "Y", "Z"].map((axis) => (
        <div
          key={`${variable}-${axis}`}
          className="flex items-center gap-4 px-4"
        >
          <span className="w-8">{axis}:</span>
          <div className="flex items-center">
            <form
              action={async () => {
                "use server";
                if (variable === "rotate") {
                  const newRotation = {
                    X:
                      axis === "X"
                        ? model.rotateX - Math.PI / 2
                        : model.rotateX,
                    Y:
                      axis === "Y"
                        ? model.rotateY - Math.PI / 2
                        : model.rotateY,
                    Z:
                      axis === "Z"
                        ? model.rotateZ - Math.PI / 2
                        : model.rotateZ,
                  };
                  await changeRotation(
                    id,
                    newRotation.X,
                    newRotation.Y,
                    newRotation.Z,
                  );
                } else if (variable === "translate") {
                  const newTranslation = {
                    X: axis === "X" ? model.translateX - 1 : model.translateX,
                    Y: axis === "Y" ? model.translateY - 1 : model.translateY,
                    Z: axis === "Z" ? model.translateZ - 1 : model.translateZ,
                  };
                  await changeTranslation(
                    id,
                    newTranslation.X,
                    newTranslation.Y,
                    newTranslation.Z,
                  );
                }
              }}
            >
              <Button
                type="submit"
                variant="outline"
                size="icon"
                className="h-6 w-6"
              >
                -
              </Button>
            </form>
            <span className="w-20 text-center">
              {typeof model[`${variable}${axis}` as keyof Model3D] ===
                "number" &&
              model[`${variable}${axis}` as keyof Model3D] !== null
                ? (
                    model[`${variable}${axis}` as keyof Model3D] as number
                  ).toFixed(2)
                : "N/A"}
            </span>
            <form
              action={async () => {
                "use server";
                if (variable === "rotate") {
                  const newRotation = {
                    X:
                      axis === "X"
                        ? model.rotateX + Math.PI / 2
                        : model.rotateX,
                    Y:
                      axis === "Y"
                        ? model.rotateY + Math.PI / 2
                        : model.rotateY,
                    Z:
                      axis === "Z"
                        ? model.rotateZ + Math.PI / 2
                        : model.rotateZ,
                  };
                  await changeRotation(
                    id,
                    newRotation.X,
                    newRotation.Y,
                    newRotation.Z,
                  );
                } else if (variable === "translate") {
                  const newTranslation = {
                    X: axis === "X" ? model.translateX + 1 : model.translateX,
                    Y: axis === "Y" ? model.translateY + 1 : model.translateY,
                    Z: axis === "Z" ? model.translateZ + 1 : model.translateZ,
                  };
                  await changeTranslation(
                    id,
                    newTranslation.X,
                    newTranslation.Y,
                    newTranslation.Z,
                  );
                }
              }}
            >
              <Button
                type="submit"
                variant="outline"
                size="icon"
                className="h-6 w-6"
              >
                +
              </Button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
}
