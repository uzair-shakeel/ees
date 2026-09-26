import type { Metadata } from "next";
import { MarketingParents } from "@/components/marketing/MarketingParents";

export const metadata: Metadata = {
  title: "Parents — EEF",
  description:
    "Un espace d'information pour accompagner le parcours de votre enfant en France : échéances, budget, arrivée et visite.",
};

export default function ParentsPage() {
  return <MarketingParents />;
}
