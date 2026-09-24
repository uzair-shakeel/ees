import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ADMIN_APP_PATH } from "@/lib/admin-path";

export default async function HomePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "ADMIN") redirect(ADMIN_APP_PATH);
  redirect("/mon-dossier");
}
