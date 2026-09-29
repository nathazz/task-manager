import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { AppProviders } from "@/context/app-providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tasks",
  description: "Track your tasks on a board.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      afterSignOutUrl="/sign-up"
      appearance={{
        variables: {
          colorPrimary: "#7b68ee",
          colorText: "#292d34",
          borderRadius: "0.5rem",
        },
      }}
    >
      <html lang="en" className={inter.variable}>
        <body className="min-h-screen font-sans" suppressHydrationWarning>
          <AppProviders>{children}</AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
