"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/components/StoreProvider";
import { SERVICES } from "@/lib/mockData";
import ProgressBar from "@/components/quote/ProgressBar";
import StepCategory from "@/components/quote/StepCategory";
import StepDescription from "@/components/quote/StepDescription";
import StepPhotos from "@/components/quote/StepPhotos";
import StepAddress from "@/components/quote/StepAddress";
import StepBudget from "@/components/quote/StepBudget";
import StepReview from "@/components/quote/StepReview";

const EMPTY_FORM = {
  category: "",
  description: "",
  photos: [],
  address: { street: "", city: "", state: "NY", zip: "" },
  budgetRange: "",
};

export default function QuoteWizard() {
  const { role, setRole, submitNewRequest } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselected = searchParams.get("category");
  const validPreselected = SERVICES.some((s) => s.slug === preselected) ? preselected : "";

  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [step, setStep] = useState(1);
  const [maxReached, setMaxReached] = useState(1);
  const [submittedId, setSubmittedId] = useState(null);
  const [data, setData] = useState({ ...EMPTY_FORM, category: validPreselected });

  if (role !== "customer") {
    return (
      <div className="mx-auto max-w-md px-5 py-24 sm:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-brass">Get a Quote</p>
        <h1 className="mt-2 font-serif text-3xl text-charcoal">Sign in to start your request</h1>
        <p className="mt-3 text-sm text-ink/55">
          This is a demo — any email and password will sign you in as our sample customer, Sarah Thompson.
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setRole("customer");
          }}
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">Email</span>
            <input
              type="email"
              required
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">Password</span>
            <input
              type="password"
              required
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              placeholder="••••••••"
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-charcoal px-6 py-3.5 text-sm font-medium text-bone transition hover:bg-ink"
          >
            Sign in &amp; continue
          </button>
        </form>
      </div>
    );
  }

  if (submittedId) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brass/15 text-brass">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-6 font-serif text-3xl text-charcoal">Request submitted</h1>
        <p className="mt-3 text-ink/60">
          Thanks — we'll review your photos and details and follow up with a quote soon. You can track this request
          any time from your dashboard.
        </p>
        <p className="mt-2 text-sm text-ink/40">Reference #{submittedId}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-bone hover:bg-ink"
          >
            Go to my dashboard
          </button>
          <button
            onClick={() => router.push("/")}
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink/70 hover:border-brass/50"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  function goTo(n) {
    setStep(n);
    setMaxReached((m) => Math.max(m, n));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    if (step === 6) {
      const id = submitNewRequest(data);
      setSubmittedId(id);
      return;
    }
    goTo(step + 1);
  }

  function back() {
    if (step > 1) goTo(step - 1);
  }

  const canProceed = (() => {
    switch (step) {
      case 1:
        return Boolean(data.category);
      case 2:
        return data.description.trim().length >= 10;
      case 3:
        return data.photos.length >= 1;
      case 4:
        return data.address.street && data.address.city && data.address.state && data.address.zip.length === 5;
      case 5:
        return Boolean(data.budgetRange);
      default:
        return true;
    }
  })();

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
      <ProgressBar step={step} maxReached={maxReached} onJump={goTo} />

      <div key={step} className="mt-12 animate-fadeIn">
        {step === 1 ? <StepCategory value={data.category} onChange={(v) => setData({ ...data, category: v })} /> : null}
        {step === 2 ? (
          <StepDescription value={data.description} onChange={(v) => setData({ ...data, description: v })} />
        ) : null}
        {step === 3 ? <StepPhotos photos={data.photos} onChange={(v) => setData({ ...data, photos: v })} /> : null}
        {step === 4 ? <StepAddress value={data.address} onChange={(v) => setData({ ...data, address: v })} /> : null}
        {step === 5 ? (
          <StepBudget value={data.budgetRange} onChange={(v) => setData({ ...data, budgetRange: v })} />
        ) : null}
        {step === 6 ? <StepReview data={data} onJump={goTo} /> : null}
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="text-sm font-medium text-ink/60 transition hover:text-charcoal disabled:opacity-0"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canProceed}
          className="rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-bone transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-30"
        >
          {step === 6 ? "Submit request" : "Continue"}
        </button>
      </div>
    </div>
  );
}
