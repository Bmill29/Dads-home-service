"use client";

import { useState } from "react";

export default function SendQuoteForm({ existingQuote, onSend }) {
  const [price, setPrice] = useState(existingQuote?.price ?? "");
  const [scope, setScope] = useState(existingQuote?.scope ?? "");
  const [deposit, setDeposit] = useState(existingQuote?.deposit ?? "");
  const [estimatedTime, setEstimatedTime] = useState(existingQuote?.estimatedTime ?? "");

  function submit(e) {
    e.preventDefault();
    onSend({
      price: Number(price),
      scope,
      deposit: Number(deposit),
      estimatedTime,
      sentDate: new Date().toISOString().slice(0, 10),
    });
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">
          Price (total quote)
        </span>
        <input
          required
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="9800"
          className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">
          Scope of work
        </span>
        <textarea
          required
          rows={4}
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          placeholder="Describe exactly what's included in this quote..."
          className="w-full resize-none rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/40">
          Deposit amount
        </span>
        <input
          required
          type="number"
          min="0"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          placeholder="2000"
          className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
        />
      </label>

      <label className="block rounded-md border border-dashed border-line p-3">
        <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-clay">
          Estimated job time
          <span className="rounded-full bg-clay/10 px-2 py-0.5 text-[10px] normal-case tracking-normal">
            Internal only — never shown to customer
          </span>
        </span>
        <input
          required
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          placeholder="e.g. 6 working days"
          className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/35 focus:border-brass"
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-bone transition hover:bg-ink"
      >
        {existingQuote ? "Send revised quote" : "Send quote"}
      </button>
    </form>
  );
}
