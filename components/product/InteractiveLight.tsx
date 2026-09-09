"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

interface InteractiveLightProps {
  children: ReactNode;
  className?: string;
}

// Reflejo tenue que sigue al cursor sobre el área visual del producto,
// suavizado con useSpring (interpolación, no salto directo al valor del
// puntero) y mezclado en modo "screen" para que combine con la foto sin
// taparla. Vive en su propio contenedor `overflow-hidden` separado del
// texto de abajo, así que nunca puede iluminar contenido fuera de la
// imagen. Todo el movimiento pasa por motion values (sin setState), por
// lo que un pointermove no dispara un re-render de React por fotograma.
export function InteractiveLight({ children, className }: InteractiveLightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const x = useMotionValue(50);
  const y = useMotionValue(38);
  const intensity = useMotionValue(0.45);

  const spring = { stiffness: 90, damping: 22, mass: 0.6 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);
  const springIntensity = useSpring(intensity, spring);

  const background = useTransform([springX, springY, springIntensity], (values) => {
    const [sx, sy, si] = values as number[];
    return `radial-gradient(circle at ${sx}% ${sy}%, rgba(217,177,106,${0.18 * si}) 0%, rgba(175,198,214,${0.14 * si}) 34%, transparent 66%)`;
  });

  function positionFromEvent(e: PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType === "touch") return;
    const pos = positionFromEvent(e);
    if (!pos) return;
    x.set(pos.x);
    y.set(pos.y);
    intensity.set(1);
  }

  function handlePointerLeave() {
    x.set(50);
    y.set(38);
    intensity.set(0.45);
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== "touch") return;
    const pos = positionFromEvent(e);
    if (!pos) return;
    x.set(pos.x);
    y.set(pos.y);
    intensity.set(1);
    window.setTimeout(() => intensity.set(0.45), 750);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      {children}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background, mixBlendMode: "screen" }}
        />
      )}
    </div>
  );
}
