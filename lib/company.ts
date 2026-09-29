export const COMPANY = {
  name: "Guru Translines",
  legalName: "Guru Translines Pvt Ltd",
  foundedYear: 1983,
  renamedYear: 2013,
  address: {
    line1: "Plot No. 64, Samrat Colony",
    line2: "West Marredpally",
    city: "Secunderabad",
    state: "Telangana",
    pincode: "500026",
    full: "Plot No. 64, Samrat Colony, West Marredpally, Secunderabad - 500026, Telangana",
  },
  contact: {
    // Primary number for all Call / WhatsApp CTAs across the site.
    primaryPhone: "+919348887007",
    primaryPhoneDisplay: "93488 87007",
    salesEmail: "gurutranslines@gmail.com",
    financeEmail: "gurutranslines.finance@gmail.com",
    financePhoneDisplay: "94939 26000",
  },
  social: {
    facebook: "",
    instagram: "",
  },
  clients: [
    "Mold-Tek",
    "Laxai Life Sciences",
    "Syngenta",
    "Nunhems",
    "UPL",
    "Broadcom",
    "Avanti",
    "Premier",
    "Rockwell",
    "Crop Science",
  ],
} as const;

export function yearsInBusiness() {
  return new Date().getFullYear() - COMPANY.foundedYear;
}

export interface WhatsAppLeadParams {
  name?: string;
  tripType?: string;
  pickup?: string;
  drop?: string;
  travelDate?: string;
  returnDate?: string;
  passengers?: number | string;
  requirement?: string;
  message?: string;
  vehicle?: string;
  date?: string;
  estimatedFare?: string;
}

export function buildWhatsAppLeadMessage(params: WhatsAppLeadParams): string {
  const lines = [
    "Hello Guru Translines, I would like to enquire about a trip.",
    "",
    `Name: ${params.name || "-"}`,
    `Trip type: ${params.tripType || "-"}`,
    `Pickup: ${params.pickup || "-"}`,
    `Drop: ${params.drop || "-"}`,
    `Travel date: ${params.travelDate || params.date || "-"}`,
  ];

  if (params.returnDate) {
    lines.push(`Return date: ${params.returnDate}`);
  }

  lines.push(`Passengers: ${params.passengers || "-"}`);

  if (params.requirement || params.vehicle) {
    lines.push(`Requirement: ${params.requirement || params.vehicle}`);
  }

  if (params.message) {
    lines.push(`Notes: ${params.message}`);
  }

  lines.push("", "I have submitted my enquiry through the website.");

  return lines.join("\n");
}

export function buildWhatsAppQuoteMessage(params: Partial<WhatsAppLeadParams>): string {
  const lines = [
    "Hello Guru Translines, I would like to enquire about a trip across India.",
    "",
    `Trip type: ${params.tripType || "General Enquiry"}`,
  ];

  if (params.pickup && params.drop) {
    lines.push(`Route: ${params.pickup} to ${params.drop}`);
  }

  if (params.travelDate || params.date) {
    lines.push(`Date: ${params.travelDate || params.date}`);
  }

  if (params.passengers) {
    lines.push(`Passengers: ${params.passengers}`);
  }

  lines.push("", "Please assist me with details.");

  return lines.join("\n");
}

export function buildWhatsAppLink(message: string, phone: string = COMPANY.contact.primaryPhone): string {
  const cleanPhone = phone.replace(/[^\d+]/g, "");
  return `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export function buildTelLink(phone: string = COMPANY.contact.primaryPhone): string {
  return `tel:${phone}`;
}
