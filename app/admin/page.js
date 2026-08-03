"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import RequireRole from "@/components/RequireRole";
import AdminNav from "@/components/admin/AdminNav";
import { useStore } from "@/components/StoreProvider";
import { getServiceBySlug, formatCurrency, formatDate } from "@/lib/mockData";

const CURRENT = new Date(2026, 7, 3); // demo "today" — Aug 3, 2026

function isCurrentMonth(month, year) {
  return month === CURRENT.toLocaleString("en-US", { month: "long" }) && year === CURRENT.getFullYear();
}

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

const COLUMNS = [
  { key: "customer", label: "Customer" },
  { key: "category", label: "Category" },
  { key: "town", label: "Town" },
  { key: "budgetRange", label: "Budget" },
  { key: "submittedDate", label: "Submitted" },
  { key: "status", label: "Status" },
];

function StatCard({ label, value }) {
  return (
    <div className="rounded-md border border-line bg-white p-5">
      <p className="text-xs uppercase tracking-wide text-ink/40">{label}</p>
      <p className="mt-2 font-serif text-3xl text-charcoal">{value}</p>
    </div>
  );
}

function AdminInboxContent() {
  const { jobs, markJobRead } = useStore();
  const router = useRouter();
  const [sortKey, setSortKey] = useState("submittedDate");
  const [sortDir, setSortDir] = useState("desc");

  const stats = useMemo(() => {
    const newRequests = jobs.filter((j) => j.status === "Pending review").length;
    const quotesAwaiting = jobs.filter((j) => j.status === "Quote sent").length;
    const scheduledThisMonth = jobs.filter(
      (j) => j.scheduledMonth && isCurrentMonth(j.scheduledMonth.month, j.scheduledMonth.year)
    ).length;
    const revenueThisMonth = jobs.reduce((sum, j) => {
      let amt = 0;
      if (j.depositPaid && j.scheduledMonth && isCurrentMonth(j.scheduledMonth.month, j.scheduledMonth.year)) {
        amt += j.quote.deposit;
      }
      if (j.balancePaid && j.completedDate) {
        const [y, m] = j.completedDate.split("-").map(Number);
        if (isCurrentMonth(new Date(y, m - 1, 1).toLocaleString("en-US", { month: "long" }), y)) {
          amt += j.quote.price - j.quote.deposit;
        }
      }
      return sum + amt;
    }, 0);
    return { newRequests, quotesAwaiting, scheduledThisMonth, revenueThisMonth };
  }, [jobs]);

  const sorted = useMemo(() => {
    const copy = [...jobs];
    copy.sort((a, b) => {
      let av, bv;
      switch (sortKey) {
        case "customer":
          av = a.customer.name;
          bv = b.customer.name;
          break;
        case "category":
          av = getServiceBySlug(a.category)?.name || "";
          bv = getServiceBySlug(b.category)?.name || "";
          break;
        case "town":
          av = a.address.city;
          bv = b.address.city;
          break;
        case "budgetRange":
          av = a.budgetRange;
          bv = b.budgetRange;
          break;
        case "status":
          av = a.status;
          bv = b.status;
          break;
        default:
          av = a.submittedDate;
          bv = b.submittedDate;
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [jobs, sortKey, sortDir]);

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function openJob(job) {
    if (job.unread) markJobRead(job.id);
    router.push(`/admin/${job.id}`);
  }

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brass">Owner Dashboard</p>
          <h1 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">Requests</h1>
        </div>
        <AdminNav />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="New requests" value={stats.newRequests} />
        <StatCard label="Quotes awaiting response" value={stats.quotesAwaiting} />
        <StatCard label="Scheduled this month" value={stats.scheduledThisMonth} />
        <StatCard label="Revenue this month" value={formatCurrency(stats.revenueThisMonth)} />
      </div>

      <div className="mt-10 overflow-x-auto rounded-md border border-line bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink/40">
              {COLUMNS.map((col) => (
                <th key={col.key} className="px-5 py-3 font-medium">
                  <button onClick={() => toggleSort(col.key)} className="flex items-center gap-1 hover:text-charcoal">
                    {col.label}
                    {sortKey === col.key ? <span>{sortDir === "asc" ? "↑" : "↓"}</span> : null}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((job) => (
              <tr
                key={job.id}
                onClick={() => openJob(job)}
                className={`cursor-pointer border-b border-line/70 last:border-0 hover:bg-bone ${
                  job.unread ? "bg-brass/5" : ""
                }`}
              >
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-2">
                    {job.unread ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brass" /> : null}
                    <span className={job.unread ? "font-semibold text-charcoal" : "text-charcoal/90"}>
                      {job.customer.name}
                    </span>
                  </span>
                </td>
                <td className="px-5 py-3.5 text-ink/70">{getServiceBySlug(job.category)?.name}</td>
                <td className="px-5 py-3.5 text-ink/70">{job.address.city}</td>
                <td className="px-5 py-3.5 text-ink/70">{job.budgetRange}</td>
                <td className="px-5 py-3.5 text-ink/70">{formatDate(job.submittedDate)}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      STATUS_STYLES[job.status] || "bg-ink/10 text-ink/60"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminInboxPage() {
  return (
    <RequireRole role="owner">
      <AdminInboxContent />
    </RequireRole>
  );
}
