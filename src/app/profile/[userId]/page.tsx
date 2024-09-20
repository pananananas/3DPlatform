import { clerkClient } from "@clerk/nextjs/server";
import { ModelsGallery } from "~/components/models-gallery";
import { getUsersModels3d } from "~/server/queries";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const response = await clerkClient.users.getUser(params.userId);

  const models3d = await getUsersModels3d(params.userId);

  return (
    <div className="lg:px-16 xl:px-32">
      <div className="container mx-auto px-4 py-32">
        <h1 className="mb-6 text-3xl font-bold">
          {response.firstName} {response.lastName}
          {"'"}s Profile
        </h1>
        <ModelsGallery models3d={models3d} />
      </div>
    </div>
  );
}
