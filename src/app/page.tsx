import { Button } from "~/components/ui/button";
import { getModels3d } from "~/server/queries";
import Link from "next/link";

export default async function HomePage() {
  const models3d = await getModels3d();

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="mb-6 text-3xl font-bold">Landing Page</h1>
      <p className="pb-6">Explore the 3D models gallery by clicking on the link below:</p>
      <Link href="/models">
        <Button>Go to 3D Models Gallery</Button>
      </Link>
      <p className="py-6">Explore the 3D scenes gallery by clicking on the link below:</p>
      <Link href="/scenes">
        <Button>Go to 3D Scenes Gallery</Button>
      </Link>
    </div>
  );
}
