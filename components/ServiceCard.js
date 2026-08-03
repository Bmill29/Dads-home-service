import Link from "next/link";
import Image from "next/image";

export default function ServiceCard({ service }) {
  return (
    <Link
      href={`/quote?category=${service.slug}`}
      className="group block overflow-hidden rounded-md border border-line bg-white transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg text-charcoal">{service.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{service.description}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-brass">
          Start a quote
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
