import type { Metadata } from "next";
import { MarketingHome } from "@/components/marketing/MarketingHome";

export const metadata: Metadata = {
  title: "EEF — Construisez votre projet d'études en France",
  description:
    "Orientation, formations, candidatures et installation — un accompagnement humain à chaque étape.",
};

export default function HomePage() {
  return <MarketingHome />;
}
