import { Suspense } from "react";
import QuoteWizard from "@/components/quote/QuoteWizard";

export const metadata = { title: "Get a Quote" };

export default function QuotePage() {
  return (
    <Suspense fallback={null}>
      <QuoteWizard />
    </Suspense>
  );
}
