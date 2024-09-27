"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

export default function NavigateBackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed left-2 top-[72px] z-10 transform rounded-lg bg-background/85"
      onClick={() => {
        router.back();
      }}
    >
      <ChevronLeft />
    </Button>
  );
}
