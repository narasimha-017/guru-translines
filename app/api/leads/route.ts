import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase, LeadRecord } from "@/lib/supabase";
import { buildWhatsAppLeadMessage, buildWhatsAppLink } from "@/lib/company";

const leadApiSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid 10-digit phone number is required"),
  email: z.string().email("Valid email address required").optional().or(z.literal("")),
  tripType: z.string().min(1, "Trip type is required"),
  pickup: z.string().min(2, "Pickup location is required"),
  drop: z.string().min(2, "Drop destination is required"),
  travelDate: z.string().min(1, "Travel date is required"),
  returnDate: z.string().optional().or(z.literal("")),
  passengers: z.coerce.number().min(1, "Passengers count is required"),
  vehicleRequirement: z.string().optional().or(z.literal("")),
  requirements: z.string().optional().or(z.literal("")),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  landingPage: z.string().optional(),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: "You must agree to the contact consent to submit an enquiry.",
  }),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = leadApiSchema.safeParse(json);

    if (!result.success) {
      const issues = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
      return NextResponse.json(
        { success: false, message: `Validation failed: ${issues}` },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check if Supabase is initialized
    if (!supabase) {
      console.error("Supabase client is not configured. Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return NextResponse.json(
        {
          success: false,
          message: "Database service is not configured. Please contact the administrator or reach out directly by phone.",
        },
        { status: 503 }
      );
    }

    const leadPayload: LeadRecord = {
      full_name: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email ? data.email.trim() : null,
      trip_type: data.tripType,
      pickup_location: data.pickup.trim(),
      drop_location: data.drop.trim(),
      travel_date: data.travelDate,
      return_date: data.returnDate ? data.returnDate : null,
      passengers: data.passengers,
      vehicle_requirement: data.vehicleRequirement || null,
      requirements: data.requirements ? data.requirements.trim() : null,
      utm_source: data.utmSource || "direct",
      utm_medium: data.utmMedium || null,
      utm_campaign: data.utmCampaign || null,
      utm_content: data.utmContent || null,
      utm_term: data.utmTerm || null,
      landing_page: data.landingPage || "/",
      status: "new",
    };

    const { data: inserted, error: dbError } = await supabase
      .from("leads")
      .insert([leadPayload])
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase lead insertion error:", dbError);
      return NextResponse.json(
        {
          success: false,
          message: "We couldn't save your enquiry right now. Please try again or contact us directly.",
          error: dbError.message,
        },
        { status: 500 }
      );
    }

    // Build WhatsApp message and URL
    const whatsappMessage = buildWhatsAppLeadMessage({
      name: data.fullName,
      tripType: data.tripType,
      pickup: data.pickup,
      drop: data.drop,
      travelDate: data.travelDate,
      returnDate: data.returnDate || undefined,
      passengers: data.passengers,
      requirement: data.vehicleRequirement || undefined,
      message: data.requirements || undefined,
    });

    const whatsappUrl = buildWhatsAppLink(whatsappMessage);

    return NextResponse.json({
      success: true,
      leadId: inserted?.id || null,
      whatsappUrl,
      message: "Lead recorded successfully. Redirecting to WhatsApp...",
    });
  } catch (err: unknown) {
    console.error("Lead submission error:", err);
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      {
        success: false,
        message: "We couldn't save your enquiry right now. Please try again or contact us directly.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
