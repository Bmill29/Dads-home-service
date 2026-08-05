"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RoleSwitcher from "@/components/RoleSwitcher";
import { useStore } from "@/components/StoreProvider";
import { BUSINESS } from "@/lib/mockData";

const PUBLIC_NAV = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Past Work" },
  { href: "/reviews", label: "Reviews" },
];

const CUSTOMER_NAV = [...PUBLIC_NAV, { href: "/dashboard", label: "My Requests" }];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { role, jobs } = useStore();

  const isOwner = role === "owner";
  const nav = isOwner
    ? [
        { href: "/admin", label: "Inbox", badge: jobs.filter((j) => j.unread).length },
        { href: "/admin/availability", label: "Availability" },
      ]
    : role === "customer"
    ? CUSTOMER_NAV
    : PUBLIC_NAV;

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bone/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href={isOwner ? "/admin" : "/"}
          className="flex items-center gap-2 font-serif text-xl tracking-tight text-charcoal sm:text-2xl"
        >
          {BUSINESS.shortName}
          {isOwner ? (
            <span className="rounded-full bg-charcoal px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wide text-bone">
              Owner
            </span>
          ) : null}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 text-sm transition hover:text-charcoal ${
                pathname === item.href ? "text-charcoal" : "text-ink/60"
              }`}
            >
              {item.label}
              {item.badge ? (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brass px-1 text-[10px] font-medium text-white">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <RoleSwitcher />
          {isOwner ? (
            <Link
              href="/"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink/70 transition hover:border-brass/50 hover:text-charcoal"
            >
              View public site
            </Link>
          ) : (
            <Link
              href="/quote"
              className="rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-bone transition hover:bg-ink"
            >
              Get a Quote
            </Link>
          )}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-line/70 bg-bone px-5 pb-5 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-md px-2 py-2.5 text-sm text-ink/70 hover:bg-white"
              >
                {item.label}
                {item.badge ? (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brass px-1 text-[10px] font-medium text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-line/70 pt-3">
            <RoleSwitcher />
            {isOwner ? (
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink/70"
              >
                View public site
              </Link>
            ) : (
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-bone"
              >
                Get a Quote
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
