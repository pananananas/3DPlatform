import { clerkClient } from "@clerk/nextjs/server";

export async function UserCard({ userId }: { userId: string }) {
  const response = await clerkClient.users.getUser(userId);
  console.log(response);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Uploaded by:</span>
      <span className="text-sm font-bold">{response.username}</span>
    </div>
  );
}
