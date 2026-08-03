import { getServiceBySlug } from "@/lib/mockData";

export default function StepReview({ data, onJump }) {
  const service = getServiceBySlug(data.category);

  const rows = [
    { label: "Category", value: service?.name, step: 1 },
    { label: "Description", value: data.description, step: 2 },
    { label: "Photos", value: `${data.photos.length} photo${data.photos.length === 1 ? "" : "s"}`, step: 3 },
    {
      label: "Address",
      value: `${data.address.street}, ${data.address.city}, ${data.address.state} ${data.address.zip}`,
      step: 4,
    },
    { label: "Budget range", value: data.budgetRange, step: 5 },
  ];

  return (
    <div>
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">Review your request</h2>
      <p className="mt-2 text-sm text-ink/55">Everything look right? You can edit any section before submitting.</p>

      <div className="mt-8 divide-y divide-line rounded-md border border-line bg-white">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-ink/40">{row.label}</p>
              <p className="mt-1 break-words text-sm text-charcoal">{row.value}</p>
            </div>
            <button
              type="button"
              onClick={() => onJump(row.step)}
              className="shrink-0 text-xs font-medium text-brass hover:underline"
            >
              Edit
            </button>
          </div>
        ))}

        {data.photos.length > 0 ? (
          <div className="px-5 py-4">
            <p className="mb-2 text-xs uppercase tracking-wide text-ink/40">Photo previews</p>
            <div className="flex flex-wrap gap-2">
              {data.photos.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p.id} src={p.url} alt={p.name} className="h-16 w-16 rounded-md object-cover" />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
