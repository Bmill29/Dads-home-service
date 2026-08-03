"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "Inbox" },
  { href: "/admin/availability", label: "Availability" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <div className="flex gap-1 rounded-full border border-line bg-white p-1 w-fit">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            pathname === tab.href ? "bg-charcoal text-bone" : "text-ink/60 hover:text-charcoal"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
