import raw from "@/content/bourses.json";

export const BOURSES_CONFIG = {
  demo: true,
  strategyUrl: "/journal",
  basePath: "/bourses",
  timeZone: "Europe/Paris",
};

export const NIVEAUX = ["Licence", "Master", "Doctorat"] as const;
export type Niveau = (typeof NIVEAUX)[number];

export type Statut = "VERIFIE" | "EN_REVUE" | "MANQUANT";
export type Periode = "mois" | "an" | "unique";

export const SORTS = ["date", "montant", "nom"] as const;
export type SortKey = (typeof SORTS)[number];

export interface Bourse {
  slug: string;
  nom: string;
  organisme: string;
  domaine: string | null;
  niveaux: Niveau[];
  montant: { valeur: number; periode: Periode } | null;
  dateLimite: string | null;
  eligibilite: string | null;
  pieces: string[] | null;
  source: string | null;
  statut: Statut;
  verifieLe: string | null;
}

export async function getBourses(): Promise<Bourse[]> {
  return (raw as Bourse[]).filter((b) => b && b.slug && b.nom);
}

export async function getBourse(slug: string): Promise<Bourse | undefined> {
  return (await getBourses()).find((b) => b.slug === slug);
}

export const STATUS_LABEL: Record<Statut, string> = {
  VERIFIE: "Vérifié",
  EN_REVUE: "En revue",
  MANQUANT: "Manquant",
};

export const PERIOD_LABEL: Record<Periode, string> = {
  mois: "/ mois",
  an: "/ an",
  unique: "versement unique",
};

const PER_YEAR: Record<Periode, number> = { mois: 12, an: 1, unique: 1 };

const MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

export function todayISO(timeZone: string = BOURSES_CONFIG.timeZone): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function isoToUTC(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function daysBetween(fromISO: string, toISO: string): number {
  return Math.round((isoToUTC(toISO) - isoToUTC(fromISO)) / 86_400_000);
}

export function formatDateFR(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d === 1 ? "1er" : d} ${MONTHS[m - 1]} ${y}`;
}

export function formatNumber(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
}

export function perYear(b: Bourse): number | null {
  return b.montant ? b.montant.valeur * (PER_YEAR[b.montant.periode] ?? 1) : null;
}

export function fold(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function safeUrl(url: string | null | undefined): string | null {
  return url && /^https?:\/\//i.test(url) ? url : null;
}
