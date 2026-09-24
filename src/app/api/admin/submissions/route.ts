import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { DocumentSubmission } from "@/models/DocumentSubmission";
import { ServiceApplication } from "@/models/ServiceApplication";
import { Service } from "@/models/Service";
import { User } from "@/models/User";

export async function GET() {
  try {
    const session = await requireSession("ADMIN");
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    await connectDB();

    const pending = await DocumentSubmission.find({ status: "pending" })
      .sort({ updatedAt: -1 })
      .lean();

    const applicationIds = [...new Set(pending.map((p) => String(p.applicationId)))];
    const applications = await ServiceApplication.find({
      _id: { $in: applicationIds },
    }).lean();
    const serviceIds = [...new Set(applications.map((a) => String(a.serviceId)))];
    const userIds = [...new Set(applications.map((a) => String(a.userId)))];

    const [services, users] = await Promise.all([
      Service.find({ _id: { $in: serviceIds } }).lean(),
      User.find({ _id: { $in: userIds } }).lean(),
    ]);

    const items = pending.map((sub) => {
      const app = applications.find((a) => String(a._id) === String(sub.applicationId));
      const service = services.find((s) => String(s._id) === String(app?.serviceId));
      const user = users.find((u) => String(u._id) === String(app?.userId));
      const requirement = service?.requirements.find((r) => r.key === sub.requirementKey);

      return {
        id: String(sub._id),
        requirementKey: sub.requirementKey,
        label: requirement?.label ?? sub.requirementKey,
        status: sub.status,
        cloudinaryUrl: sub.cloudinaryUrl,
        originalFilename: sub.originalFilename,
        updatedAt: sub.updatedAt,
        client: user
          ? { id: String(user._id), name: user.name, email: user.email }
          : null,
        service: service
          ? { id: String(service._id), slug: service.slug, title: service.title }
          : null,
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
