"use client";

import RequireRole from "@/components/RequireRole";
import AdminNav from "@/components/admin/AdminNav";
import { useStore } from "@/components/StoreProvider";

function AvailabilityContent() {
  const { availability, updateAvailabilityMonth } = useStore();

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brass">Owner Dashboard</p>
          <h1 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">Availability</h1>
          <p className="mt-2 max-w-lg text-sm text-ink/55">
            Control which upcoming months customers can choose when scheduling, and cap how many jobs you'll take on
            per month.
          </p>
        </div>
        <AdminNav />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {availability.map((a) => (
          <div key={`${a.month}-${a.year}`} className="rounded-md border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="font-serif text-lg text-charcoal">
                {a.month} {a.year}
              </p>
              <button
                onClick={() => updateAvailabilityMonth(a.month, a.year, { open: !a.open })}
                className={`relative h-6 w-11 rounded-full transition ${a.open ? "bg-brass" : "bg-line"}`}
                aria-label={a.open ? "Close month" : "Open month"}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                    a.open ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            <p className={`mt-1 text-xs ${a.open ? "text-brass" : "text-ink/40"}`}>
              {a.open ? "Open for booking" : "Closed"}
            </p>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">
                Max jobs this month
              </span>
              <input
                type="number"
                min={a.booked}
                value={a.maxJobs}
                onChange={(e) => updateAvailabilityMonth(a.month, a.year, { maxJobs: Number(e.target.value) })}
                className="w-full rounded-md border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-brass"
              />
            </label>
            <p className="mt-2 text-xs text-ink/50">
              {a.booked} of {a.maxJobs} booked
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AvailabilityPage() {
  return (
    <RequireRole role="owner">
      <AvailabilityContent />
    </RequireRole>
  );
}
