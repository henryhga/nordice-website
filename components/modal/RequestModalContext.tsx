"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { RequestModalDialog } from "./RequestModalDialog";

interface RequestModalState {
  isOpen: boolean;
  product?: string;
  key: number;
}

interface RequestModalContextValue {
  openAvailability: (product?: string) => void;
  close: () => void;
}

const RequestModalContext = createContext<RequestModalContextValue | null>(null);

// Un solo modal de disponibilidad compartido por todo el sitio (fichas de
// producto, sección de productos) en vez de un formulario por sección —
// evita duplicar la lógica de envío y mantiene el mismo diseño accesible
// en todos lados. El flujo de "solicitar muestra" se retiró mientras la
// marca está en modo "coming soon" — ver ComingSoonContext.
export function RequestModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RequestModalState>({ isOpen: false, key: 0 });

  const openAvailability = useCallback((product?: string) => {
    setState((s) => ({ isOpen: true, product, key: s.key + 1 }));
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  const value = useMemo(() => ({ openAvailability, close }), [openAvailability, close]);

  return (
    <RequestModalContext.Provider value={value}>
      {children}
      <RequestModalDialog key={state.key} isOpen={state.isOpen} product={state.product} onClose={close} />
    </RequestModalContext.Provider>
  );
}

export function useRequestModal() {
  const ctx = useContext(RequestModalContext);
  if (!ctx) throw new Error("useRequestModal debe usarse dentro de RequestModalProvider");
  return ctx;
}
