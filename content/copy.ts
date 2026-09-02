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
  cta: "Solicitar acceso",
  scrollHint: "Descubrir el origen",
};

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
