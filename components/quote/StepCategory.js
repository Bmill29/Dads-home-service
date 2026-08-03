import { SERVICES } from "@/lib/mockData";

export default function StepCategory({ value, onChange }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">What kind of project is this?</h2>
      <p className="mt-2 text-sm text-ink/55">Pick the category that best fits — we'll tailor the next steps to it.</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SERVICES.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => onChange(service.slug)}
            className={`rounded-md border p-4 text-left transition ${
              value === service.slug
                ? "border-brass bg-brass/10 ring-1 ring-brass"
                : "border-line bg-white hover:border-brass/40"
            }`}
          >
            <p className="font-serif text-base text-charcoal">{service.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
