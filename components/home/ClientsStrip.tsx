import Container from "@/components/shared/Container";
import FadeIn from "@/components/shared/FadeIn";
import { COMPANY } from "@/lib/company";

export default function ClientsStrip() {
  return (
    <section className="border-y border-gray-100 bg-gray-50/70 py-10">
      <Container>
        <FadeIn>
          <p className="text-center text-xs font-bold uppercase tracking-wider text-gray-500">
            Trusted by leading enterprises & institutions
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
            {COMPANY.clients.map((client) => (
              <span
                key={client}
                className="text-sm font-semibold text-gray-600 transition-colors hover:text-blue-600 sm:text-base"
              >
                {client}
              </span>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
