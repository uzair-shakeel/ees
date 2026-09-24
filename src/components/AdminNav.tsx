"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_APP_PATH } from "@/lib/admin-path";

export function AdminNav() {
  const pathname = usePathname();

  const links = [
    {
      href: ADMIN_APP_PATH,
      label: "Étudiants",
      active:
        pathname === ADMIN_APP_PATH ||
        pathname.startsWith(`${ADMIN_APP_PATH}/students`),
    },
    {
      href: `${ADMIN_APP_PATH}/file-attente`,
      label: "File d'attente",
      active: pathname.startsWith(`${ADMIN_APP_PATH}/file-attente`),
    },
  ];

  return (
    <nav className="flex flex-col gap-0">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`relative px-0 py-2.5 text-sm ${
            link.active
              ? "font-medium text-eef-navy"
              : "text-eef-secondary hover:text-eef-navy"
          }`}
        >
          {link.active && (
            <span className="absolute left-0 top-2 h-[calc(100%-16px)] w-0.5 bg-eef-blue" />
          )}
          <span className="pl-3">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
