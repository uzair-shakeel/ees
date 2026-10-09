import { connectDB } from "@/lib/mongodb";
import { progressPercent } from "@/lib/application-status";
import { PORTAL_SERVICE_ORDER } from "@/lib/services-catalog";
import { Service } from "@/models/Service";
import { ServiceApplication } from "@/models/ServiceApplication";
import { DocumentSubmission } from "@/models/DocumentSubmission";
import type { JourneyStep } from "@/components/ProcedureSteps";

const SHORT: Record<string, string> = {
  "private-university": "Univ. privées",
  "campus-france": "Campus France",
  visa: "Visa",
  "tourist-visa": "Visa tourisme",
  installation: "Installation",
};

export async function getClientJourney(userId: string): Promise<JourneyStep[]> {
  await connectDB();

  const services = await Service.find({
    slug: { $in: [...PORTAL_SERVICE_ORDER] },
  }).lean();
  const bySlug = new Map(services.map((s) => [s.slug, s]));

  const applications = await ServiceApplication.find({ userId }).lean();
  const byServiceId = new Map(applications.map((a) => [String(a.serviceId), a]));

  const steps: JourneyStep[] = [];

  for (const slug of PORTAL_SERVICE_ORDER) {
    const service = bySlug.get(slug);
    if (!service) continue;

    const app = byServiceId.get(String(service._id));
    if (!app) {
      steps.push({
        slug,
        title: service.title,
        short: SHORT[slug] ?? service.title,
        status: "locked",
        progress: 0,
      });
      continue;
    }

    const submissions = await DocumentSubmission.find({
      applicationId: app._id,
    }).lean();

    steps.push({
      slug,
      title: service.title,
      short: SHORT[slug] ?? service.title,
      status: app.status as JourneyStep["status"],
      progress: progressPercent(service.requirements, submissions),
    });
  }

  return steps;
}
