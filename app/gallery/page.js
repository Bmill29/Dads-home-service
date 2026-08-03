"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { GALLERY_PROJECTS, SERVICES } from "@/lib/mockData";

const FILTERS = [{ slug: "all", name: "All Projects" }, ...SERVICES.map((s) => ({ slug: s.slug, name: s.name }))];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");

  const projects = filter === "all" ? GALLERY_PROJECTS : GALLERY_PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-brass">Past work</p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal sm:text-5xl">Before &amp; After</h1>
        <p className="mt-5 text-ink/60">Drag the divider on any project to compare the before and after.</p>
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.slug}
            onClick={() => setFilter(f.slug)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              filter === f.slug
                ? "border-charcoal bg-charcoal text-bone"
                : "border-line bg-white text-ink/60 hover:border-brass/50"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {projects.map((project) => (
          <Reveal key={project.id}>
            <BeforeAfterSlider before={project.before} after={project.after} />
            <div className="mt-3 flex items-baseline justify-between">
              <p className="font-serif text-lg text-charcoal">{project.title}</p>
              <p className="text-sm text-ink/50">{project.location}</p>
            </div>
            <p className="mt-1 text-sm text-ink/60">{project.description}</p>
          </Reveal>
        ))}
        {projects.length === 0 ? <p className="text-ink/50">No projects in this category yet.</p> : null}
      </div>
    </div>
  );
}
