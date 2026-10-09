"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PRIMARY = [
  { href: "/mon-dossier", label: "Accueil", match: "exact" as const },
  { href: "/mon-dossier/services/private-university", label: "Universités privées" },
  { href: "/mon-dossier/services/campus-france", label: "Campus France" },
  { href: "/mon-dossier/services/visa", label: "Visa étudiant" },
  { href: "/mon-dossier/services/tourist-visa", label: "Visa touristique" },
  { href: "/mon-dossier/documents", label: "Mes documents" },
  { href: "/mon-dossier/services/installation", label: "Installation" },
];

const SECONDARY = [
  { href: "/mon-dossier/candidatures", label: "Candidatures" },
  { href: "/mon-dossier/sauvegardes", label: "Sauvegardés" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DossierSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mon Dossier"
      className="flex w-full gap-1 overflow-x-auto pb-1 md:w-52 md:shrink-0 md:flex-col md:gap-0.5 md:overflow-visible md:border-r md:border-eef-soft md:pb-0 md:pr-6"
    >
      <p className="mb-2 hidden px-3 text-[10px] font-bold tracking-[0.15em] text-eef-secondary uppercase md:block">
        Mon dossier
      </p>
      {PRIMARY.map((item) => {
        const active = isActive(pathname, item.href, item.match === "exact");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-lg px-3 py-2.5 text-sm transition-colors md:w-full ${
              active
                ? "bg-eef-navy font-medium text-white"
                : "text-eef-secondary hover:bg-eef-soft/80 hover:text-eef-navy"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <div className="my-2 hidden h-px bg-eef-soft md:block" />
      {SECONDARY.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-lg px-3 py-2.5 text-sm transition-colors md:w-full ${
              active
                ? "bg-eef-navy font-medium text-white"
                : "text-eef-secondary hover:bg-eef-soft/80 hover:text-eef-navy"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
