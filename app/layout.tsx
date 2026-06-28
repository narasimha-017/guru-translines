import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatButton from "@/components/layout/WhatsAppFloatButton";
import { COMPANY } from "@/lib/company";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://www.gurutranslines.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} | Local & Outstation Transportation in Telangana`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Guru Translines provides premium local and outstation transportation across Telangana — staff transportation, school transportation, corporate travel, weddings and pilgrimage trips. Get an instant fare estimate.",
  keywords: [
    "Guru Translines",
    "tempo traveller rental Hyderabad",
    "minibus rental Hyderabad",
    "outstation cab Telangana",
    "staff transportation Hyderabad",
    "school transportation Hyderabad",
    "bus rental Secunderabad",
  ],
  openGraph: {
    title: `${COMPANY.name} | Local & Outstation Transportation in Telangana`,
    description:
      "Premium local and outstation transportation across Telangana since 1983. Get an instant fare estimate.",
    url: siteUrl,
    siteName: COMPANY.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Local & Outstation Transportation in Telangana`,
    description: "Premium local and outstation transportation across Telangana since 1983.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovingCompany",
              name: COMPANY.legalName,
              image: `${siteUrl}/images/fleet/hero-fleet-1.jpg`,
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
              areaServed: "Telangana",
              foundingDate: String(COMPANY.foundedYear),
              url: siteUrl,
            }),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
