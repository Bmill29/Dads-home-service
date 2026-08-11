"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/components/StoreProvider";
import { getServiceBySlug, BUSINESS } from "@/lib/mockData";

export default function RequestToast() {
  const { toast, dismissToast, role } = useStore();
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dismissToast(), 8000);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  if (!toast) return null;

  const service = getServiceBySlug(toast.category);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[100] w-[min(380px,calc(100vw-2.5rem))] animate-fadeUp rounded-lg border border-line bg-white shadow-xl">
        <div className="flex items-start gap-3 p-4">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brass/15 text-brass">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16v16H4z" opacity="0" />
              <path d="M22 6 12 13 2 6" />
              <path d="M2 6h20v12H2z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-charcoal">New quote request</p>
            <p className="mt-0.5 text-sm text-ink/70">
              {toast.customerName} submitted a {service?.name.toLowerCase()} request.
            </p>
            <div className="mt-2 flex gap-3 text-xs font-medium">
              {role === "owner" ? (
                <Link href={`/admin/${toast.jobId}`} className="text-brass hover:underline" onClick={dismissToast}>
                  View request
                </Link>
              ) : null}
              <button className="text-ink/60 hover:underline" onClick={() => setShowEmail(true)}>
                Preview email alert
              </button>
              <button className="text-ink/40 hover:underline" onClick={dismissToast}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEmail ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-charcoal/50 p-4"
          onClick={() => setShowEmail(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="text-sm font-medium text-charcoal">Email preview</p>
              <button className="text-ink/50 hover:text-charcoal" onClick={() => setShowEmail(false)}>
                ✕
              </button>
            </div>
            <div className="p-5">
              <div className="rounded-md border border-line">
                <div className="space-y-1 border-b border-line bg-bone px-4 py-3 text-xs text-ink/60">
                  <p>
                    <span className="text-ink/40">From:</span> notifications@cornerstonehomeservice.com
                  </p>
                  <p>
                    <span className="text-ink/40">To:</span> {BUSINESS.email}
                  </p>
                  <p>
                    <span className="text-ink/40">Subject:</span> New quote request from {toast.customerName}
                  </p>
                </div>
                <div className="px-4 py-5">
                  <p className="font-serif text-lg text-charcoal">You've got a new request</p>
                  <p className="mt-3 text-sm text-ink/70">
                    {toast.customerName} just submitted a {service?.name.toLowerCase()} request through your website.
                  </p>
                  <div className="mt-4 rounded-md bg-bone px-4 py-3 text-sm text-ink/70">
                    <p>
                      <span className="text-ink/50">Category:</span> {service?.name}
                    </p>
                    <p>
                      <span className="text-ink/50">Job ID:</span> {toast.jobId}
                    </p>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="mt-5 inline-block rounded-md bg-charcoal px-4 py-2 text-sm font-medium text-bone"
                  >
                    Review request
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
