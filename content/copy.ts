// Northice brand copy. Centralized here so the storytelling can iterate
// without touching the components in /sections.

export const site = {
  name: "Northice",
  domain: "northice.com",
  description:
    "Artisan clear ice for craft cocktails, high-end hospitality and private collections. Born from a story of Northern purity and time, distributed from Miami.",
};

export const hero = {
  brandName: "Northice",
  sub: "Ice born from the purity of the North.",
  subtext: "Clear ice for craft cocktails",
  cta: "Discover our process",
  ctaHref: "#process",
  scrollHint: "Scroll to discover",
  scrollHintHref: "#essence",
};

export const nav = {
  items: [
    { label: "Essence", href: "#essence" },
    { label: "Process", href: "#process" },
    { label: "Experience", href: "#experience" },
    { label: "Products", href: "#products" },
  ],
  cta: "Coming Soon",
} as const;

// Northice hasn't launched yet — this message replaces any CTA that used
// to ask for a sample request. The final button opens WhatsApp with a
// "join the list" message, same as the rest of the site's forms (no
// email/CRM backend configured yet).
export const comingSoon = {
  eyebrow: "Coming soon",
  headline: "Great cocktails begin with great ice.",
  body: "Ice shapes a cocktail's temperature, dilution and balance. At Northice, we give this essential ingredient the attention it deserves.",
  origin: "Born from the purity of the North. Coming to Miami.",
  timeline: "Launching late 2026.",
  invite:
    "Be part of our story from the beginning. Join our list for launch updates and be the first to know when orders open.",
  cta: "Be part of Northice",
} as const;

export const essence = {
  kicker: "Our essence",
  title: ["Purity is visible.", "The difference is felt."],
  body: "Inspired by the purity of the North, we shape ice to elevate every creation.",
  values: ["Purity", "Precision", "Elegance"],
  image: "/illustrations/product-cubo2x2.png",
} as const;

export const process = {
  kicker: "Our process",
  title: "Detail makes the difference.",
  body: "Controlled freezing, precise cutting and care in every piece.",
  steps: [
    {
      name: "Freezing",
      description: "Controlled freezing for a clear, transparent block of ice.",
      image: "/illustrations/process-congelacion.png",
    },
    {
      name: "Cutting",
      description: "Separating the block into precise pieces.",
      image: "/illustrations/process-pureza.png",
    },
    {
      name: "Finishing",
      description: "Presenting the finished shapes.",
      image: "/illustrations/process-resultado.png",
    },
  ],
} as const;

export const experience = {
  kicker: "The Northice experience",
  title: ["Ice also", "defines the moment."],
  intro: "An impeccable presence for bars, restaurants and special occasions.",
  categories: ["For your business", "For your occasion"],
  cta: "Coming Soon",
} as const;

export const product = {
  kicker: "The collection",
  title: "Our products",
  subtitle: "Four shapes. One essence.",
  cta: "Check availability",
  sheetCta: "Product availability",
  view360: "View",
  items: [
    {
      id: "collins",
      name: "Collins",
      spec: "4 × 1.25\"",
      description: "Elongated elegance for refined, sophisticated cocktails.",
      image: "/illustrations/product-collins.png",
      // High-resolution studio photo (1254×1254, clean dark background,
      // no baked-in text) — used by the detail viewer. It's a single
      // photograph per product, not a real multi-angle sequence; see the
      // note in Product360Viewer.
      photo: "/products/collins.png",
    },
    {
      id: "cubo-2x2",
      name: "Cube",
      spec: "2 × 2\"",
      description: "The perfect classic for a balanced experience.",
      image: "/illustrations/product-cubo2x2.png",
      photo: "/products/cubo.png",
    },
    {
      id: "esfera",
      name: "Sphere",
      spec: "Ø 2\"",
      description: "Crystalline spheres that bring distinction and style.",
      image: "/illustrations/product-esfera.png",
      photo: "/products/esfera.png",
    },
    {
      id: "cubo-2x1.75",
      name: "Cube",
      spec: "2 × 1.75\"",
      description: "Versatility and clarity for every creation.",
      image: "/illustrations/product-cubo2x175.png",
      // Provisional asset: there's no dedicated studio photo for this
      // format yet — reuses the 2×2 cube's photo until the 2×1.75 is
      // shot separately.
      photo: "/products/cubo.png",
    },
  ],
} as const;

// Real contact data — do not invent. Fields with value: null are pending
// business confirmation; they render as "—".
export const contact = {
  whatsapp: { label: "WhatsApp", value: "+1 305 498 8610", href: "https://wa.me/13054988610" },
  phone: { label: "Phone", value: "+1 305 498 8610", href: "tel:+13054988610" },
  email: { label: "Email", value: null as string | null, href: null as string | null },
  location: { label: "Location", value: "Miami, FL" },
};
