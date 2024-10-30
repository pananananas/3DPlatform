"use client";
import { Textarea } from "~/components/ui/textarea";
import { CircleX, Redo, Undo } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useRef } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";

export default function HomePage() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  return (
    <div className="lg:px-16 xl:px-32">
      <div className="container mx-auto px-4 py-32">
        <h1 className="mb-6 text-3xl font-bold">Tattoo Inpainting</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="flex w-full flex-col gap-5 md:w-1/2">
            <div className="flex aspect-square">
              <ReactSketchCanvas
                ref={canvasRef}
                className=""
                strokeWidth={30}
                strokeColor="black"
								// backgroundImage="https://utfs.io/f/Q2s6v1FdRkt7ewCZTt6cfv9M4Ix0mkURyEYdlHjaBiTgp1bA"
								// preserveBackgroundImageAspectRatio="https://utfs.io/f/Q2s6v1FdRkt7ewCZTt6cfv9M4Ix0mkURyEYdlHjaBiTgp1bA"
              />
              <div className="absolute m-2 flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={async () => {
                    if (!canvasRef.current) return;
                    canvasRef.current.undo();
                  }}
                >
                  <Undo />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={async () => {
                    if (!canvasRef.current) return;
                    canvasRef.current.redo();
                  }}
                >
                  <Redo />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={async () => {
                    if (!canvasRef.current) return;
                    canvasRef.current.clearCanvas();
                  }}
                >
                  <CircleX />
                </Button>
              </div>
            </div>

            <Textarea placeholder="prompt" />
            <Button
              type="submit"
              onClick={async () => {
                if (!canvasRef.current) return;
                const image = await canvasRef.current.exportImage("jpeg");
                console.log(image);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
