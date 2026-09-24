"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ADMIN_APP_PATH } from "@/lib/admin-path";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  const registered = searchParams.get("registered") === "1";
  const emailFromQuery = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromQuery);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const banner = useMemo(() => {
    if (registered) {
      return "Compte créé. Connectez-vous pour continuer.";
    }
    if (nextPath) {
      return "Connexion requise pour accéder à votre dossier.";
    }
    return null;
  }, [registered, nextPath]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
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

      if (data.user.role === "ADMIN") {
        if (nextPath && nextPath.startsWith(ADMIN_APP_PATH)) router.push(nextPath);
        else router.push(ADMIN_APP_PATH);
      } else if (nextPath && nextPath.startsWith("/mon-dossier")) {
        router.push(nextPath);
      } else {
        router.push("/mon-dossier");
      }
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
          <h1 className="mt-4 font-display text-2xl text-eef-navy">Connexion</h1>
          <p className="mt-2 text-sm text-eef-secondary">
            Accès privé à votre dossier documents.
          </p>
        </div>

        <div className="eef-panel p-6 sm:p-8">
          {banner && (
            <p className="mb-5 rounded-lg bg-eef-soft px-3 py-2.5 text-sm text-eef-navy">
              {banner}
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-eef-navy">Email</label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="eef-input"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-eef-navy">
                Mot de passe
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {busy ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-eef-secondary">
          Pas de compte ?{" "}
          <Link href="/register" className="font-medium text-eef-deep hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  );
}
