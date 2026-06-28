export interface FleetVehicle {
  id: string;
  name: string;
  capacity: number;
  acOptions: ("AC" | "Non-AC")[];
  startingPrice: number;
  image: string;
  tagline: string;
  bestFor: string[];
}

export const FLEET: FleetVehicle[] = [
  {
    id: "12tt",
    name: "Tempo Traveller",
    capacity: 12,
    acOptions: ["AC", "Non-AC"],
    startingPrice: 5000,
    image: "/images/fleet/12tt-tempo-traveller.jpg",
    tagline: "Compact and comfortable for small groups",
    bestFor: ["Staff transportation", "Small group outings", "Airport transfers"],
  },
  {
    id: "12sml",
    name: "SML Minibus",
    capacity: 12,
    acOptions: ["AC"],
    startingPrice: 6500,
    image: "/images/fleet/12sml-minibus.jpg",
    tagline: "Higher deck minibus with extra luggage space",
    bestFor: ["Corporate transport", "Weekend trips"],
  },
  {
    id: "17-seater",
    name: "17 Seater Executive",
    capacity: 17,
    acOptions: ["AC", "Non-AC"],
    startingPrice: 5500,
    image: "/images/fleet/17-seater-executive.jpg",
    tagline: "Our most booked vehicle for medium-sized groups",
    bestFor: ["School transportation", "Picnics", "Staff transportation"],
  },
  {
    id: "22-minibus",
    name: "22 Seater Minibus",
    capacity: 22,
    acOptions: ["AC"],
    startingPrice: 7500,
    image: "/images/fleet/22-minibus.jpg",
    tagline: "Spacious AC minibus for larger groups",
    bestFor: ["Corporate transport", "Weddings & events"],
  },
  {
    id: "27-minibus",
    name: "27 Seater Minibus",
    capacity: 27,
    acOptions: ["AC"],
    startingPrice: 8000,
    image: "/images/fleet/27-minibus.jpg",
    tagline: "Ideal for medium-sized institutional groups",
    bestFor: ["School transportation", "Pilgrimage trips"],
  },
  {
    id: "40-dlx-bus",
    name: "40 Seater DLX Bus",
    capacity: 40,
    acOptions: ["AC"],
    startingPrice: 10000,
    image: "/images/fleet/40-dlx-bus.jpg",
    tagline: "Our flagship coach for large groups and long journeys",
    bestFor: ["Weddings & events", "Pilgrimage trips", "Inter-city travel"],
  },
];

export function getVehicleById(id: string) {
  return FLEET.find((v) => v.id === id);
}
