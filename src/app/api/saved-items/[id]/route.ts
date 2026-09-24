import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { SavedItem } from "@/models/SavedItem";
import { Candidature } from "@/models/Candidature";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireSession("CLIENT");
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const result = await SavedItem.deleteOne({ _id: id, userId: session.userId });
  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession("CLIENT");
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  if (body?.action !== "convert") {
    return NextResponse.json({ error: "Action inconnue." }, { status: 400 });
  }

  await connectDB();
  const saved = await SavedItem.findOne({ _id: id, userId: session.userId });
  if (!saved) return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  if (saved.type !== "formation") {
    return NextResponse.json(
      { error: "Seules les formations peuvent devenir une candidature." },
      { status: 400 },
    );
  }

  const created = await Candidature.create({
    userId: session.userId,
    etablissement: saved.subtitle || saved.title,
    programme: saved.title,
    ville: "",
    niveau: "",
    voie: "EEF",
    status: "interesse",
    notes: saved.notes || saved.url || "",
  });

  return NextResponse.json({
    candidatureId: String(created._id),
    ok: true,
  });
}
