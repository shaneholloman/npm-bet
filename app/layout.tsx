import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { type ReactNode, Suspense } from "react";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const title = "npm.bet";
const description = "visualize and compare your npm package downloads.";
const authors = [
  { name: "Hayden Bleasel", url: "https://www.haydenbleasel.com" },
];
const creator = "Hayden Bleasel";
const publisher = "Hayden Bleasel";
const twitterHandle = "@haydenbleasel";

export const metadata: Metadata = {
  title,
  description,
  authors,
  creator,
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: title,
    locale: "en_US",
  },
  publisher,
  twitter: {
    card: "summary_large_image",
    creator: twitterHandle,
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body className={cn(geistSans.variable, geistMono.variable, "antialiased")}>
      <NuqsAdapter>
        <Suspense>{children}</Suspense>
      </NuqsAdapter>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
