import type { Metadata } from "next";
import { MarketingCareer } from "@/components/marketing/MarketingCareer";

export const metadata: Metadata = {
  title: "Carrière — EEF",
  description:
    "Analyseur de CV ATS, préparation d'entretiens et outils pour transformer votre formation en carrière.",
};

export default function CarrierePage() {
  return <MarketingCareer />;
}
