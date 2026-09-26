import type { Metadata } from "next";
import { MarketingCommunity } from "@/components/marketing/MarketingCommunity";

export const metadata: Metadata = {
  title: "Communauté — EEF",
  description:
    "Un réseau d'étudiants vérifiés, organisé par ville, école, programme et promotion. Fonctionnel et utile — pas un réseau social de plus.",
};

export default function CommunautePage() {
  return <MarketingCommunity />;
}
