import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Candidature } from "@/models/Candidature";
import { CANDIDATURE_STATUSES } from "@/lib/module-catalog";

type Params = { params: Promise<{ id: string }> };

const STATUS_VALUES = CANDIDATURE_STATUSES.map((s) => s.value);

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireSession("CLIENT");
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Corps invalide." }, { status: 400 });

  await connectDB();
  const item = await Candidature.findOne({ _id: id, userId: session.userId });
  if (!item) return NextResponse.json({ error: "Introuvable." }, { status: 404 });

  if (body.etablissement != null) item.etablissement = String(body.etablissement).trim();
  if (body.programme != null) item.programme = String(body.programme).trim();
  if (body.ville != null) item.ville = String(body.ville).trim();
  if (body.niveau != null) item.niveau = String(body.niveau).trim();
  if (body.voie != null) item.voie = String(body.voie).trim();
  if (body.notes != null) item.notes = String(body.notes);
  if (body.dateLimite !== undefined) {
    item.dateLimite = body.dateLimite ? new Date(body.dateLimite) : null;
  }
  if (body.status != null) {
    if (!STATUS_VALUES.includes(body.status)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }
    item.status = body.status;
  }

  await item.save();
  return NextResponse.json({
    item: {
      id: String(item._id),
      etablissement: item.etablissement,
      programme: item.programme,
      ville: item.ville,
      niveau: item.niveau,
      voie: item.voie,
      dateLimite: item.dateLimite ? item.dateLimite.toISOString().slice(0, 10) : "",
      status: item.status,
      notes: item.notes,
    },
  });
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireSession("CLIENT");
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const result = await Candidature.deleteOne({ _id: id, userId: session.userId });
  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
