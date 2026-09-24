"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/mon-dossier", label: "Aperçu", match: "exact" as const },
  { href: "/mon-dossier/candidatures", label: "Candidatures" },
  { href: "/mon-dossier/documents", label: "Documents" },
  { href: "/mon-dossier/visa", label: "Visa" },
  { href: "/mon-dossier/installation", label: "Installation" },
  { href: "/mon-dossier/sauvegardes", label: "Sauvegardés" },
];

export function DossierSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mon Dossier"
      className="flex w-full gap-1 overflow-x-auto pb-1 md:w-48 md:shrink-0 md:flex-col md:gap-0.5 md:overflow-visible md:border-r md:border-eef-soft md:pb-0 md:pr-6"
    >
      {NAV.map((item) => {
        const active =
          item.match === "exact"
            ? pathname === item.href
            : item.href === "/mon-dossier/documents"
              ? pathname === item.href ||
                pathname.startsWith("/mon-dossier/documents") ||
                pathname.startsWith("/mon-dossier/services/")
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
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
