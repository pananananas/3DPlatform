import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const models3d = await db.query.models3d.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">My shit</span>
        </h1>
        {models3d.map((model3d) => (
          <div key={model3d.id}>
            <h2 className="text-2xl font-bold">{model3d.name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
