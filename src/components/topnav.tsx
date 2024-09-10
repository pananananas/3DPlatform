import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { dark } from "@clerk/themes";
import { IconBox } from "./icons/icon-box";
import { AddModelDialog } from "./add-model-dialog";

export function TopNav() {
  return (
    <div className="w-full p-2">
      <nav className="flex items-center justify-between rounded-md border p-2 text-xl font-semibold">
        <Link href={"/"}>
          <Button
            variant="ghost"
            className="flex flex-row items-center justify-center gap-3 p-2"
          >
            <IconBox />
            <h1 className="text-lg md:text-xl font-bold">3D Platform</h1>
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
              <UserButton
                appearance={{
                  baseTheme: dark,
                }}
              />
            </Button>
            <AddModelDialog />
            <Link href="/profile">
              <Button variant="outline">Profile</Button>
            </Link>
          </SignedIn>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
