import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ADMIN_APP_PATH } from "@/lib/admin-path";
import { AdminNav } from "@/components/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "ADMIN") redirect("/mon-dossier");

  return (
    <div className="min-h-full bg-eef-mist">
      <header className="border-b border-eef-soft bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-baseline gap-3">
            <Link href={ADMIN_APP_PATH} className="font-display text-[1.65rem] leading-none text-eef-blue">
              eef
            </Link>
            <span className="text-xs uppercase tracking-[0.16em] text-eef-secondary">
              Ops
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-eef-secondary">{session.name}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-8 sm:px-8 md:flex-row md:gap-10 md:py-12">
        <aside className="md:w-44 md:shrink-0 md:border-r md:border-eef-soft md:pr-6">
          <AdminNav />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        const { clearSession } = await import("@/lib/auth");
        const { redirect: redir } = await import("next/navigation");
        await clearSession();
        redir("/login");
      }}
    >
      <button type="submit" className="eef-btn-ghost px-3 py-1.5 text-sm">
        Déconnexion
      </button>
    </form>
  );
}
