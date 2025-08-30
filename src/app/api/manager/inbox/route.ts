import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as
    | "submitted"
    | "delivered"
    | "in_review"
    | "approved"
    | "needs_edit"
    | "rejected"
    | null;
  const priority = searchParams.get("priority") as "low" | "normal" | "high" | "urgent" | null;
  const assignee = searchParams.get("assignee"); // "me" | email | null
  const cursor = searchParams.get("cursor");
  const take = Math.min(Number(searchParams.get("take") || 10), 50);

  const where: any = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (!status) where.status = { in: ["submitted", "in_review"] };
  if (assignee) {
    if (assignee === "unassigned") where.assigneeId = null;
    else if (assignee === "me") {
      const me = await prisma.user.findUnique({ where: { email: "manager@example.com" }, select: { id: true } });
      if (me) where.assigneeId = me.id; else where.assigneeId = "__none__"; // no results fallback
    } else {
      const u = await prisma.user.findUnique({ where: { email: assignee }, select: { id: true } });
      if (u) where.assigneeId = u.id; else where.assigneeId = "__none__";
    }
  }

  const articles = await prisma.article.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: take + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: {
      id: true,
      title: true,
      subjectPerson: true,
      priority: true,
      status: true,
      createdAt: true,
    },
  });

  let nextCursor: string | null = null;
  if (articles.length > take) {
    const next = articles.pop();
    nextCursor = next?.id || null;
  }

  return NextResponse.json({ ok: true, items: articles, nextCursor });
}
