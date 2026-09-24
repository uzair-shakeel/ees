import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ADMIN_APP_PATH } from "@/lib/admin-path";
import { DossierSidebar } from "@/components/DossierSidebar";

export default async function DossierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "ADMIN") redirect(ADMIN_APP_PATH);

  return (
    <div className="min-h-full bg-eef-mist">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,168,216,0.22),transparent_68%)]" />
        <div className="absolute -left-16 bottom-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(23,59,93,0.08),transparent_70%)]" />
      </div>

      <header className="border-b border-eef-soft/80 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/mon-dossier" className="font-display text-[1.65rem] leading-none text-eef-blue">
            eef
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-eef-secondary sm:inline">{session.email}</span>
            <span className="font-medium text-eef-navy">Mon Dossier</span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-8 sm:px-8 md:flex-row md:gap-10 md:py-12">
        <DossierSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
