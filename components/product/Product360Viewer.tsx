"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useDialogBehavior } from "@/lib/useDialogBehavior";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

export interface Product360Item {
  name: string;
  spec: string;
  /**
   * Fotogramas desde distintos ángulos, en orden de giro. Hoy cada
   * producto solo tiene UNA fotografía de estudio (`frames.length === 1`),
   * así que este visor cae automáticamente en un acercamiento suave en
   * vez de simular un giro que no existe. Para el giro 360° real, sustituir
   * por 24–36 fotogramas (o un modelo 3D) por producto — ver resumen final.
   */
  frames: string[];
}

interface Product360ViewerProps {
  item: Product360Item | null;
  onClose: () => void;
}

const DRAG_PX_PER_FRAME = 8;

export function Product360Viewer({ item, onClose }: Product360ViewerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = item !== null;
  useDialogBehavior(isOpen, onClose, closeRef);

  return (
    <AnimatePresence>
      {isOpen && item && <ViewerPanel item={item} onClose={onClose} closeRef={closeRef} />}
    </AnimatePresence>
  );
}

function ViewerPanel({
  item,
  onClose,
  closeRef,
}: {
  item: Product360Item;
  onClose: () => void;
  closeRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const hasRealSequence = item.frames.length > 1;
  const [frameIndex, setFrameIndex] = useState(0);
  const dragState = useRef<{ startX: number; startIndex: number } | null>(null);

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (!hasRealSequence) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, startIndex: frameIndex };
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!hasRealSequence || !dragState.current) return;
    const deltaX = e.clientX - dragState.current.startX;
    const framesMoved = Math.trunc(deltaX / DRAG_PX_PER_FRAME);
    const next = ((dragState.current.startIndex + framesMoved) % item.frames.length + item.frames.length) % item.frames.length;
    if (next !== frameIndex) setFrameIndex(next);
  }

  function handlePointerUp() {
    dragState.current = null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-ink-deep/85 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-360-title"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex w-full max-w-md flex-col items-center border border-platinum/15 bg-ink-deep p-8 sm:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute right-6 top-6 text-platinum-dim transition-colors duration-500 hover:text-ice"
        >
          ✕
        </button>

        <h2 id="product-360-title" className="self-start font-serif text-2xl font-normal text-ice">
          {item.name}
        </h2>
        <p className="self-start mt-1 text-xs uppercase tracking-[0.2em] text-platinum-dim">{item.spec}</p>

        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`relative mt-8 aspect-square w-full max-w-xs touch-none select-none ${
            hasRealSequence ? "cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          {hasRealSequence ? (
            <Image
              src={item.frames[frameIndex]}
              alt={`${item.name} — ángulo ${frameIndex + 1} de ${item.frames.length}`}
              fill
              sizes="24rem"
              className="object-contain"
              draggable={false}
            />
          ) : (
            <motion.div
              className="absolute inset-0"
              animate={reduceMotion ? undefined : { scale: [1, 1.1, 1] }}
              transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={item.frames[0]}
                alt={`${item.name}, acercamiento`}
                fill
                sizes="24rem"
                className="object-contain"
                draggable={false}
              />
            </motion.div>
          )}
        </div>

        {hasRealSequence ? (
          <p className="mt-6 text-center text-[11px] uppercase tracking-[0.2em] text-platinum-dim">
            Arrastra para girar
          </p>
        ) : (
          <p className="mt-6 max-w-xs text-center text-xs text-platinum-dim">
            Vista previa en acercamiento. El giro 360° real está pendiente de una secuencia fotográfica
            multiángulo (o modelo 3D) de esta pieza.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
