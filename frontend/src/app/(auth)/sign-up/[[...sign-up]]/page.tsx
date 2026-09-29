import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";

export default async function SignUpPage() {
  const { userId } = await auth();
  if (userId) redirect("/");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center justify-between border-b border-line px-4 sm:px-6">
        <BrandMark />
        <div className="flex items-center gap-2">
          <SignInButton mode="modal" forceRedirectUrl="/">
            <Button variant="ghost">Log in</Button>
          </SignInButton>
          <SignUpButton mode="modal" forceRedirectUrl="/">
            <Button variant="primary">Sign up</Button>
          </SignUpButton>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          All your tasks, on one board.
        </h1>
        <p className="mt-4 max-w-md text-base text-muted">
          Create tasks, drag them between columns and mark them done. Your board
          is private and always in sync.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <SignUpButton mode="modal" forceRedirectUrl="/">
            <Button variant="primary" size="lg">
              Get started
            </Button>
          </SignUpButton>
          <SignInButton mode="modal" forceRedirectUrl="/">
            <Button size="lg">Log in</Button>
          </SignInButton>
        </div>
      </main>
    </div>
  );
}
