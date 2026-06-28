import Container from "@/components/shared/Container";
import FadeIn from "@/components/shared/FadeIn";
import { COMPANY } from "@/lib/company";

export default function ClientsStrip() {
  return (
    <section className="py-14">
      <Container>
        <FadeIn>
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
            Trusted by teams at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {COMPANY.clients.map((client) => (
              <span key={client} className="text-base font-medium text-gray-400 sm:text-lg">
                {client}
              </span>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
