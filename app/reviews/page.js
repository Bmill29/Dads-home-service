import Reveal from "@/components/Reveal";
import ReviewCard from "@/components/ReviewCard";
import { REVIEWS } from "@/lib/mockData";

export const metadata = { title: "Reviews" };

export default function ReviewsPage() {
  const average = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <div className="mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-brass">Reviews</p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal sm:text-5xl">What clients say</h1>
        <p className="mt-5 text-ink/60">
          {average} average rating across {REVIEWS.length} completed projects.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((review, i) => (
          <Reveal key={review.id} delay={i * 60}>
            <ReviewCard review={review} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
