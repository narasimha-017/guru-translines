import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import FadeIn from "@/components/shared/FadeIn";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <div className="overflow-hidden rounded-3xl bg-indigo-600 px-8 py-14 text-center sm:px-16 sm:py-20">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Know your fare before you call
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-indigo-100">
              Use our smart fare estimator to get an instant price for your trip — no waiting on
              a callback.
            </p>
            <a
              href="/estimator"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-medium text-indigo-600 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Get instant quote <ArrowRight size={16} />
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
