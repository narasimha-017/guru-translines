"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

export default function FullPageBusJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(1);
  const [busCoords, setBusCoords] = useState({ x: 920, y: 250, angle: 30 });

  // Hook into whole window scroll
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 85, damping: 26, restDelta: 0.001 });

  // Smooth curved path that flows cleanly along the sides/margins of the page (0-1000 X, 0-4800 Y)
  // avoiding collisions with central cards
  const pathString = `
    M 910, 200
    C 960, 600  880, 1100  920, 1500
    C 940, 1900 860, 2300  120, 2600
    C 60,  3000 80,  3500  100, 3900
    C 120, 4300 820, 4500  880, 4800
  `;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (p) => {
      if (!pathRef.current || pathLength <= 1) return;

      const clampedP = Math.max(0.001, Math.min(0.999, p));
      const distance = clampedP * pathLength;
      const point = pathRef.current.getPointAtLength(distance);

      // Compute smooth tangent angle for 3D steering
      const nextPoint = pathRef.current.getPointAtLength(Math.min(pathLength, distance + 8));
      const dx = nextPoint.x - point.x;
      const dy = nextPoint.y - point.y;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      setBusCoords({ x: point.x, y: point.y, angle });
    });

    return () => unsubscribe();
  }, [smoothProgress, pathLength]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 w-full overflow-hidden"
      style={{ height: "100%" }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1000 4800"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* Radiant Electric Blue & Azure Gradient for Road */}
          <linearGradient id="azure_highway_glow" x1="0" y1="0" x2="0" y2="4800" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#2563eb" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
          </linearGradient>

          {/* Platinum Metallic Gradient for Bus Body */}
          <linearGradient id="platinum_body" x1="0" y1="-25" x2="0" y2="25" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#f1f5f9" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Electric Blue Livery Ribbon */}
          <linearGradient id="electric_blue_stripe" x1="-70" y1="0" x2="70" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Headlight Projection Light Cone */}
          <linearGradient id="headlight_beam_wide" x1="68" y1="0" x2="230" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#bae6fd" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="road_glow_blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="beam_glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* ── 1. Wide Ambient Road Neon Glow Underlay ── */}
        <path
          d={pathString}
          stroke="url(#azure_highway_glow)"
          strokeWidth="70"
          strokeLinecap="round"
          filter="url(#road_glow_blur)"
          opacity="0.28"
        />

        {/* ── 2. Solid Asphalt Dark Roadbed ── */}
        <path
          d={pathString}
          stroke="#051124"
          strokeWidth="42"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* ── 3. Radiant Electric Blue Outer Road Shoulders ── */}
        <path
          d={pathString}
          stroke="url(#azure_highway_glow)"
          strokeWidth="42"
          strokeLinecap="round"
          strokeDasharray="2 38"
          opacity="0.5"
        />

        {/* ── 4. Math Reference Path ── */}
        <path ref={pathRef} d={pathString} stroke="transparent" fill="none" />

        {/* ── 5. Bright Yellow Highway Center Dashes ── */}
        <path
          d={pathString}
          stroke="#fde047"
          strokeWidth="3.5"
          strokeDasharray="14 20"
          strokeLinecap="round"
          opacity="0.95"
        />

        {/* ── 6. 🚌 LARGE ISOMETRIC CHAMPAGNE PLATINUM & ELECTRIC BLUE LUXURY COACH ── */}
        {/* Clean, no overlapping destination labels! */}
        <g transform={`translate(${busCoords.x}, ${busCoords.y}) rotate(${busCoords.angle})`}>
          {/* Ground Contact Shadow */}
          <ellipse cx="0" cy="3" rx="80" ry="32" fill="rgba(0, 0, 0, 0.85)" filter="url(#road_glow_blur)" />

          {/* Forward Projector LED Headlight Cones */}
          <path
            d="M 68, -18 L 220, -55 L 220, 55 L 68, 18 Z"
            fill="url(#headlight_beam_wide)"
            opacity="0.9"
            filter="url(#beam_glow)"
          />

          {/* Speed Light Trails */}
          <line x1="-70" y1="-12" x2="-130" y2="-12" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="-70" y1="12" x2="-115" y2="12" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

          {/* ── Coach Chassis: Champagne Platinum Metallic Finish ── */}
          <rect
            x="-68"
            y="-24"
            width="136"
            height="48"
            rx="12"
            fill="url(#platinum_body)"
            stroke="#ffffff"
            strokeWidth="1.8"
          />

          {/* ── Radiant Electric Blue Aerodynamic Livery Stripe ── */}
          <path d="M -62, 5 L 64, 5 L 58, 14 L -62, 14 Z" fill="url(#electric_blue_stripe)" />
          {/* Gold Pinstripe Accent */}
          <path d="M -62, 15 L 56, 15 L 52, 18 L -62, 18 Z" fill="#f59e0b" />

          {/* ── Rooftop HVAC Aerodynamic Pod ── */}
          <rect x="-36" y="-19" width="72" height="10" rx="3.5" fill="#0f2b52" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="-34" y="-18" width="68" height="2.5" rx="1" fill="#38bdf8" />

          {/* ── Brand Livery Typography on Side ── */}
          <text
            x="-5"
            y="11.5"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="8"
            fontWeight="900"
            letterSpacing="1"
            fontFamily="sans-serif"
          >
            GURU TRANSLINES
          </text>

          {/* ── Panoramic Front Windshield ── */}
          <path
            d="M 45, -19 L 62, -14 L 62, 14 L 45, 19 Z"
            fill="#0284c7"
            stroke="#38bdf8"
            strokeWidth="1.2"
          />

          {/* ── Passenger Tinted Windows ── */}
          {[-52, -31, -10, 11, 30].map((wx, i) => (
            <rect
              key={i}
              x={wx}
              y="-19"
              width="16"
              height="9.5"
              rx="2"
              fill="#0369a1"
              stroke="#38bdf8"
              strokeWidth="0.7"
            />
          ))}

          {/* ── Dual Projector LED Headlights ── */}
          <circle cx="65" cy="-14" r="3" fill="#ffffff" />
          <circle cx="65" cy="-14" r="4.5" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="65" cy="14" r="3" fill="#ffffff" />
          <circle cx="65" cy="14" r="4.5" fill="none" stroke="#38bdf8" strokeWidth="1.5" />

          {/* ── Rear Ruby LED Taillights ── */}
          <rect x="-69" y="-17" width="3" height="8" rx="1" fill="#ef4444" />
          <rect x="-69" y="9" width="3" height="8" rx="1" fill="#ef4444" />

          {/* ── Alloy Wheel Profiles ── */}
          {[
            [-45, -25.5],
            [28, -25.5],
            [-45, 21],
            [28, 21],
          ].map(([wx, wy], i) => (
            <g key={i} transform={`translate(${wx}, ${wy})`}>
              <rect x="0" y="0" width="20" height="4.5" rx="2" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
              <circle cx="10" cy="2.2" r="1.2" fill="#ffffff" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
