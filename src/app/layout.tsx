import "~/styles/globals.css";
import { type Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { TopNav } from "~/components/topnav";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "~/components/ui/sonner";
import { CSPostHogProvider } from "./_analytics/provider";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "TattooAI",
  description: "A platform for Displaying Tattoo Designs on 3D Models",
  icons: [{ rel: "icon", url: "/cube.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en" className={`${GeistMono.variable}`}>
          <body>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="flex h-screen flex-col">
                <TopNav />
                {children}
              </div>
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
