import { ReviewPanel } from "@/components/ReviewPanel";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type Props = { params: Promise<{ id: string }> };

export default async function AdminSubmissionPage({ params }: Props) {
  const { id } = await params;
  return <ReviewPanel id={id} />;
}
