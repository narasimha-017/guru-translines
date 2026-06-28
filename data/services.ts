import {
  Briefcase,
  GraduationCap,
  TreePalm,
  PartyPopper,
  Landmark,
  Map,
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
    slug: "staff-transportation",
    name: "Staff Transportation",
    shortDescription:
      "Daily employee pick-up and drop, designed to save your company time and money.",
    description:
      "Our staff transportation model is built for companies that need a dependable daily commute solution for their employees. Routes, timings and vehicle sizing are planned around your shift patterns, with GPS-tracked vehicles and trained drivers on every run.",
    icon: Briefcase,
    image: "/images/fleet/12tt-tempo-traveller.jpg",
  },
  {
    slug: "school-transportation",
    name: "School Transportation",
    shortDescription:
      "Safe, monitored transport for students with experienced, background-checked drivers.",
    description:
      "We understand that school transport carries a different level of responsibility. Our drivers are trained specifically for student safety, vehicles are fitted with first-aid kits and seat belts, and routes are tracked in real time.",
    icon: GraduationCap,
    image: "/images/fleet/17-seater-executive.jpg",
  },
  {
    slug: "picnics",
    name: "Picnics & Group Outings",
    shortDescription:
      "Comfortable group travel for family, school or corporate picnics.",
    description:
      "A family, business or student picnic should be about the destination, not the journey. We provide the right vehicle size for your group with a driver who knows the route, so the trip is part of the fun.",
    icon: TreePalm,
    image: "/images/fleet/22-minibus.jpg",
  },
  {
    slug: "weddings-events",
    name: "Weddings & Events",
    shortDescription:
      "Reliable transportation for weddings, conferences and corporate functions.",
    description:
      "Weddings, conferences and meetings run on tight schedules. We coordinate vehicle timing closely with your event plan so guest transport is one less thing to worry about on the day.",
    icon: PartyPopper,
    image: "/images/fleet/27-minibus.jpg",
  },
  {
    slug: "pilgrimage",
    name: "Pilgrimage Trips",
    shortDescription:
      "Comfortable long-distance travel for pilgrimage and temple tours across India.",
    description:
      "India's pilgrimage destinations call for vehicles that can handle long distances comfortably. Our outstation fleet is maintained for multi-day journeys, with a driver allowance structure built for exactly this kind of trip.",
    icon: Landmark,
    image: "/images/fleet/40-dlx-bus.jpg",
  },
  {
    slug: "inter-intra-city",
    name: "Inter & Intra-City Travel",
    shortDescription:
      "City and long-distance travel handled by a team of experienced operations staff.",
    description:
      "Whether it's a same-day city trip or a multi-state outstation journey, our operations team plans the vehicle, driver and route in advance so the only thing you need to do is get in.",
    icon: Map,
    image: "/images/fleet/hero-fleet-1.jpg",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
