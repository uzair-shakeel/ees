import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { CandidaturesPipeline } from "@/components/CandidaturesPipeline";

export default async function CandidaturesPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return <CandidaturesPipeline />;
}
