"use client";

import { Filter, Inbox, Clock, CheckCircle2, Pencil, XCircle, Flame, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";

export default function ManagersPage() {
  type Item = {
    id: string;
    title: string;
    subjectPerson: string | null;
    priority: "low" | "normal" | "high" | "urgent";
    status: "submitted" | "delivered" | "in_review" | "approved" | "needs_edit" | "rejected";
    createdAt: string;
  };

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [actionBusy, setActionBusy] = useState<string | null>(null); // articleId being acted on
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [details, setDetails] = useState<any | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null); // "me" | "unassigned" | email | null
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (statusFilter) p.set("status", statusFilter);
    if (priorityFilter) p.set("priority", priorityFilter);
    if (assigneeFilter) p.set("assignee", assigneeFilter);
    return p.toString();
  }, [statusFilter, priorityFilter, assigneeFilter]);

  const fetchInbox = async (opts?: { cursor?: string; append?: boolean }) => {
    setLoading(true);
    setError(null);
    try {
      const base = `/api/manager/inbox${query ? `?${query}` : ""}`;
      const url = new URL(base, window.location.origin);
      if (opts?.cursor) url.searchParams.set("cursor", opts.cursor);
      const res = await fetch(url.toString());
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Yükləmə alınmadı");
      setNextCursor(j.nextCursor || null);
      setItems((prev) => (opts?.append ? [...prev, ...j.items] : j.items));
    } catch (e: any) {
      setError(e?.message || "Xəta");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInbox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  async function review(articleId: string, decision: "approved" | "needs_edit" | "rejected") {
    const comment = window.prompt("Qısa qeyd (opsional)") || undefined;
    try {
      setActionBusy(articleId);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId, decision, comment }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Əməliyyat alınmadı");
      // refresh inbox
      await fetchInbox();
    } catch (e: any) {
      alert(e?.message || "Xəta");
    } finally {
      setActionBusy(null);
    }
  }

  async function assign(articleId: string, assigneeEmail: string | null) {
    try {
      setActionBusy(articleId);
      const res = await fetch("/api/articles/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId, assigneeEmail }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Təyinat alınmadı");
      await fetchInbox();
    } catch (e: any) {
      alert(e?.message || "Xəta");
    } finally {
      setActionBusy(null);
    }
  }

  async function openDetails(id: string) {
    setSelectedId(id);
    setDetails(null);
    setDetailsError(null);
    setDetailsLoading(true);
    try {
      const res = await fetch(`/api/articles/${id}`);
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Detallar yüklənmədi");
      setDetails(j.article);
    } catch (e: any) {
      setDetailsError(e?.message || "Xəta");
    } finally {
      setDetailsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold inline-flex items-center gap-2"><Inbox className="text-teal-700" /> Menecerlər üçün</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => { setStatusFilter(null); setPriorityFilter(null); setAssigneeFilter(null); }} className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-neutral-50">
            <Filter size={16} /> Sıfırla
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <button onClick={() => setStatusFilter("submitted")} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${statusFilter === "submitted" ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-700"}`}><Clock size={14}/> Gözləyən</button>
          <button onClick={() => setStatusFilter("in_review")} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${statusFilter === "in_review" ? "bg-blue-700 text-white" : "bg-blue-100 text-blue-800"}`}><Clock size={14}/> Baxılır</button>
          <button onClick={() => setStatusFilter("approved")} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${statusFilter === "approved" ? "bg-green-700 text-white" : "bg-green-100 text-green-800"}`}><CheckCircle2 size={14}/> Təsdiq</button>
          <button onClick={() => setStatusFilter("needs_edit")} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${statusFilter === "needs_edit" ? "bg-orange-700 text-white" : "bg-orange-100 text-orange-800"}`}><Pencil size={14}/> Redaktəyə qaytar</button>
          <button onClick={() => setStatusFilter("rejected")} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${statusFilter === "rejected" ? "bg-red-700 text-white" : "bg-red-100 text-red-800"}`}><XCircle size={14}/> Rədd</button>
          <button onClick={() => setPriorityFilter("urgent")} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${priorityFilter === "urgent" ? "bg-pink-700 text-white" : "bg-pink-100 text-pink-800"}`}><Flame size={14}/> Təcili</button>
          <span className="mx-2 h-5 w-px bg-neutral-200"/>
          <button onClick={() => setAssigneeFilter("me")} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${assigneeFilter === "me" ? "bg-teal-700 text-white" : "bg-teal-50 text-teal-800"}`}>Mənim</button>
          <button onClick={() => setAssigneeFilter("unassigned")} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${assigneeFilter === "unassigned" ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-700"}`}>Təyin olunmayıb</button>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-sm text-neutral-600"><Loader2 className="animate-spin" size={16}/> Yüklənir...</div>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((m) => (
              <div key={m.id} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-neutral-900">{m.title}</h3>
                  <StatusBadge status={m.status as any} />
                </div>
                <div className="mt-2 text-xs text-neutral-500">{new Date(m.createdAt).toLocaleString()}</div>
                <div className="mt-2 flex items-center gap-2 text-xs text-neutral-600">
                  {m.subjectPerson && <span className="rounded-md bg-neutral-100 px-2 py-0.5">{m.subjectPerson}</span>}
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5">{m.priority.toUpperCase()}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  <button onClick={() => openDetails(m.id)} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-1 shadow-sm hover:bg-neutral-50">Bax</button>
                  <button disabled={actionBusy === m.id} onClick={() => assign(m.id, "manager@example.com")} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-1 shadow-sm hover:bg-neutral-50 disabled:opacity-50">Mənə təyin et</button>
                  <button disabled={actionBusy === m.id} onClick={() => assign(m.id, null)} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-1 shadow-sm hover:bg-neutral-50 disabled:opacity-50">Təyinatı sil</button>
                  <button disabled={actionBusy === m.id} onClick={() => review(m.id, "approved")} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-1 shadow-sm hover:bg-neutral-50 disabled:opacity-50"><CheckCircle2 size={16}/> Təsdiq</button>
                  <button disabled={actionBusy === m.id} onClick={() => review(m.id, "needs_edit")} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-1 shadow-sm hover:bg-neutral-50 disabled:opacity-50"><Pencil size={16}/> Redaktəyə qaytar</button>
                  <button disabled={actionBusy === m.id} onClick={() => review(m.id, "rejected")} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-1 shadow-sm hover:bg-neutral-50 disabled:opacity-50"><XCircle size={16}/> Rədd</button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="col-span-full text-sm text-neutral-600">Siyahı boşdur.</p>
            )}
            {nextCursor && (
              <button onClick={() => fetchInbox({ cursor: nextCursor, append: true })} className="col-span-full mt-2 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-neutral-50">Daha çox yüklə</button>
            )}
          </div>
        )}
      </div>

      {selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Məqalə detalları</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => details?.id && navigator.clipboard.writeText(details.id)} className="rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm hover:bg-neutral-50">ID-ni kopyala</button>
                <button onClick={() => setSelectedId(null)} className="rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm hover:bg-neutral-50">Bağla</button>
              </div>
            </div>
            {detailsLoading && <div className="mt-3 inline-flex items-center gap-2 text-sm text-neutral-600"><Loader2 className="animate-spin" size={16}/> Yüklənir...</div>}
            {detailsError && <p className="mt-3 text-sm text-red-600">{detailsError}</p>}
            {details && (
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <div className="text-xs text-neutral-500">ID</div>
                  <div className="font-mono">{details.id}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500">Başlıq</div>
                  <div className="font-medium">{details.title}</div>
                </div>
                {details.url && (
                  <div>
                    <div className="text-xs text-neutral-500">Link</div>
                    <a href={details.url} target="_blank" className="text-teal-700 hover:underline">{details.url}</a>
                  </div>
                )}
                {details.body && (
                  <div>
                    <div className="text-xs text-neutral-500">Mətn</div>
                    <p className="whitespace-pre-wrap text-neutral-700">{details.body}</p>
                  </div>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  {details.subjectPerson && (
                    <div>
                      <div className="text-xs text-neutral-500">Subyekt şəxs</div>
                      <div>{details.subjectPerson}</div>
                    </div>
                  )}
                  {details.officialEmail && (
                    <div>
                      <div className="text-xs text-neutral-500">Rəsmi e-poçt</div>
                      <div>{details.officialEmail}</div>
                    </div>
                  )}
                  {details.newsroomContact && (
                    <div>
                      <div className="text-xs text-neutral-500">Redaksiya kontaktı</div>
                      <div>{details.newsroomContact}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-neutral-500">Prioritet</div>
                    <div className="inline-flex items-center gap-2"><span className="rounded-md bg-neutral-100 px-2 py-0.5">{details.priority?.toUpperCase()}</span></div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">Status</div>
                    <StatusBadge status={details.status} />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-neutral-700">Status hadisələri</div>
                  <ul className="mt-1 space-y-1 text-xs text-neutral-600">
                    {details.statusEvents?.map((e: any, idx: number) => (
                      <li key={idx} className="flex items-center justify-between">
                        <span>{e.state}</span>
                        <span className="text-neutral-500">{new Date(e.createdAt).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {details.reviews?.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-neutral-700">Qərarlar</div>
                    <ul className="mt-1 space-y-1 text-xs text-neutral-600">
                      {details.reviews.map((r: any) => (
                        <li key={r.id} className="flex items-center justify-between">
                          <span>{r.decision}{r.comment ? ` — ${r.comment}` : ""}</span>
                          <span className="text-neutral-500">{new Date(r.decidedAt).toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button disabled={actionBusy === selectedId} onClick={() => selectedId && review(selectedId, "approved")} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm hover:bg-neutral-50 disabled:opacity-50"><CheckCircle2 size={16}/> Təsdiq</button>
                  <button disabled={actionBusy === selectedId} onClick={() => selectedId && review(selectedId, "needs_edit")} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm hover:bg-neutral-50 disabled:opacity-50"><Pencil size={16}/> Redaktəyə qaytar</button>
                  <button disabled={actionBusy === selectedId} onClick={() => selectedId && review(selectedId, "rejected")} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm hover:bg-neutral-50 disabled:opacity-50"><XCircle size={16}/> Rədd</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
