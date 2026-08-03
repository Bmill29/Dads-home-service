"use client";

import Link from "next/link";
import RequireRole from "@/components/RequireRole";
import { useStore } from "@/components/StoreProvider";
import { getServiceBySlug, formatDate, DEMO_CUSTOMER } from "@/lib/mockData";

const STATUS_STYLES = {
  "Pending review": "bg-ink/10 text-ink/60",
  "Quote sent": "bg-brass/15 text-brass",
  Accepted: "bg-brass/15 text-brass",
  Scheduled: "bg-charcoal/10 text-charcoal",
  "In progress": "bg-charcoal text-bone",
  Complete: "bg-green-700/10 text-green-800",
  Paid: "bg-green-700/10 text-green-800",
  Declined: "bg-clay/15 text-clay",
};

function DashboardContent() {
  const { customerJobs } = useStore();
  const sorted = [...customerJobs].sort((a, b) => (a.submittedDate < b.submittedDate ? 1 : -1));

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brass">My Dashboard</p>
          <h1 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">Hi, {DEMO_CUSTOMER.name.split(" ")[0]}</h1>
        </div>
        <Link
          href="/quote"
          className="rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-bone hover:bg-ink"
        >
          Start a new request
        </Link>
      </div>

      <div className="mt-10 grid gap-4">
        {sorted.map((job) => {
          const service = getServiceBySlug(job.category);
          return (
            <Link
              key={job.id}
              href={`/dashboard/${job.id}`}
              className="flex flex-col gap-3 rounded-md border border-line bg-white p-5 transition hover:border-brass/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                {job.photos[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={job.photos[0]} alt="" className="h-16 w-16 shrink-0 rounded-md object-cover" />
                ) : null}
                <div>
                  <p className="font-serif text-lg text-charcoal">{service?.name}</p>
                  <p className="text-sm text-ink/50">
                    #{job.id} · Submitted {formatDate(job.submittedDate)}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex w-fit shrink-0 items-center rounded-full px-3 py-1.5 text-xs font-medium ${
                  STATUS_STYLES[job.status] || "bg-ink/10 text-ink/60"
                }`}
              >
                {job.status}
                {job.status === "Quote sent" ? " · action needed" : ""}
              </span>
            </Link>
          );
        })}
        {sorted.length === 0 ? (
          <p className="rounded-md border border-dashed border-line p-10 text-center text-sm text-ink/40">
            No requests yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <RequireRole role="customer">
      <DashboardContent />
    </RequireRole>
  );
}
