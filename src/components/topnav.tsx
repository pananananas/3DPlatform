import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function TopNav() {
  return (
    <div className="w-full p-2">
      <nav className="flex items-center justify-between rounded-md border p-2 text-xl font-semibold">
        <Link href={"/"}>
          <Button
            variant="ghost"
            className="flex flex-row items-center justify-center gap-3 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              />
            </svg>
            <h1 className="text-xl font-bold">3D Platform</h1>
          </Button>
        </Link>
        <div className="flex flex-row items-center justify-center gap-4">
          <SignedOut>
            <Button variant="outline">
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <Button variant="outline" size="icon" className="rounded-full">
              <UserButton />
            </Button>
          </SignedIn>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
