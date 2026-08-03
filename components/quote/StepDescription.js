export default function StepDescription({ value, onChange }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">Tell us about the project</h2>
      <p className="mt-2 text-sm text-ink/55">
        Rough dimensions, current materials, and what you'd like changed all help us quote it accurately.
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={7}
        placeholder="e.g. Our kitchen is about 12x14 ft with original cabinets from the 70s. We'd like new cabinets, countertops, and to open up the wall to the dining room if possible..."
        className="mt-8 w-full resize-none rounded-md border border-line bg-white px-4 py-3.5 text-sm text-charcoal outline-none placeholder:text-ink/35 focus:border-brass"
      />
      <p className="mt-2 text-xs text-ink/40">{value.trim().length} characters</p>
    </div>
  );
}
