import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ModuleChecklist } from "@/components/ModuleChecklist";

export default async function InstallationPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <ModuleChecklist
      module="installation"
      title="Installation en France"
      subtitle="Checklist de vie administrative — du J-30 au J+30 après votre arrivée."
    />
  );
}
