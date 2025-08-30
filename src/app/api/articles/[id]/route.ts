import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!id) return NextResponse.json({ error: "id tələb olunur" }, { status: 400 });

  const article = await prisma.article.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      body: true,
      url: true,
      subjectPerson: true,
      officialEmail: true,
      newsroomContact: true,
      priority: true,
      status: true,
      createdAt: true,
      reviews: {
        select: { id: true, decision: true, comment: true, decidedAt: true },
        orderBy: { decidedAt: "desc" },
      },
      statusEvents: {
        select: { state: true, note: true, createdAt: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!article) return NextResponse.json({ error: "Tapılmadı" }, { status: 404 });
  return NextResponse.json({ ok: true, article });
}
