import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import FadeIn from "@/components/shared/FadeIn";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { buildWhatsAppLink, buildWhatsAppQuoteMessage } from "@/lib/company";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const message = buildWhatsAppQuoteMessage({ tripType: service.name });

  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <FadeIn>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Icon size={24} />
          </div>
          <h1 className="mt-5 text-3xl font-semibold text-gray-900 sm:text-4xl">{service.name}</h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600">{service.description}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
          <Image src={service.image} alt={service.name} fill className="object-cover" />
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/estimator"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Get a fare estimate <ArrowRight size={16} />
          </Link>
          <a
            href={buildWhatsAppLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-500 px-5 py-3 text-sm font-medium text-teal-700 hover:bg-cyan-50"
          >
            <MessageCircle size={16} /> WhatsApp us
          </a>
        </FadeIn>
      </Container>
    </div>
  );
}
