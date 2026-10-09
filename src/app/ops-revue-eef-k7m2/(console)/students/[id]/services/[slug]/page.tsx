import { notFound } from "next/navigation";
import { getStudentServiceDocs } from "@/lib/admin-students";
import { AdminServiceDocs } from "@/components/AdminServiceDocs";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type Props = { params: Promise<{ id: string; slug: string }> };

export default async function StudentServiceDocsPage({ params }: Props) {
  const { id, slug } = await params;
  const data = await getStudentServiceDocs(id, slug);
  if (!data) notFound();

  return (
    <AdminServiceDocs
      studentId={data.student.id}
      studentName={data.student.name}
      serviceSlug={data.service.slug}
      serviceTitle={data.service.title}
      progress={data.progress}
      status={data.status}
      slots={data.slots}
    />
  );
}
