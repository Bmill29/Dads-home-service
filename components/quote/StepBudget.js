import { BUDGET_RANGES } from "@/lib/mockData";

export default function StepBudget({ value, onChange }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">What's your budget range?</h2>
      <p className="mt-2 text-sm text-ink/55">This helps us scope options that fit — it's not a final price.</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {BUDGET_RANGES.map((range) => (
          <button
            key={range}
            type="button"
            onClick={() => onChange(range)}
            className={`rounded-md border px-5 py-4 text-left text-sm transition ${
              value === range
                ? "border-brass bg-brass/10 text-charcoal ring-1 ring-brass"
                : "border-line bg-white text-ink/70 hover:border-brass/40"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
}
