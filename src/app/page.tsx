import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-2">
          <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl supports-[backdrop-filter]:bg-white/50 sm:p-12">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_200px_at_20%_-20%,rgba(13,148,136,0.15),transparent),radial-gradient(600px_200px_at_80%_-30%,rgba(16,185,129,0.12),transparent)]" />
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs uppercase tracking-wider text-teal-700/80">Media etibarlılığı üçün</p>
              <h1 className="bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-6xl">
                Yanlış xəbərlər dərc olunmadan <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">əvvəl dayansın</span>
              </h1>
              <p className="mt-4 text-lg text-neutral-600">
                Jurnalistlər üçün sürətli yoxlama, menecerlər üçün şəffaf təsdiq paneli. Birgə daha etibarlı media.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/submit" className="rounded-md bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-3 text-white shadow-sm transition hover:opacity-95">
                  Xəbər göndər
                </Link>
                <Link href="/managers" className="rounded-md border border-neutral-200 bg-white/70 px-5 py-3 text-neutral-800 shadow-sm backdrop-blur transition hover:bg-neutral-50">
                  Menecer kimi daxil ol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 steps */}
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">3 addımda iş prinsipi</h2>
          <span className="text-sm text-neutral-500">Sürətli, şəffaf, auditlə</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "Göndərin", d: "Formu doldurun və göndərin" },
            { t: "Yoxlayın", d: "Menecer təsdiqləsin və ya rəy yazsın" },
            { t: "Dərc edin", d: "Təsdiqdən sonra dərc edin" },
          ].map((c, i) => (
            <div
              key={c.t}
              className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-50/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="mb-2 text-sm font-semibold text-teal-700/80">0{i + 1}</div>
              <h3 className="text-lg font-medium">{c.t}</h3>
              <p className="mt-1 text-sm text-neutral-600">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold">Faydalar</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {["Reputasiya", "Sürətli əməkdaşlıq", "Şəffaflıq"].map((t) => (
            <div
              key={t}
              className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-teal-100/60" />
              <h3 className="font-medium">{t}</h3>
              <p className="mt-1 text-sm text-neutral-600">Qısa izah mətni.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Əminlik</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-neutral-700">
            <li>GDPR/məxfilik, audit izi</li>
            <li>SLA göstəricisi: orta təsdiqləmə vaxtı: 3 saat</li>
          </ul>
        </div>
      </section>

      {/* Demo mock */}
      <section className="mx-auto max-w-6xl">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Demo</h2>
          <p className="mt-2 text-sm text-neutral-600">Review panelinin mock görüntüsü (tezdən).</p>
        </div>
      </section>
    </div>
  );
}
