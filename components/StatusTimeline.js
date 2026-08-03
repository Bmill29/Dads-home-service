import { STATUS_STEPS } from "@/lib/mockData";

export default function StatusTimeline({ status }) {
  if (status === "Declined") {
    return (
      <div className="flex items-center gap-2 rounded-md border border-clay/30 bg-clay/10 px-4 py-3 text-sm text-clay">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9l6 6M15 9l-6 6" />
        </svg>
        Quote declined
      </div>
    );
  }

  const currentIndex = STATUS_STEPS.indexOf(status);

  return (
    <div className="flex w-full flex-wrap gap-y-4 sm:flex-nowrap">
      {STATUS_STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step} className="flex flex-1 flex-col items-center text-center">
            <div className="flex w-full items-center">
              <div className={`h-px flex-1 ${i === 0 ? "opacity-0" : done || active ? "bg-brass" : "bg-line"}`} />
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium ${
                  done
                    ? "border-brass bg-brass text-white"
                    : active
                    ? "border-brass bg-white text-brass"
                    : "border-line bg-white text-ink/30"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <div
                className={`h-px flex-1 ${
                  i === STATUS_STEPS.length - 1 ? "opacity-0" : done ? "bg-brass" : "bg-line"
                }`}
              />
            </div>
            <span className={`mt-2 text-[11px] leading-tight ${active ? "font-medium text-charcoal" : "text-ink/40"}`}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
