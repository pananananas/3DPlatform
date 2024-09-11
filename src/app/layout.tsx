import "~/styles/globals.css";
import { type Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { TopNav } from "~/components/topnav";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/theme-provider";
import { ViewTransitions } from "next-view-transitions";

export const metadata: Metadata = {
  title: "3D Platform",
  description: "A platform for 3D models",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <ViewTransitions>
        <html lang="en" className={`${GeistMono.variable}`}>
          <body className="flex h-screen flex-col">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <TopNav />
              {children}
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </ViewTransitions>
    </ClerkProvider>
  );
}
