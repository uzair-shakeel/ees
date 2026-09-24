import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { SavedItem } from "@/models/SavedItem";
import { SAVED_TYPES } from "@/lib/module-catalog";

function serialize(doc: {
  _id: { toString(): string };
  type: string;
  title: string;
  subtitle?: string | null;
  url?: string | null;
  notes?: string | null;
  createdAt?: Date;
}) {
  return {
    id: String(doc._id),
    type: doc.type,
    title: doc.title,
    subtitle: doc.subtitle ?? "",
    url: doc.url ?? "",
    notes: doc.notes ?? "",
    createdAt: doc.createdAt?.toISOString() ?? null,
  };
}

export async function GET() {
  const session = await requireSession("CLIENT");
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  await connectDB();
  const rows = await SavedItem.find({ userId: session.userId }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items: rows.map(serialize) });
}

export async function POST(request: Request) {
  const session = await requireSession("CLIENT");
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const type = body?.type;
  const title = String(body?.title || "").trim();
  if (!title || !SAVED_TYPES.some((t) => t.value === type)) {
    return NextResponse.json({ error: "Type et titre obligatoires." }, { status: 400 });
  }

  await connectDB();
  const created = await SavedItem.create({
    userId: session.userId,
    type,
    title,
    subtitle: String(body.subtitle || "").trim(),
    url: String(body.url || "").trim(),
    notes: String(body.notes || ""),
  });

  return NextResponse.json({ item: serialize(created) }, { status: 201 });
}
