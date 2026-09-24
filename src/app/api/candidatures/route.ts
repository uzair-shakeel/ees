import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Candidature } from "@/models/Candidature";

function serialize(doc: {
  _id: { toString(): string };
  etablissement: string;
  programme: string;
  ville?: string | null;
  niveau?: string | null;
  voie?: string | null;
  dateLimite?: Date | null;
  status: string;
  notes?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  return {
    id: String(doc._id),
    etablissement: doc.etablissement,
    programme: doc.programme,
    ville: doc.ville ?? "",
    niveau: doc.niveau ?? "",
    voie: doc.voie ?? "",
    dateLimite: doc.dateLimite ? doc.dateLimite.toISOString().slice(0, 10) : "",
    status: doc.status,
    notes: doc.notes ?? "",
    createdAt: doc.createdAt?.toISOString() ?? null,
  };
}

export async function GET() {
  const session = await requireSession("CLIENT");
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  await connectDB();
  const rows = await Candidature.find({ userId: session.userId })
    .sort({ updatedAt: -1 })
    .lean();

  return NextResponse.json({ items: rows.map(serialize) });
}

export async function POST(request: Request) {
  const session = await requireSession("CLIENT");
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body?.etablissement?.trim() || !body?.programme?.trim()) {
    return NextResponse.json(
      { error: "Établissement et programme sont obligatoires." },
      { status: 400 },
    );
  }

  await connectDB();
  const created = await Candidature.create({
    userId: session.userId,
    etablissement: String(body.etablissement).trim(),
    programme: String(body.programme).trim(),
    ville: String(body.ville || "").trim(),
    niveau: String(body.niveau || "").trim(),
    voie: String(body.voie || "").trim(),
    dateLimite: body.dateLimite ? new Date(body.dateLimite) : null,
    status: "interesse",
    notes: String(body.notes || ""),
  });

  return NextResponse.json({ item: serialize(created) }, { status: 201 });
}
