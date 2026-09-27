import type { Metadata } from "next";
import { MarketingFaq } from "@/components/marketing/MarketingFaq";

export const metadata: Metadata = {
  title: "FAQ — EEF",
  description:
    "Vos questions sur l'accompagnement Procédure EEF : orientation, candidatures, Études en France, admission et espace étudiant.",
};

export default function FaqPage() {
  return <MarketingFaq />;
}
