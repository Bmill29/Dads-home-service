"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/StoreProvider";

export default function RequireRole({ role: required, children }) {
  const { role } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (role !== required) {
      router.replace(`/login?as=${required}`);
    }
    // Only check on mount — a role change from elsewhere (e.g. the role
    // switcher) is already paired with its own navigation, so reacting to
    // every role change here would race that navigation and bounce back
    // through /login.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (role !== required) {
    return <div className="px-5 py-24 text-center text-sm text-ink/40">Redirecting to sign in…</div>;
  }

  return children;
}
