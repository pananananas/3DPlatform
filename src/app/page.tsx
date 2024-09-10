import { db } from "~/server/db";
import { ModelsPage } from "~/components/models-page";

export default async function HomePage() {
  const models3d = await db.query.models3d.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return <ModelsPage models3d={models3d} />;
}
