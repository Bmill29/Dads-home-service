import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { BUSINESS, TRUST_POINTS, GALLERY_PROJECTS, img } from "@/lib/mockData";

const FEATURED = GALLERY_PROJECTS.slice(0, 3);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden">
        <Image
          src={img("1600585154526-990dced4db0d", 1800, 1200)}
          alt="Finished renovation living space"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-charcoal/10" />
        <div className="relative mx-auto w-full max-w-content px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bone/70">
              Renovations across {BUSINESS.serviceArea}
            </p>
            <h1 className="max-w-2xl font-serif text-4xl leading-[1.08] text-bone sm:text-6xl">
              Renovations done right, the first time.
            </h1>
            <p className="mt-5 max-w-lg text-base text-bone/80 sm:text-lg">
              Kitchens, bathrooms, and full home renovations built with honest pricing and careful craftsmanship.
            </p>
            <Link
              href="/quote"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-charcoal transition hover:bg-white"
            >
              Get a Quote
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Intro + trust points */}
      <section className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">
            A local renovation team you can actually reach.
          </h2>
          <p className="mt-5 text-ink/60">
            {BUSINESS.name} is a {BUSINESS.yearsInBusiness}-year-old renovation company serving{" "}
            {BUSINESS.serviceArea}. We handle everything from a single-room refresh to full additions — with clear
            quotes, real photos, and a dashboard so you always know where your project stands.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point, i) => (
            <Reveal key={point.label} delay={i * 80} className="bg-white p-7">
              <p className="font-serif text-lg text-charcoal">{point.label}</p>
              <p className="mt-2 text-sm text-ink/55">{point.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured before/afters */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brass">Recent work</p>
              <h2 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">See the difference</h2>
            </div>
            <Link href="/gallery" className="text-sm font-medium text-ink/60 underline-offset-4 hover:underline">
              View the full gallery
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {FEATURED.map((project, i) => (
              <Reveal key={project.id} delay={i * 100}>
                <BeforeAfterSlider before={project.before} after={project.after} />
                <p className="mt-3 font-serif text-lg text-charcoal">{project.title}</p>
                <p className="text-sm text-ink/50">{project.location}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-content px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">Ready to start your project?</h2>
          <p className="mx-auto mt-4 max-w-md text-ink/60">
            Tell us what you're working with — most requests get a quote back within a few days.
          </p>
          <Link
            href="/quote"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-sm font-medium text-bone transition hover:bg-ink"
          >
            Get a Quote
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
