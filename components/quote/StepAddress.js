const STATES = ["NY", "PA", "OH"];

export default function StepAddress({ value, onChange }) {
  function set(field, val) {
    onChange({ ...value, [field]: val });
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">Where's the project?</h2>
      <p className="mt-2 text-sm text-ink/55">We'll use this to confirm you're in our service area.</p>

      <div className="mt-8 grid gap-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">Street address</span>
          <input
            value={value.street}
            onChange={(e) => set("street", e.target.value)}
            placeholder="123 Main St"
            className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-ink/35 focus:border-brass"
          />
        </label>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">City</span>
            <input
              value={value.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="Amherst"
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-ink/35 focus:border-brass"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">State</span>
            <select
              value={value.state}
              onChange={(e) => set("state", e.target.value)}
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-brass"
            >
              <option value="">Select</option>
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="col-span-2 block sm:col-span-1">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">ZIP</span>
            <input
              value={value.zip}
              onChange={(e) => set("zip", e.target.value.replace(/[^0-9]/g, "").slice(0, 5))}
              placeholder="14226"
              inputMode="numeric"
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-ink/35 focus:border-brass"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
