import {
  Briefcase,
  GraduationCap,
  Plane,
  MapPin,
  Compass,
  PartyPopper,
  Landmark,
  TreePalm,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export const SERVICES: Service[] = [
  {
    slug: "corporate-transportation",
    name: "Corporate Transportation",
    shortDescription:
      "Reliable executive & employee commute solutions tailored to enterprise shifts.",
    description:
      "Our corporate transportation services provide dedicated travel management for enterprises, tech parks, and businesses. With strict SLA adherence, real-time GPS tracking, and vetted professional drivers, we ensure your team travels safely and on schedule every single day.",
    icon: Briefcase,
    image: "/images/fleet/12tt-tempo-traveller.jpg",
  },
  {
    slug: "staff-transportation",
    name: "Staff Transportation",
    shortDescription:
      "Daily employee pick-up and drop designed for safety, punctuality, and efficiency.",
    description:
      "Our staff transportation model is built for companies that need a dependable daily commute solution for their employees. Routes, timings, and vehicles are planned around your shift patterns, with GPS-tracked vehicles and trained drivers on every run.",
    icon: Briefcase,
    image: "/images/fleet/17-seater-executive.jpg",
  },
  {
    slug: "school-transportation",
    name: "School Transportation",
    shortDescription:
      "Safe, monitored transport for students with background-checked drivers.",
    description:
      "We understand that student transport carries the highest responsibility. Our drivers are trained specifically for student safety, vehicles are equipped with first-aid kits and seat belts, and routes are tracked in real time for parents and institutions.",
    icon: GraduationCap,
    image: "/images/fleet/22-minibus.jpg",
  },
  {
    slug: "airport-transfers",
    name: "Airport Transfers",
    shortDescription:
      "Punctual airport pickups and drop-offs for individuals, executives, and large groups.",
    description:
      "Seamless airport connectivity for delegates, executive guests, and large delegations. Our operations desk tracks flight timings to ensure zero waiting time, dedicated luggage handling, and direct transit to hotels or offices.",
    icon: Plane,
    image: "/images/fleet/hero-fleet-1.jpg",
  },
  {
    slug: "local-trips",
    name: "Local Trips & City Rentals",
    shortDescription:
      "Flexible city charters for business meetings, delegations, and city tours.",
    description:
      "Whether it is single-day city travel, client site visits, or local conferences, our operations team coordinates comfortable travel with experienced drivers who know the city routes inside out.",
    icon: MapPin,
    image: "/images/fleet/27-minibus.jpg",
  },
  {
    slug: "outstation-trips",
    name: "Outstation Trips",
    shortDescription:
      "Comfortable long-distance inter-city charters across India for groups and families.",
    description:
      "From multi-city corporate tours to long-distance family vacations across states, our outstation services guarantee comfort, reliable highway driving, and comprehensive round-the-clock support.",
    icon: Compass,
    image: "/images/fleet/40-dlx-bus.jpg",
  },
  {
    slug: "pan-india-service",
    name: "PAN India Tours & Pilgrimages",
    shortDescription:
      "Comprehensive nationwide tour packages and pilgrimage charters across India.",
    description:
      "We operate seamless multi-day tours to heritage sites, pilgrimage destinations, and popular holiday circuits across India. Our dedicated operations team manages customized itineraries for smooth and memorable group journeys.",
    icon: Landmark,
    image: "/images/fleet/40-dlx-bus.jpg",
  },
  {
    slug: "weddings-events",
    name: "Weddings & Event Transport",
    shortDescription:
      "Coordinated guest logistics for weddings, conferences, and celebrations.",
    description:
      "Weddings and mega events run on tight schedules. We coordinate guest transfers, hotel-to-venue shuttles, and VIP transport so that guest movement is completely smooth and stress-free.",
    icon: PartyPopper,
    image: "/images/fleet/27-minibus.jpg",
  },
  {
    slug: "picnics",
    name: "Picnics & Group Outings",
    shortDescription:
      "Comfortable group travel for family gatherings, school outings, and team get-togethers.",
    description:
      "Group outings should be enjoyable right from the pickup. We provide comfortable group vehicles with professional drivers so everyone travels together happily.",
    icon: TreePalm,
    image: "/images/fleet/22-minibus.jpg",
  },
];

export function getServiceBySlug(slug: string) {
  if (slug === "pilgrimage") return SERVICES.find((s) => s.slug === "pan-india-service") || SERVICES[5];
  if (slug === "inter-intra-city") return SERVICES.find((s) => s.slug === "outstation-trips") || SERVICES[4];
  return SERVICES.find((s) => s.slug === slug);
}
