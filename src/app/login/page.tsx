import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-full flex-1 items-center justify-center p-8 text-stone-500">
          Chargement…
        </main>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
