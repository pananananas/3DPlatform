import "~/styles/globals.css";
import { type Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "~/components/topnav";

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
      <html lang="en" className={`${GeistMono.variable}`}>
        <body>
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
