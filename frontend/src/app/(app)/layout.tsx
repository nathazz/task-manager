import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/app-header";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="p-3 sm:p-6">{children}</main>
    </>
  );
}
