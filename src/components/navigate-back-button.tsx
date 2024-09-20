"use client";
import { useTransitionRouter } from "next-view-transitions";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export default function NavigateBackButton() {
  const router = useTransitionRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed left-2 top-[72px] z-10 transform rounded-lg bg-background/85"
      onClick={() => {
        router.back()
      }}
    >
      <ChevronLeft />
    </Button>
  );
}
