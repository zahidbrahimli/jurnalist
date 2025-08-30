import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("articleId");
  if (!articleId) {
    return NextResponse.json({ ok: false, error: "articleId tələb olunur" }, { status: 400 });
  }
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: {
      id: true,
      title: true,
      status: true,
      statusEvents: { orderBy: { createdAt: "asc" }, select: { state: true, note: true, createdAt: true } },
    },
  });
  if (!article) return NextResponse.json({ ok: false, error: "Tapılmadı" }, { status: 404 });
  return NextResponse.json({ ok: true, article });
}
