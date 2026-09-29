import { UserButton } from "@clerk/nextjs";
import { BrandMark } from "./brand-mark";

export function AppHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-line bg-white px-4 sm:px-6">
      <BrandMark />
      <UserButton />
    </header>
  );
}
