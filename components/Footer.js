import Link from "next/link";
import { BUSINESS } from "@/lib/mockData";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-charcoal text-bone/80">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <p className="font-serif text-xl text-bone">{BUSINESS.shortName}</p>
          <p className="mt-3 text-sm leading-relaxed text-bone/60">
            Renovations built with care, for homes across {BUSINESS.serviceArea}.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-bone/40">Contact</p>
          <div className="mt-3 space-y-2 text-sm">
            <a href={BUSINESS.phoneHref} className="block hover:text-bone">
              {BUSINESS.phone}
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="block hover:text-bone">
              {BUSINESS.email}
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-bone/40">Service Area</p>
          <p className="mt-3 text-sm leading-relaxed text-bone/60">{BUSINESS.serviceAreaTowns}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-bone/40">Hours</p>
          <p className="mt-3 text-sm leading-relaxed text-bone/60">{BUSINESS.hours}</p>
          <div className="mt-4 flex gap-4 text-sm">
            <Link href="/services" className="hover:text-bone">
              Services
            </Link>
            <Link href="/gallery" className="hover:text-bone">
              Past Work
            </Link>
            <Link href="/reviews" className="hover:text-bone">
              Reviews
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-bone/10 px-5 py-5 text-center text-xs text-bone/40 sm:px-8">
        © {new Date().getFullYear()} {BUSINESS.name}. Licensed & insured. This is a demo site with mock data.
      </div>
    </footer>
  );
}
