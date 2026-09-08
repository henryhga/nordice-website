"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { RequestModalDialog } from "./RequestModalDialog";

export type RequestModalMode = "sample" | "availability";

interface RequestModalState {
  isOpen: boolean;
  mode: RequestModalMode;
  product?: string;
  key: number;
}

interface RequestModalContextValue {
  openSample: (product?: string) => void;
  openAvailability: (product?: string) => void;
  close: () => void;
}

const RequestModalContext = createContext<RequestModalContextValue | null>(null);

// Un solo modal compartido por todo el sitio (header, experiencia,
// productos) en vez de un formulario por sección — evita duplicar la
// lógica de envío y mantiene el mismo diseño accesible en todos lados.
export function RequestModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RequestModalState>({ isOpen: false, mode: "sample", key: 0 });

  const openSample = useCallback((product?: string) => {
    setState((s) => ({ isOpen: true, mode: "sample", product, key: s.key + 1 }));
  }, []);

  const openAvailability = useCallback((product?: string) => {
    setState((s) => ({ isOpen: true, mode: "availability", product, key: s.key + 1 }));
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  const value = useMemo(() => ({ openSample, openAvailability, close }), [openSample, openAvailability, close]);

  return (
    <RequestModalContext.Provider value={value}>
      {children}
      <RequestModalDialog
        key={state.key}
        isOpen={state.isOpen}
        mode={state.mode}
        product={state.product}
        onClose={close}
      />
    </RequestModalContext.Provider>
  );
}

export function useRequestModal() {
  const ctx = useContext(RequestModalContext);
  if (!ctx) throw new Error("useRequestModal debe usarse dentro de RequestModalProvider");
  return ctx;
}
