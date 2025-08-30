"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Timeline } from "@/components/Timeline";
import { StatusBadge } from "@/components/StatusBadge";
import Image from "next/image";
import { Search, Activity, AlertTriangle } from "lucide-react";

type APIArticle = {
  id: string;
  title: string;
  status: "submitted" | "delivered" | "in_review" | "approved" | "needs_edit" | "rejected";
  statusEvents: { state: APIArticle["status"]; note: string | null; createdAt: string }[];
};

export default function StatusPage() {
  const sp = useSearchParams();
  const articleId = sp.get("articleId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [article, setArticle] = useState<APIArticle | null>(null);
  const [typedId, setTypedId] = useState<string>(articleId ?? "");
  const [urlValue, setUrlValue] = useState<string>("");

  useEffect(() => {
    if (!articleId) return;
    setLoading(true);
    setError(null);
    fetch(`/api/status?articleId=${articleId}`)
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j?.error || "Tapılmadı");
        setArticle(j.article);
      })
      .catch((e) => setError(e?.message || "Xəta"))
      .finally(() => setLoading(false));
  }, [articleId]);

  useEffect(() => {
    setTypedId(articleId ?? "");
  }, [articleId]);

  const items = useMemo(() => {
    if (!article) return [] as { label: string; date?: string; state: "completed" | "current" | "upcoming" }[];
    const order = ["submitted", "delivered", "in_review", "approved", "needs_edit", "rejected"] as const;
    const labelMap: Record<string, string> = {
      submitted: "Göndərildi",
      delivered: "Menecerə çatdı",
      in_review: "Baxılır",
      approved: "Təsdiqləndi",
      needs_edit: "Redaktəyə qaytarıldı",
      rejected: "Rədd edildi",
    };
    const seen = new Set<string>();
    const eventDates = new Map<string, string>();
    for (const ev of article.statusEvents) {
      if (!seen.has(ev.state)) {
        seen.add(ev.state);
        eventDates.set(ev.state, new Date(ev.createdAt).toLocaleString());
      }
    }
    let currentMet = false;
    return order
      .filter((s) => s === "approved" || s === "needs_edit" || s === "rejected" ? true : true)
      .map((s) => {
        const has = seen.has(s);
        let st: "completed" | "current" | "upcoming" = "upcoming";
        if (has && !currentMet) st = "completed";
        if (!has && !currentMet) {
          st = "current";
          currentMet = true;
        }
        return { label: labelMap[s], date: eventDates.get(s), state: st };
      });
  }, [article]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold inline-flex items-center gap-2"><Search className="text-teal-700"/> Status yoxla</h1>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-neutral-600">Kod (articleId) ilə yoxlayın:</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input value={typedId} onChange={(e) => setTypedId(e.target.value)} placeholder="Article ID yapışdır və ya yaz" className="w-full rounded-md border border-neutral-200 p-2" />
          <button
            onClick={() => typedId && (window.location.href = `/status?articleId=${encodeURIComponent(typedId)}`)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700"
          >
            <Search size={16}/> Yoxla
          </button>
        </div>
        <p className="mt-4 text-sm text-neutral-600">Və ya URL ilə axtar:</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input value={urlValue} onChange={(e) => setUrlValue(e.target.value)} placeholder="Xəbərin linkini yapışdırın" className="w-full rounded-md border border-neutral-200 p-2" />
          <button
            onClick={async () => {
              if (!urlValue) return;
              const res = await fetch(`/api/status-by-url?url=${encodeURIComponent(urlValue)}`);
              const j = await res.json();
              if (res.ok && j.articleId) {
                window.location.href = `/status?articleId=${encodeURIComponent(j.articleId)}`;
              } else {
                alert(j?.error || "Tapılmadı");
              }
            }}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700"
          >
            <Search size={16}/> Link ilə axtar
          </button>
        </div>
        {!articleId && <p className="mt-2 text-sm text-neutral-500">Göndərdikdən sonra avtomatik bura yönləndiriləcəksiniz.</p>}
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <Activity className="text-teal-700"/>
            <div>
              <div className="text-sm font-medium">Məqalə</div>
              <div className="text-xs text-neutral-500">ID: {article?.id}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {article && (
              <>
                <button onClick={() => article?.id && navigator.clipboard.writeText(article.id)} className="rounded-md border border-neutral-200 bg-white px-3 py-1 text-xs hover:bg-neutral-50">ID-ni kopyala</button>
                <button onClick={() => article?.id && navigator.clipboard.writeText(`${window.location.origin}/status?articleId=${article.id}`)} className="rounded-md border border-neutral-200 bg-white px-3 py-1 text-xs hover:bg-neutral-50">Linki paylaş</button>
              </>
            )}
            {article && <StatusBadge status={article.status as any} />}
          </div>
        </div>
        {loading && <p className="text-sm text-neutral-600">Yüklənir...</p>}
        {error && (
          <p className="inline-flex items-center gap-2 text-sm text-red-600"><AlertTriangle size={16}/> {error}</p>
        )}
        {!loading && !error && article && <Timeline items={items} />}
        {!loading && !error && !article && (
          <div className="flex flex-col items-center gap-2 py-6 text-center text-sm text-neutral-600">
            <Image src="/hero-blob.svg" alt="" width={320} height={200} className="opacity-70" />
            <p>Məlumat yoxdur. Zəhmət olmasa əvvəlcə xəbər göndərin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
