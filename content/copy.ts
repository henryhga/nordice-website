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
    { label: "Inicio", href: "#inicio" },
    { label: "Esencia", href: "#esencia" },
    { label: "Proceso", href: "#proceso" },
    { label: "Productos", href: "#producto" },
    { label: "Contacto", href: "#contacto" },
  ],
  cta: "Hacer pedido",
};

export const essence = {
  title: "Nuestra esencia",
  items: [
    {
      name: "Pureza",
      description: "Nacido en las aguas más puras del norte, libre de impurezas.",
      image: "/illustrations/essence-pureza.png",
    },
    {
      name: "Claridad",
      description: "Transparencia excepcional que realza cada detalle de tu bebida.",
      image: "/illustrations/essence-claridad.png",
    },
    {
      name: "Artesanía",
      description: "Elaborado con precisión y dedicación en cada pieza de hielo.",
      image: "/illustrations/essence-artesania.png",
    },
    {
      name: "Experiencia",
      description: "Diseñado para elevar momentos y crear recuerdos inolvidables.",
      image: "/illustrations/essence-experiencia.png",
    },
  ],
} as const;

export const process = {
  title: "Nuestro proceso",
  steps: [
    {
      name: "Origen",
      description: "Aguas cristalinas de glaciares remotos del norte.",
      image: "/illustrations/process-origen.png",
    },
    {
      name: "Pureza",
      description: "Filtración natural para una pureza incomparable.",
      image: "/illustrations/process-pureza.png",
    },
    {
      name: "Congelación lenta",
      description: "Congelación controlada que elimina impurezas y burbujas.",
      image: "/illustrations/process-congelacion.png",
    },
    {
      name: "Resultado",
      description: "Hielo cristalino que transforma cada experiencia.",
      image: "/illustrations/process-resultado.png",
    },
  ],
} as const;

export const experience = {
  title: "Eleva cada experiencia",
  intro: "Para quienes entienden que los detalles hacen la diferencia.",
  categories: [
    { name: "Bars", image: "/illustrations/experience-bars.png" },
    { name: "Restaurantes", image: "/illustrations/experience-restaurantes.png" },
    { name: "Hoteles", image: "/illustrations/experience-hoteles.png" },
    { name: "Eventos", image: "/illustrations/experience-eventos.png" },
  ],
  cta: "Solicita información",
} as const;

export const product = {
  title: "Nuestros productos",
  items: [
    {
      id: "collins",
      name: "Collins",
      spec: "4 × 1.25",
      description: "Elegancia alargada para cócteles refinados y sofisticados.",
      image: "/illustrations/product-collins.png",
    },
    {
      id: "cubo-2x2",
      name: "Cubos",
      spec: "2 × 2",
      description: "El clásico perfecto para una experiencia equilibrada.",
      image: "/illustrations/product-cubo2x2.png",
    },
    {
      id: "esfera",
      name: "Esferas",
      // Spec real confirmada por el cliente (1.75") — la referencia visual
      // trae 2", que era un dato de plantilla, no el real.
      spec: "Ø 1.75\"",
      description: "Esferas cristalinas que aportan distinción y estilo.",
      image: "/illustrations/product-esfera.png",
    },
    {
      id: "cubo-2x1.75",
      name: "Cubos",
      spec: "2 × 1.75",
      description: "Versatilidad y claridad para cada creación.",
      image: "/illustrations/product-cubo2x175.png",
    },
  ],
} as const;

// Datos de contacto reales — no inventar. Los campos con value: null están
// pendientes de que el negocio los confirme; se muestran como "—".
export const contact = {
  kicker: "Contacto",
  title: "Solicitud de acceso",
  intro:
    "Bares de autor, hoteles boutique, colecciones privadas y eventos. Cuéntanos qué necesitas.",
  whatsapp: { label: "WhatsApp", value: "+1 305 498 8610", href: "https://wa.me/13054988610" },
  phone: { label: "Teléfono", value: "+1 305 498 8610", href: "tel:+13054988610" },
  email: { label: "Email", value: null as string | null, href: null as string | null },
  location: { label: "Ubicación", value: "Miami, FL" },
};
