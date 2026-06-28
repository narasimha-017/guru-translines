import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  pickup: z.string().min(2, "Please enter a pickup location"),
  drop: z.string().min(2, "Please enter a drop location"),
  date: z.string().min(1, "Please select a date"),
  vehicle: z.string().min(1, "Please select a vehicle"),
  passengers: z.coerce.number().min(1, "Please enter number of passengers"),
  tripType: z.enum(["local", "outstation"]),
  message: z.string().optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  message: z.string().min(5, "Please enter a message"),
});

export type ContactInput = z.infer<typeof contactSchema>;
