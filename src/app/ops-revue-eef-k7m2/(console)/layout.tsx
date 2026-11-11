import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ADMIN_APP_PATH } from "@/lib/admin-path";
import { AdminNav } from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect(`${ADMIN_APP_PATH}/login`);
  if (session.role !== "ADMIN") redirect("/mon-dossier");

  return (
    <div className="min-h-full bg-[#eaf4fb]">
      <div className="px-4 pt-4 sm:px-6 sm:pt-5">
        <header className="mx-auto flex max-w-[1180px] items-center justify-between rounded-full border border-[#d7e6f2] bg-white px-5 py-3 shadow-[0_8px_24px_rgba(23,59,93,0.06)] sm:px-7">
          <div className="flex items-center gap-3">
            <Link href={ADMIN_APP_PATH} aria-label="eef Ops — Accueil">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo.png"
                alt="eef"
                className="h-8 w-auto object-contain sm:h-9"
              />
            </Link>
            <span className="text-xs tracking-[0.16em] text-eef-secondary">
              Ops
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-eef-secondary sm:inline">{session.name}</span>
            <LogoutButton />
          </div>
        </header>
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-8 sm:px-8 md:flex-row md:gap-10 md:py-12">
        <aside className="md:w-44 md:shrink-0 md:border-r md:border-[#d7e6f2] md:pr-6">
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
        redir(`${ADMIN_APP_PATH}/login`);
      }}
    >
      <button type="submit" className="eef-btn-ghost px-3 py-1.5 text-sm">
        Déconnexion
      </button>
    </form>
  );
}
