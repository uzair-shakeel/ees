import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import {
  INSTALLATION_STEPS,
  VISA_STEPS,
  type ChecklistStatus,
} from "@/lib/module-catalog";
import { ModuleChecklist } from "@/models/ModuleChecklist";

type Params = { params: Promise<{ module: string }> };

const ALLOWED = ["visa", "installation"] as const;
const STATUS: ChecklistStatus[] = ["todo", "doing", "done"];

export async function GET(_request: Request, { params }: Params) {
  const session = await requireSession("CLIENT");
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { module: moduleParam } = await params;
  if (!ALLOWED.includes(moduleParam as (typeof ALLOWED)[number])) {
    return NextResponse.json({ error: "Module inconnu." }, { status: 404 });
  }
  const module = moduleParam as "visa" | "installation";

  const catalog = module === "visa" ? VISA_STEPS : INSTALLATION_STEPS;
  await connectDB();
  const rows = await ModuleChecklist.find({
    userId: session.userId,
    module,
  }).lean();
  const map = new Map(rows.map((r) => [r.stepKey, r.status as ChecklistStatus]));

  const steps = catalog.map((step) => ({
    ...step,
    status: map.get(step.key) ?? ("todo" as ChecklistStatus),
  }));

  const done = steps.filter((s) => s.status === "done").length;

  return NextResponse.json({
    module,
    progress: Math.round((done / steps.length) * 100),
    done,
    total: steps.length,
    steps,
  });
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireSession("CLIENT");
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { module: moduleParam } = await params;
  if (!ALLOWED.includes(moduleParam as (typeof ALLOWED)[number])) {
    return NextResponse.json({ error: "Module inconnu." }, { status: 404 });
  }
  const module = moduleParam as "visa" | "installation";

  const body = await request.json().catch(() => null);
  const stepKey = String(body?.stepKey || "");
  const status = body?.status as ChecklistStatus;

  const catalog = module === "visa" ? VISA_STEPS : INSTALLATION_STEPS;
  if (!catalog.some((s) => s.key === stepKey)) {
    return NextResponse.json({ error: "Étape inconnue." }, { status: 400 });
  }
  if (!STATUS.includes(status)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  await connectDB();
  await ModuleChecklist.findOneAndUpdate(
    { userId: session.userId, module, stepKey },
    { $set: { status } },
    { upsert: true, new: true },
  );

  return NextResponse.json({ ok: true, stepKey, status });
}
