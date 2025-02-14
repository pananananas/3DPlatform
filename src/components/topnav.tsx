"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { AddModelDialog } from "./add-model-dialog";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { IconBox } from "./icons/icon-box";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { dark } from "@clerk/themes";
import { useState } from "react";

export function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const MobileNavItems = () => (
    <div className="flex flex-col space-y-2">
      <Link href="/models" className="w-full justify-start">
        <Button variant="ghost" className="w-full justify-start">
          Models
        </Button>
      </Link>
      <Link href="/tattoo" className="w-full justify-start">
        <Button variant="ghost" className="w-full justify-start">
          Tattoo
        </Button>
      </Link>
      {/* <Link href="/inpainting">
        <Button variant="ghost">Inpainting</Button>
      </Link> */}
      <Link href="/image">
        <Button variant="ghost">Image</Button>
      </Link>

      <SignedIn>
        <Link href="/profile" className="w-full justify-start">
          <Button variant="ghost" className="w-full justify-start">
            Profile
          </Button>
        </Link>

        <AddModelDialog />
      </SignedIn>

      <SignedOut>
        <Button variant="outline" className="w-full">
          <SignInButton />
        </Button>
      </SignedOut>
    </div>
  );

  return (
    <div className="fixed left-0 right-0 top-0 z-50 w-full p-2">
      <nav className="flex flex-col rounded-md border bg-background/85 p-2 text-xl font-semibold backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={"/"}>
              <Button
                variant="ghost"
                className="flex flex-row items-center justify-center gap-3 p-2"
              >
                <IconBox />
                <h1 className="text-lg font-bold md:text-xl">TattooAI</h1>
              </Button>
            </Link>
            <div className="hidden md:flex md:flex-row md:items-center md:gap-2">
              <Link href="/models">
                <Button variant="ghost">Models</Button>
              </Link>
              <Link href="/tattoo">
                <Button variant="ghost">Tattoo</Button>
              </Link>
              {/* <Link href="/inpainting">
                <Button variant="ghost">Inpainting</Button>
              </Link> */}
              <Link href="/image">
                <Button variant="ghost">Image</Button>
              </Link>
              <SignedIn>
                <Link href="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
              </SignedIn>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SignedIn>
              <Button variant="outline" size="icon" className="rounded-full">
                <UserButton
                  appearance={{
                    baseTheme: dark,
                  }}
                />
              </Button>
            </SignedIn>
            <div className="hidden md:flex md:flex-row md:items-center md:gap-2">
              <SignedOut>
                <Button variant="outline">
                  <SignInButton />
                </Button>
              </SignedOut>
              <SignedIn>
                <AddModelDialog />
              </SignedIn>
            </div>
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute left-[-1px] right-[-1px] top-full pt-2 md:hidden">
            <div className="rounded-md border bg-background/95 p-2 backdrop-blur-sm">
              <MobileNavItems />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
