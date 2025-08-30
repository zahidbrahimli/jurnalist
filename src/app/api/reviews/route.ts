import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  articleId: z.string().min(1),
  decision: z.enum(["approved", "needs_edit", "rejected"]),
  comment: z.string().optional(),
  managerEmail: z.string().email().optional().default("manager@example.com"),
  managerName: z.string().optional().default("System Manager"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = schema.parse(json);

    // Ensure manager user exists (simple upsert for MVP)
    const manager = await prisma.user.upsert({
      where: { email: data.managerEmail },
      update: {},
      create: {
        email: data.managerEmail,
        name: data.managerName,
        role: "manager",
      },
      select: { id: true },
    });

    // Create review
    const review = await prisma.review.create({
      data: {
        articleId: data.articleId,
        decision: data.decision as any,
        comment: data.comment,
        managerId: manager.id,
      },
      select: { id: true, decision: true },
    });

    // Update article status and add status event
    const newState = data.decision as any; // aligns with State enum for approved/needs_edit/rejected
    await prisma.article.update({
      where: { id: data.articleId },
      data: {
        status: newState,
        statusEvents: {
          create: {
            state: newState,
            note: data.comment ?? undefined,
          },
        },
      },
    });

    return NextResponse.json({ ok: true, reviewId: review.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Xəta" }, { status: 400 });
  }
}
