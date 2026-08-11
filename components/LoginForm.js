"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/components/StoreProvider";

export default function LoginForm() {
  const { setRole } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("as") === "owner" ? "owner" : "customer";
  const [tab, setTab] = useState(initialTab);
  const [customerForm, setCustomerForm] = useState({ email: "", password: "" });
  const [ownerForm, setOwnerForm] = useState({ email: "", passcode: "" });

  function submitCustomer(e) {
    e.preventDefault();
    setRole("customer");
    router.push("/dashboard");
  }

  function submitOwner(e) {
    e.preventDefault();
    setRole("owner");
    router.push("/admin");
  }

  return (
    <div className="mx-auto max-w-md px-5 py-24 sm:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-brass">Sign in</p>
      <h1 className="mt-2 font-serif text-3xl text-charcoal">Welcome back</h1>
      <p className="mt-3 text-sm text-ink/55">Sign in to manage your requests, or as the team to manage jobs.</p>

      <div className="mt-8 grid grid-cols-2 gap-2 rounded-full border border-line bg-white p-1">
        <button
          onClick={() => setTab("customer")}
          className={`rounded-full py-2 text-sm font-medium transition ${
            tab === "customer" ? "bg-charcoal text-bone" : "text-ink/60"
          }`}
        >
          Customer
        </button>
        <button
          onClick={() => setTab("owner")}
          className={`rounded-full py-2 text-sm font-medium transition ${
            tab === "owner" ? "bg-charcoal text-bone" : "text-ink/60"
          }`}
        >
          Owner
        </button>
      </div>

      {tab === "customer" ? (
        <form className="mt-8 space-y-4" onSubmit={submitCustomer}>
          <p className="text-xs text-ink/40">Sign in to view your active requests and job status.</p>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">Email</span>
            <input
              type="email"
              required
              value={customerForm.email}
              onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">Password</span>
            <input
              type="password"
              required
              value={customerForm.password}
              onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
              placeholder="••••••••"
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-charcoal px-6 py-3.5 text-sm font-medium text-bone transition hover:bg-ink"
          >
            Sign in
          </button>
        </form>
      ) : (
        <form className="mt-8 space-y-4" onSubmit={submitOwner}>
          <p className="text-xs text-ink/40">Sign in to manage requests, quotes, and scheduling.</p>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">Email</span>
            <input
              type="email"
              required
              value={ownerForm.email}
              onChange={(e) => setOwnerForm({ ...ownerForm, email: e.target.value })}
              placeholder="owner@example.com"
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">Passcode</span>
            <input
              type="password"
              required
              value={ownerForm.passcode}
              onChange={(e) => setOwnerForm({ ...ownerForm, passcode: e.target.value })}
              placeholder="••••••••"
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-charcoal px-6 py-3.5 text-sm font-medium text-bone transition hover:bg-ink"
          >
            Sign in
          </button>
        </form>
      )}
    </div>
  );
}
