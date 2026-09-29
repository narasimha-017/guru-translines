import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import Container from "@/components/shared/Container";
import FadeIn from "@/components/shared/FadeIn";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { COMPANY, buildTelLink } from "@/lib/company";

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
    title: `${service.name} | ${COMPANY.name}`,
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

  return (
    <div className="bg-white py-16 sm:py-24">
      <Container className="max-w-4xl">
        <FadeIn>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Icon size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Transportation Service
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            {service.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{service.description}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-gray-100 shadow-md">
          <Image src={service.image} alt={service.name} fill className="object-cover" />
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 rounded-2xl border border-gray-200 bg-slate-50 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-gray-900">Why Choose Guru Translines for {service.name}?</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
              <span>Dedicated operations manager assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
              <span>100% GPS live tracking & route monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
              <span>Vetted, background-verified drivers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
              <span>Round-the-clock 24/7 customer support</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            href={`/booking?service=${encodeURIComponent(service.name)}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700"
          >
            Book Your Trip <ArrowRight size={16} />
          </Link>

          <Link
            href={`/booking?service=${encodeURIComponent(service.name)}`}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700"
          >
            <MessageCircle size={16} /> WhatsApp Enquiry
          </Link>

          <a
            href={buildTelLink()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 shadow-xs transition-all hover:bg-gray-50"
          >
            <Phone size={16} className="text-blue-600" /> Call {COMPANY.contact.primaryPhoneDisplay}
          </a>
        </FadeIn>
      </Container>
    </div>
  );
}
