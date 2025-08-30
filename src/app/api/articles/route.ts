import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().min(3),
  body: z.string().optional(),
  url: z.string().url().optional(),
  files: z.any().optional(), // expect array or null; stored as JSON
  subjectPerson: z.string().optional(),
  officialEmail: z.string().email().optional(),
  newsroomContact: z.string().optional(),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  journalistEmail: z.string().email().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = schema.parse(json);

    const article = await prisma.article.create({
      data: {
        title: data.title,
        body: data.body,
        url: data.url,
        files: data.files ?? null,
        subjectPerson: data.subjectPerson,
        officialEmail: data.officialEmail,
        newsroomContact: data.newsroomContact,
        priority: data.priority as any,
        journalistEmail: data.journalistEmail,
        statusEvents: {
          create: {
            state: "submitted",
            note: "Məqalə göndərildi",
          },
        },
      },
      select: { id: true },
    });

    return NextResponse.json(
      {
        ok: true,
        articleId: article.id,
        message: "Uğurla göndərildi",
      },
      { status: 201 }
    );
  } catch (e: any) {
    const msg = e?.message || "Xəta baş verdi";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
