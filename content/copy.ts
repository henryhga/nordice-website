// Copy narrativo de Nordice. Centralizado aquí para poder iterar el
// storytelling sin tocar los componentes de /sections.

export const site = {
  name: "Nordice",
  domain: "nordice.com",
  description:
    "Clear ice de autor para coctelería de autor, hospitality de alto nivel y colecciones privadas. Nacido de una historia de pureza y tiempo del norte, distribuido desde Miami.",
};

export const hero = {
  brandName: "Nordice",
  sub: "Hielo nacido de la pureza del norte.",
  subtext: "Hielo transparente para coctelería",
  cta: "Descubre nuestro proceso",
  ctaHref: "#proceso",
  scrollHint: "Desliza para descubrir",
  scrollHintHref: "#esencia",
};

export const nav = {
  items: [
    { label: "Esencia", href: "#esencia" },
    { label: "Proceso", href: "#proceso" },
    { label: "Experiencia", href: "#experiencia" },
    { label: "Productos", href: "#producto" },
  ],
  cta: "Solicitar muestra",
} as const;

export const essence = {
  kicker: "Nuestra esencia",
  title: ["La pureza se ve.", "La diferencia se siente."],
  body: "Inspirados en la pureza del norte, damos forma al hielo para elevar cada creación.",
  values: ["Pureza", "Precisión", "Elegancia"],
  image: "/illustrations/product-cubo2x2.png",
} as const;

export const process = {
  kicker: "Nuestro proceso",
  title: "El detalle hace la diferencia.",
  body: "Congelación controlada, corte preciso y cuidado en cada pieza.",
  steps: [
    {
      name: "Congelación",
      description: "Congelación controlada para un bloque de hielo transparente.",
      image: "/illustrations/process-congelacion.png",
    },
    {
      name: "Corte",
      description: "Separación del bloque en piezas precisas.",
      image: "/illustrations/process-pureza.png",
    },
    {
      name: "Acabado",
      description: "Presentación de las formas terminadas.",
      image: "/illustrations/process-resultado.png",
    },
  ],
} as const;

export const experience = {
  kicker: "La experiencia Nordice",
  title: ["El hielo también", "define el momento."],
  intro: "Una presencia impecable para bares, restaurantes y momentos especiales.",
  categories: ["Para tu negocio", "Para tu ocasión"],
  cta: "Solicitar muestra",
} as const;

export const product = {
  kicker: "La colección",
  title: "Nuestros productos",
  subtitle: "Cuatro formas. Una misma esencia.",
  cta: "Consultar disponibilidad",
  items: [
    {
      id: "collins",
      name: "Collins",
      spec: "4 × 1.25\"",
      description: "Elegancia alargada para cócteles refinados y sofisticados.",
      image: "/illustrations/product-collins.png",
    },
    {
      id: "cubo-2x2",
      name: "Cubo",
      spec: "2 × 2\"",
      description: "El clásico perfecto para una experiencia equilibrada.",
      image: "/illustrations/product-cubo2x2.png",
    },
    {
      id: "esfera",
      name: "Esfera",
      spec: "Ø 2\"",
      description: "Esferas cristalinas que aportan distinción y estilo.",
      image: "/illustrations/product-esfera.png",
    },
    {
      id: "cubo-2x1.75",
      name: "Cubo",
      spec: "2 × 1.75\"",
      description: "Versatilidad y claridad para cada creación.",
      image: "/illustrations/product-cubo2x175.png",
    },
  ],
} as const;

// Datos de contacto reales — no inventar. Los campos con value: null están
// pendientes de que el negocio los confirme; se muestran como "—".
export const contact = {
  whatsapp: { label: "WhatsApp", value: "+1 305 498 8610", href: "https://wa.me/13054988610" },
  phone: { label: "Teléfono", value: "+1 305 498 8610", href: "tel:+13054988610" },
  email: { label: "Email", value: null as string | null, href: null as string | null },
  location: { label: "Ubicación", value: "Miami, FL" },
};
