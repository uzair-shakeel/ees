"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Inscription impossible");
      router.push(`/login?registered=1&email=${encodeURIComponent(email)}`);
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
          <h1 className="mt-4 font-display text-2xl text-eef-navy">Créer un compte</h1>
          <p className="mt-2 text-sm text-eef-secondary">
            Ensuite, connectez-vous pour ouvrir votre dossier.
          </p>
        </div>

        <div className="eef-panel p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-eef-navy">
                Nom complet
              </label>
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="eef-input"
                required
                minLength={2}
              />
            </div>
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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="eef-input"
                required
                minLength={8}
              />
              <p className="mt-1.5 text-xs text-eef-secondary">Minimum 8 caractères</p>
            </div>
            {error && <p className="text-sm text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="eef-btn-primary mt-2 w-full py-3 disabled:opacity-50"
            >
              {busy ? "Création…" : "Créer mon compte"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-eef-secondary">
          Déjà inscrit ?{" "}
          <Link href="/login" className="font-medium text-eef-deep hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}
