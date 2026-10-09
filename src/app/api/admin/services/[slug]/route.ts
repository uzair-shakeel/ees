import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { refreshApplicationStatus } from "@/lib/application-status";
import { Service } from "@/models/Service";
import { ServiceApplication } from "@/models/ServiceApplication";

type Params = { params: Promise<{ slug: string }> };

type RequirementInput = {
  key: string;
  label: string;
  description: string;
  required: boolean;
};

function slugKey(label: string, used: Set<string>) {
  const base =
    label
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 48) || "document";
  let key = base;
  let n = 2;
  while (used.has(key)) {
    key = `${base}_${n++}`;
  }
  used.add(key);
  return key;
}

function parseRequirements(value: unknown): RequirementInput[] | string {
  if (!Array.isArray(value)) return "Liste de documents invalide.";
  if (value.length > 40) return "40 documents maximum par section.";

  const used = new Set<string>();
  const requirements: RequirementInput[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") return "Un document est invalide.";
    const row = item as Record<string, unknown>;
    const label = String(row.label || "").trim();
    const description = String(row.description || "").trim();
    if (!label || label.length > 120) return "Chaque document doit avoir un nom (120 caractères max).";
    if (!description || description.length > 400) {
      return "Chaque document doit avoir une courte description (400 caractères max).";
    }

    const rawKey = String(row.key || "").trim();
    const keepKey = /^[a-z0-9_]{1,60}$/.test(rawKey) && !rawKey.startsWith("new_");
    const key = keepKey && !used.has(rawKey) ? (used.add(rawKey), rawKey) : slugKey(label, used);

    requirements.push({
      key,
      label,
      description,
      required: row.required !== false,
    });
  }

  return requirements;
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await requireSession("ADMIN");
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();
    const parsed = parseRequirements(body.requirements);
    if (typeof parsed === "string") {
      return NextResponse.json({ error: parsed }, { status: 400 });
    }

    await connectDB();
    const service = await Service.findOne({ slug });
    if (!service) {
      return NextResponse.json({ error: "Section introuvable." }, { status: 404 });
    }

    service.requirements = parsed;
    await service.save();

    const applications = await ServiceApplication.find({ serviceId: service._id }).select("_id");
    for (const application of applications) {
      await refreshApplicationStatus(String(application._id), service.requirements);
    }

    return NextResponse.json({
      slug: service.slug,
      requirements: service.requirements.map((req) => ({
        key: req.key,
        label: req.label,
        description: req.description,
        required: req.required !== false,
      })),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
