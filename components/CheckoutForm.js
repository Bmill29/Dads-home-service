"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/mockData";

export default function CheckoutForm({ title, amount, lineItems = [], onPay, onCancel }) {
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);

  function formatCardNumber(v) {
    return v
      .replace(/[^0-9]/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExpiry(v) {
    const digits = v.replace(/[^0-9]/g, "").slice(0, 4);
    if (digits.length < 3) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  function submit(e) {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setDone(true);
      setTimeout(() => onPay(), 900);
    }, 900);
  }

  if (done) {
    return (
      <div className="rounded-md border border-line bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-700/10 text-green-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="mt-4 font-serif text-xl text-charcoal">Payment successful</p>
        <p className="mt-1 text-sm text-ink/50">{formatCurrency(amount)} paid</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-line bg-white p-6">
      <p className="font-serif text-xl text-charcoal">{title}</p>

      <div className="mt-4 space-y-1.5 rounded-md bg-bone px-4 py-3 text-sm">
        {lineItems.map((item) => (
          <div key={item.label} className="flex justify-between text-ink/60">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-line/70 pt-1.5 font-medium text-charcoal">
          <span>Total due now</span>
          <span>{formatCurrency(amount)}</span>
        </div>
      </div>

      <form className="mt-5 space-y-4" onSubmit={submit}>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">
            Name on card
          </span>
          <input
            required
            value={card.name}
            onChange={(e) => setCard({ ...card, name: e.target.value })}
            placeholder="Sarah Thompson"
            className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">Card number</span>
          <input
            required
            value={card.number}
            onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
            placeholder="4242 4242 4242 4242"
            inputMode="numeric"
            className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">Expiry</span>
            <input
              required
              value={card.expiry}
              onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
              placeholder="MM/YY"
              inputMode="numeric"
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">CVC</span>
            <input
              required
              value={card.cvc}
              onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/[^0-9]/g, "").slice(0, 4) })}
              placeholder="123"
              inputMode="numeric"
              className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
            />
          </label>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={paying}
            className="rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-bone transition hover:bg-ink disabled:opacity-60"
          >
            {paying ? "Processing…" : `Pay ${formatCurrency(amount)}`}
          </button>
          {onCancel ? (
            <button type="button" onClick={onCancel} className="text-sm text-ink/50 hover:text-charcoal">
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
