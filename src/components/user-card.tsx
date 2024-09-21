import { clerkClient } from "@clerk/nextjs/server";
import { Link } from "next-view-transitions";
import { Button } from "./ui/button";

export async function UserCard({ userId }: { userId: string }) {
  const response = await clerkClient.users.getUser(userId);

  return (
    <Link href={`/profile/${userId}`} className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="h-8 rounded-full pl-0">
        <div className="flex items-center gap-2">
          <img
            className="h-8 w-8 rounded-full"
            src={response.imageUrl}
            alt="user profile image"
          />

          <div className="flex flex-col justify-start">
            <span className="text-sm font-semibold">
              {response.firstName} {response.lastName}
            </span>
            <span className="text-xs">{}</span>
          </div>
        </div>
      </Button>
    </Link>
  );
}
