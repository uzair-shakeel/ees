"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ADMIN_APP_PATH } from "@/lib/admin-path";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de connexion");
      if (data.user.role !== "ADMIN") {
        await fetch("/api/auth/logout", { method: "POST" });
        throw new Error("Ce compte n'a pas accès à la console.");
      }
      const dest =
        nextPath && nextPath.startsWith(ADMIN_APP_PATH) ? nextPath : ADMIN_APP_PATH;
      router.push(dest);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-eef-mist px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 text-center">
          <p className="font-display text-3xl text-eef-blue">eef</p>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-eef-secondary">Console</p>
          <h1 className="mt-3 font-display text-2xl text-eef-navy">Connexion admin</h1>
        </div>

        <div className="eef-panel p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-eef-navy">Email</label>
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="eef-input"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-eef-navy">Mot de passe</label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="eef-input"
                required
              />
            </div>
            {error && <p className="text-sm text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="eef-btn-primary mt-2 w-full py-3 disabled:opacity-50"
            >
              {busy ? "Connexion…" : "Entrer"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="flex min-h-full flex-1 items-center justify-center p-8 text-eef-secondary">Chargement…</main>}>
      <AdminLoginForm />
    </Suspense>
  );
}
