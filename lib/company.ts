export const COMPANY = {
  name: "Guru Translines",
  legalName: "Guru Translines Pvt Ltd",
  foundedYear: 1983,
  renamedYear: 2013,
  fleetSize: 55,
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
    // Add real profile URLs when available.
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

interface WhatsAppQuoteParams {
  vehicle?: string;
  tripType?: string;
  pickup?: string;
  drop?: string;
  date?: string;
  passengers?: string | number;
  estimatedFare?: string;
}

export function buildWhatsAppQuoteMessage(params: WhatsAppQuoteParams) {
  const lines = [
    "Hello Guru Translines,",
    "",
    "I would like a quotation for:",
    "",
    `Vehicle: ${params.vehicle ?? "-"}`,
    `Trip Type: ${params.tripType ?? "-"}`,
    `Pickup: ${params.pickup ?? "-"}`,
    `Drop: ${params.drop ?? "-"}`,
    `Date: ${params.date ?? "-"}`,
    `Passengers: ${params.passengers ?? "-"}`,
  ];

  if (params.estimatedFare) {
    lines.push(`Estimated Fare: ${params.estimatedFare}`);
  }

  lines.push("", "Please contact me.");

  return lines.join("\n");
}

export function buildWhatsAppLink(message: string, phone: string = COMPANY.contact.primaryPhone) {
  const cleanPhone = phone.replace(/[^\d+]/g, "");
  return `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export function buildTelLink(phone: string = COMPANY.contact.primaryPhone) {
  return `tel:${phone}`;
}
