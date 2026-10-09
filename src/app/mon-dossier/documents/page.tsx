import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { ensureServicesCatalog } from "@/lib/services-catalog";
import { enrollClientInAllServices } from "@/lib/enroll";
import { getVaultDocuments } from "@/lib/document-vault";
import { DocumentsVault } from "@/components/DocumentsVault";

export default async function DocumentsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  await connectDB();
  await ensureServicesCatalog();
  await enrollClientInAllServices(session.userId);

  const docs = await getVaultDocuments(session.userId);

  return <DocumentsVault initialDocs={docs} />;
}
