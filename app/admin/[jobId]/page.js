"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import RequireRole from "@/components/RequireRole";
import StatusTimeline from "@/components/StatusTimeline";
import SendQuoteForm from "@/components/admin/SendQuoteForm";
import MapPlaceholder from "@/components/admin/MapPlaceholder";
import { useStore } from "@/components/StoreProvider";
import { getServiceBySlug, formatCurrency, formatDate } from "@/lib/mockData";

function JobDetailContent() {
  const { jobId } = useParams();
  const { getJob, markJobRead, sendQuote, assignExactDate, startJob, markComplete, payBalance } = useStore();
  const job = getJob(jobId);
  const [lightbox, setLightbox] = useState(null);
  const [exactDate, setExactDate] = useState(job?.scheduledDate ?? "");
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    if (job?.unread) markJobRead(job.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job?.id]);

  if (!job) {
    return (
      <div className="mx-auto max-w-content px-5 py-24 text-center sm:px-8">
        <p className="text-ink/50">We couldn't find that request.</p>
        <Link href="/admin" className="mt-4 inline-block text-sm text-brass hover:underline">
          Back to inbox
        </Link>
      </div>
    );
  }

  const service = getServiceBySlug(job.category);
  const balanceDue = job.quote ? job.quote.price - job.quote.deposit : 0;
  const needsQuote = job.status === "Pending review" || job.status === "Declined" || showQuoteForm;

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
      <Link href="/admin" className="text-sm text-ink/50 hover:text-charcoal">
        ← Back to inbox
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brass">#{job.id}</p>
          <h1 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">
            {service?.name} — {job.customer.name}
          </h1>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto rounded-md border border-line bg-white p-5">
        <div className="min-w-[560px]">
          <StatusTimeline status={job.status} />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-md border border-line bg-white p-6">
            <p className="text-xs uppercase tracking-wide text-ink/40">Description</p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal">{job.description}</p>
            <span className="mt-4 inline-block rounded-full bg-bone px-3 py-1 text-xs text-ink/50">
              Budget: {job.budgetRange}
            </span>
          </div>

          <div className="rounded-md border border-line bg-white p-6">
            <p className="text-xs uppercase tracking-wide text-ink/40">Photos</p>
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {job.photos.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(src)}
                  className="aspect-square overflow-hidden rounded-md border border-line"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover transition hover:scale-105" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-line bg-white p-6">
            <p className="text-xs uppercase tracking-wide text-ink/40">Address</p>
            <div className="mt-3">
              <MapPlaceholder address={job.address} />
            </div>
          </div>

          <div className="rounded-md border border-line bg-white p-6">
            <p className="text-xs uppercase tracking-wide text-ink/40">Customer contact</p>
            <div className="mt-2 space-y-1 text-sm">
              <p className="text-charcoal">{job.customer.name}</p>
              <a href={`mailto:${job.customer.email}`} className="block text-brass hover:underline">
                {job.customer.email}
              </a>
              <a href={`tel:${job.customer.phone}`} className="block text-brass hover:underline">
                {job.customer.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {needsQuote ? (
            <div className="rounded-md border border-line bg-white p-6">
              <p className="text-xs uppercase tracking-wide text-ink/40">
                {job.status === "Declined" ? "Send revised quote" : "Send quote"}
              </p>
              <div className="mt-4">
                <SendQuoteForm
                  existingQuote={job.quote}
                  onSend={(quote) => {
                    sendQuote(job.id, quote);
                    setShowQuoteForm(false);
                  }}
                />
              </div>
            </div>
          ) : null}

          {job.status === "Quote sent" ? (
            <div className="rounded-md border border-line bg-white p-6">
              <p className="text-xs uppercase tracking-wide text-ink/40">Quote sent</p>
              <p className="mt-2 font-serif text-2xl text-charcoal">{formatCurrency(job.quote.price)}</p>
              <p className="mt-2 text-sm text-ink/60">{job.quote.scope}</p>
              <div className="mt-3 space-y-1 text-xs text-ink/50">
                <p>Deposit: {formatCurrency(job.quote.deposit)}</p>
                <p className="text-clay">Internal est. time: {job.quote.estimatedTime}</p>
                <p>Sent {formatDate(job.quote.sentDate)}</p>
              </div>
              <p className="mt-3 text-sm text-ink/50">Waiting on the customer to accept or decline.</p>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="mt-4 text-xs font-medium text-brass hover:underline"
              >
                Edit &amp; resend quote
              </button>
            </div>
          ) : null}

          {job.status === "Accepted" ? (
            <div className="rounded-md border border-line bg-white p-6 text-sm text-ink/60">
              Quote accepted. Waiting on the customer to choose a month from your open availability.
            </div>
          ) : null}

          {job.status === "Scheduled" ? (
            <div className="rounded-md border border-line bg-white p-6">
              <p className="text-xs uppercase tracking-wide text-ink/40">Scheduled month</p>
              <p className="mt-2 font-serif text-xl text-charcoal">
                {job.scheduledMonth.month} {job.scheduledMonth.year}
              </p>
              <p className="mt-1 text-xs text-ink/50">
                Deposit {job.depositPaid ? "paid" : "not yet paid"} · {formatCurrency(job.quote.deposit)}
              </p>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">
                  Assign exact date
                </span>
                <input
                  type="date"
                  value={exactDate}
                  onChange={(e) => setExactDate(e.target.value)}
                  className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none focus:border-brass"
                />
              </label>
              <button
                onClick={() => assignExactDate(job.id, exactDate)}
                disabled={!exactDate}
                className="mt-3 w-full rounded-full border border-brass px-5 py-2.5 text-sm font-medium text-brass transition hover:bg-brass hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                Save date
              </button>

              <button
                onClick={() => startJob(job.id)}
                className="mt-3 w-full rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-bone transition hover:bg-ink"
              >
                Start job (mark in progress)
              </button>
            </div>
          ) : null}

          {job.status === "In progress" ? (
            <div className="rounded-md border border-line bg-white p-6">
              <p className="text-xs uppercase tracking-wide text-ink/40">In progress</p>
              <p className="mt-2 text-sm text-ink/60">
                {job.scheduledDate ? `Scheduled for ${formatDate(job.scheduledDate)}.` : "No exact date set yet."}
              </p>
              <button
                onClick={() => markComplete(job.id)}
                className="mt-4 w-full rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-bone transition hover:bg-ink"
              >
                Mark job complete
              </button>
              <p className="mt-2 text-center text-xs text-ink/40">Unlocks the customer's balance payment.</p>
            </div>
          ) : null}

          {job.status === "Complete" ? (
            <div className="rounded-md border border-line bg-white p-6">
              <p className="text-xs uppercase tracking-wide text-ink/40">Balance due</p>
              <p className="mt-2 font-serif text-2xl text-charcoal">{formatCurrency(balanceDue)}</p>
              <p className="mt-2 text-sm text-ink/60">Customer can now pay online from their dashboard.</p>
              <button
                onClick={() => payBalance(job.id)}
                className="mt-4 w-full rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink/60 hover:border-brass/50 hover:text-brass"
              >
                Mark balance paid in person
              </button>
            </div>
          ) : null}

          {job.status === "Paid" ? (
            <div className="rounded-md border border-green-700/20 bg-green-700/5 p-6 text-sm text-green-800">
              ✓ Job complete and paid in full.
            </div>
          ) : null}
        </div>
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/80 p-6"
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="" className="max-h-[85vh] max-w-full rounded-md object-contain" />
        </div>
      ) : null}
    </div>
  );
}

export default function AdminJobDetailPage() {
  return (
    <RequireRole role="owner">
      <JobDetailContent />
    </RequireRole>
  );
}
