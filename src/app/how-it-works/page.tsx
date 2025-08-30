import { CheckCircle2, Newspaper, Users, HelpCircle } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-2xl font-semibold inline-flex items-center gap-2"><Newspaper className="text-teal-700"/> Necə işləyir?</h1>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="inline-flex items-center gap-2 font-medium"><Users size={18} className="text-teal-700"/> Jurnalist axını</h2>
            <ol className="mt-3 space-y-2 text-sm text-neutral-700">
              <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> Formu doldur</li>
              <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> Menecerə gedir</li>
              <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> E-poçta bildiriş</li>
              <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> Status linki</li>
            </ol>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="inline-flex items-center gap-2 font-medium"><Users size={18} className="text-teal-700"/> Menecer axını</h2>
            <ol className="mt-3 space-y-2 text-sm text-neutral-700">
              <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> Daxil ol</li>
              <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> Gələnlər qutusu</li>
              <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> Oxu → Təsdiq / Redaktə / Rədd</li>
              <li className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600"/> Şərh yaz</li>
            </ol>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold inline-flex items-center gap-2"><HelpCircle className="text-teal-700"/> Tez-tez verilən suallar</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm shadow-sm">
            <p className="font-medium">Hansı fayl tipləri?</p>
            <p className="mt-1 text-neutral-700">PDF, DOC/DOCX, şəkillər.</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm shadow-sm">
            <p className="font-medium">Cavab geciksə nə olur?</p>
            <p className="mt-1 text-neutral-700">Bildiriş gəlir və status səhifəsindən izləyə bilərsiniz.</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm shadow-sm">
            <p className="font-medium">Bir neçə menecer necə əlavə olunur?</p>
            <p className="mt-1 text-neutral-700">Təşkilat hesabından bir neçə menecer təyin edilə bilər.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
