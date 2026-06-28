// Source: Gururu_Translines_Rates.xlsx, supplied by the client.
// Only vehicles with confirmed current rates are included. Sedan, Innova
// Crysta, 16-Seater and 55-Seater Bus were excluded on the client's
// instruction since no current rate data exists for them.

export type AcType = "AC" | "Non-AC";

export interface VehicleRate {
  /** Local package: covers 8 hrs / 80 km */
  local?: {
    AC?: { basicRate: number; lateNight: number; extraHr: number; extraKm: number };
    "Non-AC"?: { basicRate: number; lateNight: number; extraHr: number; extraKm: number };
  };
  /** Outstation: billed on km with a 300 km/day minimum, plus a daily driver allowance */
  outstation?: {
    AC?: { perKm: number; driverBatta: number };
    "Non-AC"?: { perKm: number; driverBatta: number };
  };
}

export const RATES: Record<string, VehicleRate> = {
  "12tt": {
    local: {
      AC: { basicRate: 5500, lateNight: 600, extraHr: 250, extraKm: 25 },
      "Non-AC": { basicRate: 5000, lateNight: 600, extraHr: 250, extraKm: 22 },
    },
    outstation: {
      AC: { perKm: 28, driverBatta: 800 },
      "Non-AC": { perKm: 25, driverBatta: 800 },
    },
  },
  "12sml": {
    local: {
      AC: { basicRate: 6500, lateNight: 600, extraHr: 250, extraKm: 30 },
    },
    outstation: {
      AC: { perKm: 36, driverBatta: 800 },
    },
  },
  "17-seater": {
    local: {
      AC: { basicRate: 6500, lateNight: 600, extraHr: 300, extraKm: 38 },
      "Non-AC": { basicRate: 5500, lateNight: 600, extraHr: 300, extraKm: 35 },
    },
    outstation: {
      AC: { perKm: 40, driverBatta: 800 },
      "Non-AC": { perKm: 38, driverBatta: 800 },
    },
  },
  "22-minibus": {
    local: {
      AC: { basicRate: 7500, lateNight: 600, extraHr: 300, extraKm: 38 },
    },
    outstation: {
      AC: { perKm: 44, driverBatta: 800 },
    },
  },
  "27-minibus": {
    local: {
      AC: { basicRate: 8000, lateNight: 600, extraHr: 300, extraKm: 50 },
    },
    outstation: {
      AC: { perKm: 55, driverBatta: 800 },
    },
  },
  "40-dlx-bus": {
    local: {
      AC: { basicRate: 10000, lateNight: 800, extraHr: 400, extraKm: 65 },
    },
    outstation: {
      AC: { perKm: 70, driverBatta: 1000 },
    },
  },
};

export interface LocalFareBreakdown {
  type: "local";
  basicRate: number;
  extraHourCharge: number;
  extraKmCharge: number;
  lateNightCharge: number;
  total: number;
}

export interface OutstationFareBreakdown {
  type: "outstation";
  billableKm: number;
  perKm: number;
  kmCharge: number;
  days: number;
  driverBatta: number;
  driverBattaTotal: number;
  total: number;
}

export function calculateLocalFare(
  vehicleId: string,
  ac: AcType,
  hours: number,
  km: number,
  isNightTravel: boolean
): LocalFareBreakdown | null {
  const rate = RATES[vehicleId]?.local?.[ac];
  if (!rate) return null;

  const extraHours = Math.max(0, hours - 8);
  const extraKm = Math.max(0, km - 80);
  const extraHourCharge = extraHours * rate.extraHr;
  const extraKmCharge = extraKm * rate.extraKm;
  const lateNightCharge = isNightTravel ? rate.lateNight : 0;

  return {
    type: "local",
    basicRate: rate.basicRate,
    extraHourCharge,
    extraKmCharge,
    lateNightCharge,
    total: rate.basicRate + extraHourCharge + extraKmCharge + lateNightCharge,
  };
}

export function calculateOutstationFare(
  vehicleId: string,
  ac: AcType,
  totalKm: number,
  days: number
): OutstationFareBreakdown | null {
  const rate = RATES[vehicleId]?.outstation?.[ac];
  if (!rate) return null;

  const billableKm = Math.max(totalKm, days * 300);
  const kmCharge = billableKm * rate.perKm;
  const driverBattaTotal = days * rate.driverBatta;

  return {
    type: "outstation",
    billableKm,
    perKm: rate.perKm,
    kmCharge,
    days,
    driverBatta: rate.driverBatta,
    driverBattaTotal,
    total: kmCharge + driverBattaTotal,
  };
}

export function vehicleSupportsAc(vehicleId: string, tripType: "local" | "outstation", ac: AcType) {
  return Boolean(RATES[vehicleId]?.[tripType]?.[ac]);
}
