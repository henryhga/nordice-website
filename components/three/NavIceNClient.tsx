"use client";

import dynamic from "next/dynamic";

// `ssr: false` solo se permite dentro de un Client Component — este
// wrapper existe únicamente para que Header.tsx (Server Component) pueda
// importarlo sin infringir esa regla.
const NavIceN = dynamic(() => import("./NavIceN").then((m) => m.NavIceN), {
  ssr: false,
});

export { NavIceN };
