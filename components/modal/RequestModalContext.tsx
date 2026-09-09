"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { RequestModalDialog } from "./RequestModalDialog";
import {
  addSampleProduct,
  getSampleSelectionServerSnapshot,
  getSampleSelectionSnapshot,
  removeSampleProduct,
  subscribeSampleSelection,
  toggleSampleProduct,
} from "@/lib/sampleSelectionStore";

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
  sampleSelection: string[];
  toggleSampleProduct: (product: string) => void;
  removeSampleProduct: (product: string) => void;
}

const RequestModalContext = createContext<RequestModalContextValue | null>(null);

// Un solo modal compartido por todo el sitio (header, experiencia,
// productos) en vez de un formulario por sección — evita duplicar la
// lógica de envío y mantiene el mismo diseño accesible en todos lados.
// La selección de productos para "muestra" vive en un store aparte
// (lib/sampleSelectionStore) para que sobreviva a cerrar y reabrir el
// modal, o a navegar por la página, tal como pide el brief.
export function RequestModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RequestModalState>({ isOpen: false, mode: "sample", key: 0 });
  const sampleSelection = useSyncExternalStore(
    subscribeSampleSelection,
    getSampleSelectionSnapshot,
    getSampleSelectionServerSnapshot,
  );

  const openSample = useCallback((product?: string) => {
    if (product) addSampleProduct(product);
    setState((s) => ({ isOpen: true, mode: "sample", key: s.key + 1 }));
  }, []);

  const openAvailability = useCallback((product?: string) => {
    setState((s) => ({ isOpen: true, mode: "availability", product, key: s.key + 1 }));
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  const value = useMemo(
    () => ({
      openSample,
      openAvailability,
      close,
      sampleSelection,
      toggleSampleProduct,
      removeSampleProduct,
    }),
    [openSample, openAvailability, close, sampleSelection],
  );

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
