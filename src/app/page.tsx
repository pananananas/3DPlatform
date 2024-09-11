"use client";
import { Button } from "~/components/ui/button";
import { Link } from "next-view-transitions";
import { useEffect } from "react";
import { useTransitionRouter } from "next-view-transitions";

export default function HomePage() {
  const router = useTransitionRouter();

  useEffect(() => {
    router.push("/models");
  }, []);

  return (
    <></>
    // <div className="container mx-auto px-4 py-32">
    //   <h1 className="mb-6 text-3xl font-bold">Landing Page</h1>
    //   <p className="pb-6">Explore the 3D models gallery by clicking on the link below:</p>
    //   <Link href="/models">
    //     <Button>Go to 3D Models Gallery</Button>
    //   </Link>
    //   <p className="py-6">Explore the 3D scenes gallery by clicking on the link below:</p>
    //   <Link href="/scenes">
    //     <Button>Go to 3D Scenes Gallery</Button>
    //   </Link>
    // </div>
  );
}
