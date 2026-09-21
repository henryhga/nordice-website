"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ComingSoonDialog } from "./ComingSoonDialog";

interface ComingSoonContextValue {
  open: () => void;
  close: () => void;
}

const ComingSoonContext = createContext<ComingSoonContextValue | null>(null);

// Reemplaza el flujo de "solicitar muestra": Northice todavía no lanzó,
// así que cualquier CTA que antes abría el formulario de muestra ahora
// abre este anuncio de lanzamiento en su lugar.
export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ComingSoonContext.Provider value={value}>
      {children}
      <ComingSoonDialog isOpen={isOpen} onClose={close} />
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const ctx = useContext(ComingSoonContext);
  if (!ctx) throw new Error("useComingSoon debe usarse dentro de ComingSoonProvider");
  return ctx;
}
