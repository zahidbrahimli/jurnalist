import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  articleId: z.string().min(1),
  assigneeEmail: z.string().email().nullable().optional(), // null -> unassign
  managerEmail: z.string().email().optional().default("manager@example.com"),
  managerName: z.string().optional().default("System Manager"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = schema.parse(json);

    // Ensure acting manager exists (MVP auth substitute)
    await prisma.user.upsert({
      where: { email: data.managerEmail },
      update: {},
      create: { email: data.managerEmail, name: data.managerName, role: "manager" },
    });

    let assigneeId: string | null = null;
    if (data.assigneeEmail) {
      const assignee = await prisma.user.upsert({
        where: { email: data.assigneeEmail },
        update: {},
        create: { email: data.assigneeEmail, name: data.assigneeEmail, role: "manager" },
        select: { id: true },
      });
      assigneeId = assignee.id;
    }

    await prisma.article.update({ where: { id: data.articleId }, data: { assigneeId } });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Xəta" }, { status: 400 });
  }
}
