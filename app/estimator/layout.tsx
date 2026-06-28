import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Fare Estimator",
  description:
    "Get an instant fare estimate for your local or outstation trip with Guru Translines. Choose your vehicle, trip type and travel details for a transparent, upfront price.",
};

export default function EstimatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
