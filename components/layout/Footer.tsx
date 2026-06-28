import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import Container from "@/components/shared/Container";
import { COMPANY, buildTelLink, yearsInBusiness } from "@/lib/company";
import { SERVICES } from "@/data/services";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/brand/logo-white.svg"
              alt={COMPANY.name}
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="text-base font-semibold text-white">{COMPANY.name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            {yearsInBusiness()}+ years of safe, reliable local and outstation transportation
            Across India.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-gray-400 hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Quick links</h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/fleet" className="text-sm text-gray-400 hover:text-white">
                Our fleet
              </Link>
            </li>
            <li>
              <Link href="/estimator" className="text-sm text-gray-400 hover:text-white">
                Fare estimator
              </Link>
            </li>
            <li>
              <Link href="/booking" className="text-sm text-gray-400 hover:text-white">
                Book a vehicle
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0" /> {COMPANY.address.full}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0" />
              <a href={buildTelLink()} className="hover:text-white">
                {COMPANY.contact.primaryPhoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0" />
              <a href={`mailto:${COMPANY.contact.salesEmail}`} className="hover:text-white">
                {COMPANY.contact.salesEmail}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-gray-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <p>Operating since {COMPANY.foundedYear}</p>
        </Container>
      </div>
    </footer>
  );
}
