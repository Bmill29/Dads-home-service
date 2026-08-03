export default function ReviewCard({ review }) {
  return (
    <div className="rounded-md border border-line bg-white p-6">
      <div className="flex items-center gap-1 text-brass">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={i < review.rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2.5l2.9 6.5 7.1.6-5.4 4.6 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.6 7.1-.6z" />
          </svg>
        ))}
      </div>
      <p className="mt-4 font-serif text-lg leading-relaxed text-charcoal">"{review.quote}"</p>
      <p className="mt-4 text-sm text-ink/50">
        {review.name} · {review.town}
      </p>
    </div>
  );
}
