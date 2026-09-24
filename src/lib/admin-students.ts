import { connectDB } from "@/lib/mongodb";
import { progressPercent } from "@/lib/application-status";
import { User } from "@/models/User";
import { Service } from "@/models/Service";
import { ServiceApplication } from "@/models/ServiceApplication";
import { DocumentSubmission } from "@/models/DocumentSubmission";

export type StudentServiceSummary = {
  applicationId: string;
  slug: string;
  title: string;
  status: "in_progress" | "ready" | "proceeded";
  progress: number;
  pending: number;
  approved: number;
  rejected: number;
  missing: number;
  totalRequired: number;
};

export type StudentListItem = {
  id: string;
  name: string;
  email: string;
  createdAt: Date | string | null;
  services: StudentServiceSummary[];
  pendingTotal: number;
  overallProgress: number;
};

export async function getStudentsOverview(): Promise<StudentListItem[]> {
  await connectDB();

  const [students, services] = await Promise.all([
    User.find({ role: "CLIENT" }).sort({ createdAt: -1 }).lean(),
    Service.find({}).lean(),
  ]);

  if (students.length === 0) return [];

  const studentIds = students.map((s) => s._id);
  const applications = await ServiceApplication.find({
    userId: { $in: studentIds },
  }).lean();
  const appIds = applications.map((a) => a._id);
  const submissions =
    appIds.length === 0
      ? []
      : await DocumentSubmission.find({ applicationId: { $in: appIds } }).lean();

  return students.map((student) => {
    const apps = applications.filter((a) => String(a.userId) === String(student._id));
    const serviceSummaries: StudentServiceSummary[] = apps.map((app) => {
      const service = services.find((s) => String(s._id) === String(app.serviceId));
      const subs = submissions.filter((s) => String(s.applicationId) === String(app._id));
      const requirements = service?.requirements ?? [];
      return {
        applicationId: String(app._id),
        slug: service?.slug ?? "unknown",
        title: service?.title ?? "Service",
        status: app.status as "in_progress" | "ready" | "proceeded",
        progress: progressPercent(requirements, subs),
        pending: subs.filter((s) => s.status === "pending").length,
        approved: subs.filter((s) => s.status === "approved").length,
        rejected: subs.filter((s) => s.status === "rejected").length,
        missing: subs.filter((s) => s.status === "missing").length,
        totalRequired: requirements.filter((r) => r.required !== false).length,
      };
    });

    const pendingTotal = serviceSummaries.reduce((n, s) => n + s.pending, 0);
    const overallProgress =
      serviceSummaries.length === 0
        ? 0
        : Math.round(
            serviceSummaries.reduce((n, s) => n + s.progress, 0) / serviceSummaries.length,
          );

    return {
      id: String(student._id),
      name: student.name,
      email: student.email,
      createdAt: (student as { createdAt?: Date }).createdAt ?? null,
      services: serviceSummaries,
      pendingTotal,
      overallProgress,
    };
  });
}

export async function getStudentDetail(studentId: string) {
  await connectDB();

  const student = await User.findOne({ _id: studentId, role: "CLIENT" }).lean();
  if (!student) return null;

  const [services, applications] = await Promise.all([
    Service.find({}).lean(),
    ServiceApplication.find({ userId: student._id }).lean(),
  ]);

  const appIds = applications.map((a) => a._id);
  const submissions =
    appIds.length === 0
      ? []
      : await DocumentSubmission.find({ applicationId: { $in: appIds } }).lean();

  const serviceSummaries: StudentServiceSummary[] = services.map((service) => {
    const app = applications.find((a) => String(a.serviceId) === String(service._id));
    const subs = app
      ? submissions.filter((s) => String(s.applicationId) === String(app._id))
      : [];
    return {
      applicationId: app ? String(app._id) : "",
      slug: service.slug,
      title: service.title,
      status: (app?.status as "in_progress" | "ready" | "proceeded") ?? "in_progress",
      progress: progressPercent(service.requirements, subs),
      pending: subs.filter((s) => s.status === "pending").length,
      approved: subs.filter((s) => s.status === "approved").length,
      rejected: subs.filter((s) => s.status === "rejected").length,
      missing: app
        ? subs.filter((s) => s.status === "missing").length
        : service.requirements.filter((r) => r.required !== false).length,
      totalRequired: service.requirements.filter((r) => r.required !== false).length,
    };
  });

  return {
    id: String(student._id),
    name: student.name,
    email: student.email,
    createdAt: (student as { createdAt?: Date }).createdAt ?? null,
    services: serviceSummaries,
    pendingTotal: serviceSummaries.reduce((n, s) => n + s.pending, 0),
    overallProgress:
      serviceSummaries.length === 0
        ? 0
        : Math.round(
            serviceSummaries.reduce((n, s) => n + s.progress, 0) / serviceSummaries.length,
          ),
  };
}

export async function getStudentServiceDocs(studentId: string, slug: string) {
  await connectDB();

  const student = await User.findOne({ _id: studentId, role: "CLIENT" }).lean();
  if (!student) return null;

  const service = await Service.findOne({ slug }).lean();
  if (!service) return null;

  const application = await ServiceApplication.findOne({
    userId: student._id,
    serviceId: service._id,
  }).lean();

  if (!application) {
    return {
      student: {
        id: String(student._id),
        name: student.name,
        email: student.email,
      },
      service: {
        slug: service.slug,
        title: service.title,
        description: service.description,
      },
      application: null,
      slots: service.requirements.map((req) => ({
        key: req.key,
        label: req.label,
        description: req.description,
        required: req.required !== false,
        status: "missing" as const,
        submissionId: null as string | null,
        cloudinaryUrl: null as string | null,
        originalFilename: null as string | null,
        adminComment: null as string | null,
      })),
      progress: 0,
      status: "in_progress" as const,
    };
  }

  const submissions = await DocumentSubmission.find({
    applicationId: application._id,
  }).lean();

  const slots = service.requirements.map((req) => {
    const sub = submissions.find((s) => s.requirementKey === req.key);
    return {
      key: req.key,
      label: req.label,
      description: req.description,
      required: req.required !== false,
      status: (sub?.status ?? "missing") as
        | "missing"
        | "pending"
        | "approved"
        | "rejected",
      submissionId: sub?._id ? String(sub._id) : null,
      cloudinaryUrl: (sub?.cloudinaryUrl as string | null) ?? null,
      originalFilename: (sub?.originalFilename as string | null) ?? null,
      adminComment: (sub?.adminComment as string | null) ?? null,
    };
  });

  return {
    student: {
      id: String(student._id),
      name: student.name,
      email: student.email,
    },
    service: {
      slug: service.slug,
      title: service.title,
      description: service.description,
    },
    application: {
      id: String(application._id),
      status: application.status as "in_progress" | "ready" | "proceeded",
    },
    slots,
    progress: progressPercent(service.requirements, submissions),
    status: application.status as "in_progress" | "ready" | "proceeded",
  };
}
