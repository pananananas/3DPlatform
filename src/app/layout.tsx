import "~/styles/globals.css";
import { type Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { TopNav } from "~/components/topnav";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/theme-provider";
import { ViewTransitions } from "next-view-transitions";
import { CSPostHogProvider } from "./_analytics/provider";

export const metadata: Metadata = {
  title: "3D Platform",
  description: "A platform for 3D models",
  icons: [{ rel: "icon", url: "/cube.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <ViewTransitions>
          <html lang="en" className={`${GeistMono.variable}`}>
            <body>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <div className="flex h-screen flex-col">
                  <TopNav />
                  {children}
                </div>
              </ThemeProvider>
              <Toaster />
            </body>
          </html>
        </ViewTransitions>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
