import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ModuleChecklist } from "@/components/ModuleChecklist";

export default async function VisaPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <ModuleChecklist
      module="visa"
      title="Centre de commandement visa"
      subtitle="Suivez les 10 étapes du parcours visa. Les pièces officielles se déposent dans le dossier documents."
      footer={
        <div className="eef-step-panel flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-eef-navy">Dossier documents Visa</p>
            <p className="text-sm text-eef-secondary">
              Passeport, ressources, hébergement… déposez et faites valider chaque pièce.
            </p>
          </div>
          <Link
            href="/mon-dossier/services/visa"
            className="eef-btn-primary inline-flex h-11 items-center justify-center px-5"
          >
            Ouvrir le dossier
          </Link>
        </div>
      }
    />
  );
}
