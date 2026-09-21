import type { NextConfig } from "next";

// Cabeceras de seguridad estándar — el sitio no tiene backend propio
// (API routes) ni scripts de terceros, así que estas son las protecciones
// de bajo riesgo/alto valor: sin ellas cualquier navegador acepta los
// defaults inseguros (permitir iframes de terceros, adivinar Content-Type,
// filtrar la URL completa como referrer, etc.).
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Evita anunciar el framework en cada respuesta — no es un agujero de
  // seguridad por sí solo, pero es una pista gratis para quien esté
  // reconociendo el sitio antes de buscar vulnerabilidades conocidas.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
