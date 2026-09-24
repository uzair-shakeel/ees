import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ServiceChecklist } from "@/components/ServiceChecklist";

type Props = { params: Promise<{ slug: string }> };

export default async function ServicePage({ params }: Props) {
  const session = await getSession();
  if (!session) redirect("/login");
  const { slug } = await params;

  return <ServiceChecklist slug={slug} />;
}
