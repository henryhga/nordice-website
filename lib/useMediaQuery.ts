"use client";

import { useSyncExternalStore } from "react";

// useSyncExternalStore evita el warning de "setState en un efecto" que
// dispara leer matchMedia dentro de un useEffect con setState propio —
// es el patrón idiomático de React para suscribirse a estado externo del
// navegador. getServerSnapshot devuelve `false` (el valor menos animado /
// más angosto) como default seguro para SSR.
function subscribe(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

export function useIsTouchDevice(): boolean {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}
