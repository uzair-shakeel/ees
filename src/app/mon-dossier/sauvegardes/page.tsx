import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { SavedItemsPanel } from "@/components/SavedItemsPanel";

export default async function SauvegardesPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return <SavedItemsPanel />;
}
