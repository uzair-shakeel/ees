import type { Metadata } from "next";
import { MarketingMethod } from "@/components/marketing/MarketingMethod";

export const metadata: Metadata = {
  title: "Notre méthode — EEF",
  description:
    "Une méthode humaine pour un projet personnel : comprendre avant de recommander, expliquer avant de décider, accompagner sans décider à votre place.",
};

export default function MethodePage() {
  return <MarketingMethod />;
}
