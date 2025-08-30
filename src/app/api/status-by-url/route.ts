import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) return NextResponse.json({ ok: false, error: "url tələb olunur" }, { status: 400 });

  const article = await prisma.article.findFirst({
    where: { url },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });

  if (!article) return NextResponse.json({ ok: false, error: "Tapılmadı" }, { status: 404 });
  return NextResponse.json({ ok: true, articleId: article.id });
}
