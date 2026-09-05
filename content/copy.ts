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
  cta: "Descubre nuestro proceso",
  ctaHref: "#proceso",
  scrollHint: "Descubrir el origen",
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

export const origin = {
  kicker: "El origen",
};

export const essence = {
  title: "Nuestra esencia",
  items: [
    {
      name: "Pureza",
      description: "Nacido en las aguas más puras del norte, libre de impurezas.",
      icon: "mountain",
    },
    {
      name: "Claridad",
      description: "Transparencia excepcional que realza cada detalle de tu bebida.",
      icon: "cube",
    },
    {
      name: "Artesanía",
      description: "Elaborado con precisión y dedicación en cada pieza de hielo.",
      icon: "craft",
    },
    {
      name: "Experiencia",
      description: "Diseñado para elevar momentos y crear recuerdos inolvidables.",
      icon: "glass",
    },
  ],
} as const;

export const process = {
  title: "Nuestro proceso",
  steps: [
    {
      name: "Origen",
      description: "Aguas cristalinas de glaciares remotos del norte.",
      icon: "mountain",
    },
    {
      name: "Pureza",
      description: "Filtración natural para una pureza incomparable.",
      icon: "waterfall",
    },
    {
      name: "Congelación lenta",
      description: "Congelación controlada que elimina impurezas y burbujas.",
      icon: "iceberg",
    },
    {
      name: "Resultado",
      description: "Hielo cristalino que transforma cada experiencia.",
      icon: "glass",
    },
  ],
} as const;

export const experience = {
  title: "Eleva cada experiencia",
  intro: "Para quienes entienden que los detalles hacen la diferencia.",
  categories: [
    { name: "Bars", icon: "martini" },
    { name: "Restaurantes", icon: "cutlery" },
    { name: "Hoteles", icon: "bell" },
    { name: "Eventos", icon: "toast" },
  ],
  cta: "Solicita información",
} as const;

export const product = {
  kicker: "El producto",
  title: "Formatos",
  intro: "Tres formas. La misma pureza en cada una.",
  items: [
    {
      name: "Cubo",
      spec: "2\" × 2\"",
      image: "/products/cubo.png",
    },
    {
      name: "Esfera",
      spec: "Ø 1.75\"",
      image: "/products/esfera.png",
    },
    {
      name: "Collins",
      spec: "4\" × 1.25\"",
      image: "/products/collins.png",
    },
  ],
};

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
