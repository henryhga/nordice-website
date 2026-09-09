"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { product } from "@/content/copy";
import { useDialogBehavior } from "@/lib/useDialogBehavior";
import { useIsMobile } from "@/lib/useMediaQuery";

export interface ProductSheetItem {
  name: string;
  spec: string;
}

interface ProductSheetProps {
  item: ProductSheetItem | null;
  onClose: () => void;
  onCheckAvailability: (product: string) => void;
}

// La "ficha" del producto: solo nombre, medidas y el botón de
// disponibilidad — sin fotos ni usos sugeridos (eso vive en la sección,
// no en la ficha). Modal centrado en escritorio, panel que sube desde
// abajo en móvil; mismo componente, solo cambian las variantes de
// entrada/salida según el ancho de pantalla.
export function ProductSheet({ item, onClose, onCheckAvailability }: ProductSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();
  const isOpen = item !== null;

  useDialogBehavior(isOpen, onClose, closeRef);

  const panelVariants = isMobile
    ? {
        hidden: { opacity: 1, y: "100%" },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
        exit: { opacity: 1, y: "100%", transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] as const } },
      }
    : {
        hidden: { opacity: 0, y: 16, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
        exit: { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.3 } },
      };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute inset-0 bg-ink-deep/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-sheet-title"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            className="relative w-full max-w-sm border border-platinum/15 bg-ink-deep p-8 pb-10 sm:rounded-none sm:p-10 rounded-t-2xl"
          >
            <span className="mx-auto mb-6 block h-1 w-10 rounded-full bg-platinum/20 sm:hidden" aria-hidden="true" />

            <button
              ref={closeRef}
              type="button"
              aria-label="Cerrar"
              onClick={onClose}
              className="absolute right-6 top-6 text-platinum-dim transition-colors duration-500 hover:text-ice"
            >
              ✕
            </button>

            <h2 id="product-sheet-title" className="font-serif text-3xl font-normal text-ice">
              {item.name}
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-platinum-dim">{item.spec}</p>

            <button
              type="button"
              onClick={() => onCheckAvailability(`${item.name} ${item.spec}`)}
              className="mt-10 inline-flex w-full items-center justify-center gap-3 border border-platinum/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/5"
            >
              {product.sheetCta}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
