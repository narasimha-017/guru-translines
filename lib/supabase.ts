import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

export const supabase = supabaseUrl && supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;

export interface LeadRecord {
  id?: string;
  created_at?: string;
  full_name: string;
  phone: string;
  email?: string | null;
  trip_type: string;
  pickup_location: string;
  drop_location: string;
  travel_date: string;
  return_date?: string | null;
  passengers: number;
  vehicle_requirement?: string | null;
  requirements?: string | null;
  utm_source?: string;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  landing_page?: string | null;
  status?: string;
}
