const LABELS = ["Category", "Details", "Photos", "Address", "Budget", "Review"];

export default function ProgressBar({ step, onJump, maxReached }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {LABELS.map((label, i) => {
        const num = i + 1;
        const done = num < step;
        const active = num === step;
        const reachable = num <= maxReached;
        return (
          <button
            key={label}
            type="button"
            disabled={!reachable}
            onClick={() => reachable && onJump(num)}
            className="group flex flex-1 flex-col items-center gap-1.5"
          >
            <span
              className={`h-1.5 w-full rounded-full transition-colors ${
                done || active ? "bg-brass" : "bg-line"
              } ${reachable ? "group-hover:bg-brass/70" : ""}`}
            />
            <span
              className={`hidden text-[11px] sm:block ${
                active ? "font-medium text-charcoal" : "text-ink/40"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
