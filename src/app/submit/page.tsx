"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Send, FileText, Link2, User, Mail, Flag, ShieldCheck, Loader2 } from "lucide-react";

const schema = z.object({
  title: z.string().min(3),
  body: z.string().optional(),
  url: z.string().url().optional().or(z.literal("")),
  subjectPerson: z.string().optional(),
  officialEmail: z.string().email().optional(),
  newsroomContact: z.string().optional(),
  priority: z.enum(["low", "normal", "high", "urgent"]),
  agree: z
    .boolean()
    .refine((v) => v === true, { message: "Şərtləri qəbul edin" }),
  journalistEmail: z.string().email().optional(),
});

type FormData = z.infer<typeof schema>;

export default function SubmitPage() {
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { priority: "normal", agree: false },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          body: data.body || undefined,
          url: data.url || undefined,
          subjectPerson: data.subjectPerson || undefined,
          officialEmail: data.officialEmail || undefined,
          newsroomContact: data.newsroomContact || undefined,
          priority: data.priority,
          journalistEmail: data.journalistEmail || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Göndərmə alınmadı");
      reset();
      router.push(`/status?articleId=${json.articleId}`);
    } catch (e: any) {
      alert(e?.message || "Xəta baş verdi");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold inline-flex items-center gap-2"><Send className="text-teal-700"/> Xəbər göndər</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div>
            <label className="inline-flex items-center gap-2 text-sm font-medium"><FileText size={16}/> Başlıq</label>
            <input {...register("title")} className="mt-1 w-full rounded-md border border-neutral-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-600" />
            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center gap-2 text-sm font-medium"><FileText size={16}/> Xəbər mətni</label>
            <textarea {...register("body")} rows={4} className="mt-1 w-full rounded-md border border-neutral-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-600" />
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center gap-2 text-sm font-medium"><Link2 size={16}/> Link</label>
            <input {...register("url")} placeholder="https://" className="mt-1 w-full rounded-md border border-neutral-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-600" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="inline-flex items-center gap-2 text-sm font-medium"><User size={16}/> Subyekt şəxs</label>
              <input {...register("subjectPerson")} className="mt-1 w-full rounded-md border border-neutral-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-600" />
            </div>
            <div>
              <label className="inline-flex items-center gap-2 text-sm font-medium"><Mail size={16}/> Rəsmi əlaqə e-poçtu</label>
              <input {...register("officialEmail")} className="mt-1 w-full rounded-md border border-neutral-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-600" />
            </div>
            <div>
              <label className="inline-flex items-center gap-2 text-sm font-medium"><User size={16}/> Redaksiyanın kontaktı</label>
              <input {...register("newsroomContact")} className="mt-1 w-full rounded-md border border-neutral-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-600" />
            </div>
            <div>
              <label className="inline-flex items-center gap-2 text-sm font-medium"><Flag size={16}/> Təciliyyət səviyyəsi</label>
              <select {...register("priority")} className="mt-1 w-full rounded-md border border-neutral-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-600">
                <option value="low">Aşağı</option>
                <option value="normal">Normal</option>
                <option value="high">Yüksək</option>
                <option value="urgent">Təcili</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="inline-flex items-center gap-2 text-sm font-medium"><Mail size={16}/> Sizin e-poçt (opsional)</label>
              <input {...register("journalistEmail")} className="mt-1 w-full rounded-md border border-neutral-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-600" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Fayl (pdf/doc) — (mock)</label>
            <input type="file" className="mt-1 w-full rounded-md border border-neutral-200 p-2" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input id="agree" type="checkbox" {...register("agree")} />
            <label htmlFor="agree" className="inline-flex items-center gap-2 text-sm"><ShieldCheck size={16} className="text-emerald-600"/> Etika qaydalarını və məxfilik şərtlərini qəbul edirəm.</label>
          </div>
          {errors.agree && <p className="text-sm text-red-600">{errors.agree.message}</p>}
          <div className="mt-4">
            <button disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700 disabled:opacity-50">
              {isSubmitting ? <Loader2 className="animate-spin" size={16}/> : <Send size={16}/>} Göndər
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
