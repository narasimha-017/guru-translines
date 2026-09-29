import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatButton from "@/components/layout/WhatsAppFloatButton";
import UtmTracker from "@/components/shared/UtmTracker";
import { COMPANY } from "@/lib/company";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://www.gurutranslines.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} | Premium Transportation Services Across India`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Guru Translines provides premium travel solutions across India — corporate transportation, staff commuting, school transportation, airport transfers, weddings, and outstation trips.",
  keywords: [
    "Guru Translines",
    "corporate transportation India",
    "staff transportation Hyderabad",
    "school bus service Telangana",
    "airport transfers Hyderabad",
    "outstation group travel India",
    "wedding transport logistics",
    "bus rental Secunderabad",
  ],
  openGraph: {
    title: `${COMPANY.name} | Premium Transportation Services Across India`,
    description:
      "Premium travel solutions across India since 1983. Trusted by leading enterprises, schools, and families.",
    url: siteUrl,
    siteName: COMPANY.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Premium Transportation Services Across India`,
    description: "Premium travel solutions across India since 1983.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-white text-gray-900">
        <Suspense fallback={null}>
          <UtmTracker />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovingCompany",
              name: COMPANY.legalName,
              image: `${siteUrl}/images/brand/logo.svg`,
              telephone: COMPANY.contact.primaryPhone,
              email: COMPANY.contact.salesEmail,
              address: {
                "@type": "PostalAddress",
                streetAddress: `${COMPANY.address.line1}, ${COMPANY.address.line2}`,
                addressLocality: COMPANY.address.city,
                addressRegion: COMPANY.address.state,
                postalCode: COMPANY.address.pincode,
                addressCountry: "IN",
              },
              areaServed: "India",
              foundingDate: String(COMPANY.foundedYear),
              url: siteUrl,
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
