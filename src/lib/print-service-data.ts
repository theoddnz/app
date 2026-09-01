export type PrinterMaterial = "PLA" | "PETG" | "ABS" | "TPU" | "Resin" | "Nylon";

export type PrinterProvider = {
  id: string;
  name: string;
  owner: string;
  blurb: string;
  materials: PrinterMaterial[];
  pricePerGram: number;
  rating: number;
  reviews: number;
  turnaround: string;
  phone: string;
  online: boolean;
  // Position is stored as an offset from the map center so the dummy owners
  // appear near the user once their real location is enabled.
  offsetLat: number;
  offsetLng: number;
};

// Fallback center used before the user shares their location (Hyderabad, IN).
export const DEFAULT_CENTER: [number, number] = [17.385, 78.4867];

export const PRINTER_PROVIDERS: PrinterProvider[] = [
  {
    id: "maker-loft",
    name: "Maker Loft",
    owner: "Aditya R.",
    blurb: "High-detail FDM prints with a Bambu Lab P1S. Great for functional parts.",
    materials: ["PLA", "PETG", "TPU"],
    pricePerGram: 3.5,
    rating: 4.9,
    reviews: 128,
    turnaround: "1-2 days",
    phone: "+91 90000 11111",
    online: true,
    offsetLat: 0.012,
    offsetLng: 0.009,
  },
  {
    id: "resin-studio",
    name: "Resin Studio",
    owner: "Meera K.",
    blurb: "8K resin prints for miniatures, jewelry masters, and dental models.",
    materials: ["Resin"],
    pricePerGram: 6.0,
    rating: 4.8,
    reviews: 94,
    turnaround: "2-3 days",
    phone: "+91 90000 22222",
    online: true,
    offsetLat: -0.008,
    offsetLng: 0.014,
  },
  {
    id: "proto-garage",
    name: "Proto Garage",
    owner: "Vikram S.",
    blurb: "Engineering-grade ABS and Nylon on a Prusa MK4. Batch runs welcome.",
    materials: ["ABS", "Nylon", "PETG"],
    pricePerGram: 4.2,
    rating: 4.7,
    reviews: 76,
    turnaround: "2-4 days",
    phone: "+91 90000 33333",
    online: false,
    offsetLat: 0.006,
    offsetLng: -0.013,
  },
  {
    id: "campus-printshop",
    name: "Campus PrintShop",
    owner: "Neha T.",
    blurb: "Budget PLA prints for students and hobby projects. Fast pickups.",
    materials: ["PLA", "PETG"],
    pricePerGram: 2.8,
    rating: 4.6,
    reviews: 210,
    turnaround: "Same day",
    phone: "+91 90000 44444",
    online: true,
    offsetLat: -0.015,
    offsetLng: -0.006,
  },
  {
    id: "flex-forge",
    name: "Flex Forge",
    owner: "Rahul D.",
    blurb: "TPU and flexible parts, gaskets, phone mounts, and custom grips.",
    materials: ["TPU", "PLA"],
    pricePerGram: 4.8,
    rating: 4.5,
    reviews: 52,
    turnaround: "2-3 days",
    phone: "+91 90000 55555",
    online: true,
    offsetLat: 0.018,
    offsetLng: -0.004,
  },
  {
    id: "precision-lab",
    name: "Precision Lab",
    owner: "Sara M.",
    blurb: "Tight-tolerance functional prototypes with post-processing and finishing.",
    materials: ["PETG", "ABS", "Nylon", "Resin"],
    pricePerGram: 5.5,
    rating: 4.9,
    reviews: 88,
    turnaround: "3-5 days",
    phone: "+91 90000 66666",
    online: false,
    offsetLat: -0.004,
    offsetLng: -0.017,
  },
];

export const ALL_MATERIALS: PrinterMaterial[] = [
  "PLA",
  "PETG",
  "ABS",
  "TPU",
  "Resin",
  "Nylon",
];

// Rough km distance between two lat/lng points (Haversine).
export function distanceKm(a: [number, number], b: [number, number]): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return earthRadiusKm * 2 * Math.asin(Math.sqrt(h));
}
