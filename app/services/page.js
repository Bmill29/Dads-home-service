import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES } from "@/lib/mockData";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-brass">What we do</p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal sm:text-5xl">Services</h1>
        <p className="mt-5 text-ink/60">
          Pick a category to start a quote request — you'll be able to describe the project and share photos in the
          next steps.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <Reveal key={service.slug} delay={i * 60}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
