"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/StoreProvider";
import { DEMO_CUSTOMER } from "@/lib/mockData";

export default function RoleSwitcher() {
  const { role, setRole } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const label = role === "owner" ? "Owner" : role === "customer" ? DEMO_CUSTOMER.name.split(" ")[0] : "Demo view";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink/70 transition hover:border-brass/50 hover:text-charcoal"
      >
        <span className={`h-1.5 w-1.5 rounded-full ${role ? "bg-brass" : "bg-ink/30"}`} />
        {label}
      </button>
      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-md border border-line bg-white py-1 shadow-lg">
          <p className="px-3 pb-1.5 pt-2 text-[11px] uppercase tracking-wide text-ink/40">Demo role switch</p>
          <button
            className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-bone ${
              role === "customer" ? "text-brass" : "text-ink/80"
            }`}
            onClick={() => {
              setRole("customer");
              setOpen(false);
              router.push("/dashboard");
            }}
          >
            Customer ({DEMO_CUSTOMER.name})
            {role === "customer" ? <span>✓</span> : null}
          </button>
          <button
            className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-bone ${
              role === "owner" ? "text-brass" : "text-ink/80"
            }`}
            onClick={() => {
              setRole("owner");
              setOpen(false);
              router.push("/admin");
            }}
          >
            Owner
            {role === "owner" ? <span>✓</span> : null}
          </button>
          {role ? (
            <button
              className="mt-1 flex w-full items-center border-t border-line px-3 py-2 text-left text-sm text-ink/50 hover:bg-bone"
              onClick={() => {
                setRole(null);
                setOpen(false);
                router.push("/");
              }}
            >
              Sign out
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
