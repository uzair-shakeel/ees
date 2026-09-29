import type { Metadata } from "next";
import { MarketingJournal } from "@/components/marketing/MarketingJournal";

export const metadata: Metadata = {
  title: "Le journal — EEF",
  description:
    "Comprendre avant de décider. Guides et repères sur l'orientation, les formations, le dossier, Études en France, le logement et la vie en France.",
};

export default function JournalPage() {
  return <MarketingJournal />;
}
