import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const models3d = await db.query.models3d.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">3D Models Gallery</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {models3d.map((model) => (
          <Link href={`/models/${model.id}`} key={model.id}>
            <div className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h2 className="mb-2 text-xl font-semibold">{model.name}</h2>
                <p className="text-sm text-gray-600">
                  Created: {new Date(model.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
