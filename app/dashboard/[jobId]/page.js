"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import RequireRole from "@/components/RequireRole";
import StatusTimeline from "@/components/StatusTimeline";
import CheckoutForm from "@/components/CheckoutForm";
import { useStore } from "@/components/StoreProvider";
import { getServiceBySlug, formatCurrency, formatDate } from "@/lib/mockData";

function JobDetailContent() {
  const { jobId } = useParams();
  const router = useRouter();
  const { getJob, availability, acceptQuote, declineQuote, scheduleMonth, payDeposit, payBalance } = useStore();
  const job = getJob(jobId);

  const [declining, setDeclining] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showDepositCheckout, setShowDepositCheckout] = useState(false);
  const [showBalanceCheckout, setShowBalanceCheckout] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const openMonths = useMemo(() => availability.filter((a) => a.open && a.booked < a.maxJobs), [availability]);

  if (!job) {
    return (
      <div className="mx-auto max-w-content px-5 py-24 text-center sm:px-8">
        <p className="text-ink/50">We couldn't find that request.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-sm text-brass hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const service = getServiceBySlug(job.category);
  const balanceDue = job.quote ? job.quote.price - job.quote.deposit : 0;

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
      <Link href="/dashboard" className="text-sm text-ink/50 hover:text-charcoal">
        ← Back to dashboard
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brass">#{job.id}</p>
          <h1 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">{service?.name}</h1>
          <p className="mt-1 text-sm text-ink/50">
            {job.address.street}, {job.address.city}, {job.address.state} {job.address.zip}
          </p>
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
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/50">
              <span className="rounded-full bg-bone px-3 py-1">Budget: {job.budgetRange}</span>
              <span className="rounded-full bg-bone px-3 py-1">Submitted {formatDate(job.submittedDate)}</span>
            </div>
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
        </div>

        <div className="space-y-6">
          {job.status === "Quote sent" ? (
            <div className="rounded-md border border-brass/40 bg-brass/5 p-6">
              <p className="text-xs uppercase tracking-wide text-brass">Quote received</p>
              <p className="mt-2 font-serif text-3xl text-charcoal">{formatCurrency(job.quote.price)}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{job.quote.scope}</p>
              <p className="mt-3 text-xs text-ink/50">Deposit to book: {formatCurrency(job.quote.deposit)}</p>

              {!declining ? (
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => acceptQuote(job.id)}
                    className="flex-1 rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-bone hover:bg-ink"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setDeclining(true)}
                    className="flex-1 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink/60 hover:border-clay/50 hover:text-clay"
                  >
                    Decline
                  </button>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  <textarea
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    placeholder="Optional — let us know why"
                    rows={3}
                    className="w-full resize-none rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => declineQuote(job.id, declineReason)}
                      className="rounded-full bg-clay px-5 py-2.5 text-sm font-medium text-white hover:bg-clay/90"
                    >
                      Confirm decline
                    </button>
                    <button
                      onClick={() => setDeclining(false)}
                      className="text-sm text-ink/50 hover:text-charcoal"
                    >
                      Never mind
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {job.status === "Declined" ? (
            <div className="rounded-md border border-clay/30 bg-clay/5 p-6">
              <p className="text-xs uppercase tracking-wide text-clay">Quote declined</p>
              <p className="mt-2 text-sm text-ink/60">{job.declineReason}</p>
              <p className="mt-3 text-sm text-ink/50">
                Have questions or want to revisit this? Give us a call — we're happy to send a revised quote.
              </p>
            </div>
          ) : null}

          {job.status === "Accepted" ? (
            <div className="rounded-md border border-line bg-white p-6">
              <p className="text-xs uppercase tracking-wide text-ink/40">Pick a month</p>
              <p className="mt-2 text-sm text-ink/60">
                Choose a month that works for you — we'll confirm the exact date within that month once it's booked.
                Feel free to call or email us to talk through timing.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {openMonths.map((m) => {
                  const key = `${m.month}-${m.year}`;
                  const selected = selectedMonth && selectedMonth.month === m.month && selectedMonth.year === m.year;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedMonth({ month: m.month, year: m.year })}
                      className={`rounded-md border px-3 py-3 text-sm transition ${
                        selected
                          ? "border-brass bg-brass/10 text-charcoal ring-1 ring-brass"
                          : "border-line bg-white text-ink/70 hover:border-brass/40"
                      }`}
                    >
                      {m.month} {m.year}
                    </button>
                  );
                })}
                {openMonths.length === 0 ? (
                  <p className="col-span-full text-sm text-ink/40">No open months right now — please call us.</p>
                ) : null}
              </div>
              <button
                disabled={!selectedMonth}
                onClick={() => scheduleMonth(job.id, selectedMonth)}
                className="mt-5 w-full rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-bone transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-30"
              >
                Confirm month
              </button>
            </div>
          ) : null}

          {["Scheduled", "In progress", "Complete", "Paid"].includes(job.status) ? (
            <div className="rounded-md border border-line bg-white p-6">
              <p className="text-xs uppercase tracking-wide text-ink/40">Schedule</p>
              <p className="mt-2 font-serif text-xl text-charcoal">
                {job.scheduledDate
                  ? formatDate(job.scheduledDate)
                  : `${job.scheduledMonth.month} ${job.scheduledMonth.year} — exact date TBD`}
              </p>
              {!job.scheduledDate ? (
                <p className="mt-2 text-sm text-ink/50">
                  We'll confirm the exact date within {job.scheduledMonth.month} soon. Call or email if you'd like to
                  discuss timing.
                </p>
              ) : null}

              {!job.depositPaid ? (
                showDepositCheckout ? (
                  <div className="mt-4">
                    <CheckoutForm
                      title="Pay deposit"
                      amount={job.quote.deposit}
                      lineItems={[{ label: "Deposit", value: formatCurrency(job.quote.deposit) }]}
                      onPay={() => {
                        payDeposit(job.id);
                        setShowDepositCheckout(false);
                      }}
                      onCancel={() => setShowDepositCheckout(false)}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setShowDepositCheckout(true)}
                    className="mt-4 w-full rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-bone hover:bg-ink"
                  >
                    Pay deposit ({formatCurrency(job.quote.deposit)})
                  </button>
                )
              ) : (
                <p className="mt-4 text-sm text-green-800">✓ Deposit paid ({formatCurrency(job.quote.deposit)})</p>
              )}
            </div>
          ) : null}

          {["Complete", "Paid"].includes(job.status) ? (
            <div className="rounded-md border border-line bg-white p-6">
              <p className="text-xs uppercase tracking-wide text-ink/40">Balance due on completion</p>
              <p className="mt-2 font-serif text-2xl text-charcoal">{formatCurrency(balanceDue)}</p>
              {job.status === "Paid" ? (
                <p className="mt-3 text-sm text-green-800">✓ Paid in full</p>
              ) : showBalanceCheckout ? (
                <div className="mt-4">
                  <CheckoutForm
                    title="Pay balance"
                    amount={balanceDue}
                    lineItems={[
                      { label: "Total project cost", value: formatCurrency(job.quote.price) },
                      { label: "Deposit paid", value: `– ${formatCurrency(job.quote.deposit)}` },
                    ]}
                    onPay={() => {
                      payBalance(job.id);
                      setShowBalanceCheckout(false);
                    }}
                    onCancel={() => setShowBalanceCheckout(false)}
                  />
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowBalanceCheckout(true)}
                    className="mt-4 w-full rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-bone hover:bg-ink"
                  >
                    Pay balance online
                  </button>
                  <p className="mt-2 text-center text-xs text-ink/40">Or pay in person when work wraps up.</p>
                </>
              )}
            </div>
          ) : null}

          {job.status === "Pending review" ? (
            <div className="rounded-md border border-line bg-white p-6 text-sm text-ink/60">
              We're reviewing your photos and details. You'll get a quote here as soon as it's ready.
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

export default function CustomerJobDetailPage() {
  return (
    <RequireRole role="customer">
      <JobDetailContent />
    </RequireRole>
  );
}
