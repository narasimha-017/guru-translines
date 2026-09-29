import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  pickup: z.string().min(2, "Please enter pickup location / city"),
  drop: z.string().min(2, "Please enter drop destination / city"),
  date: z.string().min(1, "Please select travel date"),
  serviceType: z.string().min(1, "Please select service type"),
  passengers: z.coerce.number().min(1, "Please enter number of passengers"),
  tripType: z.enum(["local", "outstation"]),
  message: z.string().optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  message: z.string().min(5, "Please enter your message or inquiry"),
});

export type ContactInput = z.infer<typeof contactSchema>;
