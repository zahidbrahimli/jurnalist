import Image from "next/image";
import { Info, ShieldCheck, Users2, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="pointer-events-none absolute -right-20 -top-20 opacity-60">
          <Image src="/hero-blob.svg" alt="" width={360} height={240} />
        </div>
        <h1 className="text-2xl font-semibold inline-flex items-center gap-2"><Info className="text-teal-700"/> Haqqımızda</h1>
        <p className="mt-2 max-w-2xl text-neutral-700">Missiyamız: yanlış xəbərlərin qarşısını dərcdən əvvəl almaq. Etik kodeks, müstəqil yoxlama və tərəfdaşlarla şəffaf əməkdaşlıq əsasında.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="inline-flex items-center gap-2 font-medium"><ShieldCheck className="text-emerald-600"/> Etika</div>
            <p className="mt-1 text-sm text-neutral-700">Dürüstlük, mənbə yoxlaması və şəffaflıq prinsipimizdir.</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="inline-flex items-center gap-2 font-medium"><Users2 className="text-teal-700"/> Tərəfdaşlıq</div>
            <p className="mt-1 text-sm text-neutral-700">Media orqanları və QHT-lərlə əməkdaşlıq.</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="inline-flex items-center gap-2 font-medium"><ShieldCheck className="text-indigo-600"/> Keyfiyyət</div>
            <p className="mt-1 text-sm text-neutral-700">Çoxmərhələli yoxlama, audit və təkmilləşmə.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm shadow-sm">
            <p className="font-medium">Hüquqi sorğular</p>
            <p className="mt-1 text-neutral-700">Hüquqi sorğular üçün ayrıca e-poçt: legal@example.com</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 text-sm shadow-sm">
            <p className="font-medium">Məlumat təhlükəsizliyi</p>
            <p className="mt-1 text-neutral-700">Məlumatlar şifrələnmiş kanallarla ötürülür və qorunur.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold inline-flex items-center gap-2"><Mail className="text-teal-700"/> Əlaqə</h2>
        <form className="mt-4 max-w-lg space-y-3">
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <input placeholder="Ad" className="w-full rounded-md border border-neutral-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-600" />
              <input placeholder="E-poçt" className="w-full rounded-md border border-neutral-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-600" />
            </div>
            <textarea placeholder="Mesaj" rows={4} className="mt-3 w-full rounded-md border border-neutral-200 p-2 focus:outline-none focus:ring-2 focus:ring-teal-600" />
            <div className="mt-3">
              <button type="button" className="rounded-md bg-teal-600 px-4 py-2 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700">Göndər</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
