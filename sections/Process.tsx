"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { process } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

// Fondo real recortado de la referencia del cliente (ver
// public/photography/process-scene.jpg): cielo/montaña + piso con los 3
// grupos de hielo. El recorte termina justo antes de la fila de
// números/etiquetas horneada del mockup — esa fila se reconstruye abajo
// como texto real, no como parte de la imagen. En desktop el título se
// superpone a la imagen (igual que en la referencia) con un degradado
// superior opaco que tapa el texto horneado del mockup en esa misma
// zona; en mobile el título pasa a flujo normal ARRIBA de la imagen (la
// franja panorámica se vuelve demasiado baja a ese ancho para contener
// texto superpuesto sin chocar con el header).
function Kicker() {
  return (
    <motion.span
      variants={fadeUp}
      className="block text-xs font-medium uppercase tracking-[0.3em] text-platinum"
    >
      {process.kicker}
    </motion.span>
  );
}

function Headline({ size }: { size: "mobile" | "desktop" }) {
  return (
    <motion.h2
      variants={fadeUp}
      className={
        size === "mobile"
          ? "mt-4 font-serif text-3xl font-normal text-ice"
          : "mt-4 font-serif text-4xl font-normal text-ice sm:text-6xl lg:text-7xl"
      }
    >
      {process.title}
    </motion.h2>
  );
}

function Body({ size }: { size: "mobile" | "desktop" }) {
  return (
    <motion.p
      variants={fadeUp}
      className={size === "mobile" ? "mt-4 text-sm text-platinum-dim" : "mt-4 max-w-lg text-sm text-platinum-dim md:text-base"}
    >
      {process.body}
    </motion.p>
  );
}

// Cada etapa (congelación → corte → acabado) se revela atada al progreso
// de scroll de la fila completa, no a un trigger de "una vez visible":
// subir o bajar recorre las mismas posiciones de forma continua. Con
// preferencia de movimiento reducido, el paso queda simplemente visible
// (sin animación) — el hook sigue llamándose siempre para no romper las
// reglas de hooks, solo se ignora su salida.
function ProcessStep({
  step,
  index,
  total,
  scrollYProgress,
  reduceMotion,
}: {
  step: (typeof process.steps)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  // Con movimiento reducido, el rango de salida colapsa a un valor
  // constante (siempre visible) en vez de alternar el prop `style` entre
  // un objeto de motion values y `undefined`: framer-motion escribe
  // estilos directamente en el DOM por fuera del diffing normal de
  // React, así que ese `undefined` no limpiaba el opacity/transform que
  // había quedado aplicado — el paso se quedaba invisible.
  const opacity = useTransform(scrollYProgress, [start, end], reduceMotion ? [1, 1] : [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], reduceMotion ? [0, 0] : [16, 0]);

  return (
    <motion.div style={{ opacity, y }} className="flex items-baseline gap-4">
      <span className="font-serif text-3xl font-normal text-ice">0{index + 1}</span>
      <span className="h-px flex-1 max-w-16 bg-platinum/30" />
      <span className="flex flex-col">
        <span className="text-sm uppercase tracking-[0.15em] text-ice">{step.name}</span>
        <span className="mt-1 text-sm text-platinum-dim">{step.description}</span>
      </span>
    </motion.div>
  );
}

export function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.85", "end 0.55"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0, 1]);

  return (
    <section id="proceso" aria-label="Nuestro proceso" className="bg-ink-deep">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={stagger()}
        className="px-6 pt-20 sm:hidden"
      >
        <Kicker />
        <Headline size="mobile" />
        <Body size="mobile" />
      </motion.div>

      <div className="relative aspect-[1672/685] w-full overflow-hidden">
        <Image
          src="/photography/process-scene.jpg"
          alt="Tres etapas del proceso Nordice: congelación, corte y acabado."
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Opaco por completo hasta el ~36% (cubre el título horneado del
            mockup sin dejarlo transparentar) y recién ahí se desvanece —
            un via-stop con opacidad parcial dejaba el texto horneado
            fantasma detrás del texto real. En mobile no hay texto real
            superpuesto, así que esto solo actúa como viñeta. */}
        <div
          className="absolute inset-x-0 top-0 h-[52%]"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-ink-deep) 0%, var(--color-ink-deep) 68%, transparent 100%)",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={stagger()}
          className="absolute inset-x-0 top-0 hidden px-6 pt-[10%] sm:block sm:px-10 lg:px-24"
        >
          <Kicker />
          <Headline size="desktop" />
          <Body size="desktop" />
        </motion.div>
      </div>

      <div ref={stepsRef} className="relative px-6 py-12 sm:px-10 md:py-16 lg:px-24">
        {/* Línea que conecta las tres etapas — horizontal en desktop (a
            la altura de los números), vertical en mobile (a lo largo del
            borde izquierdo de la lista). Su longitud sigue el mismo
            progreso de scroll que revela cada etapa. */}
        <motion.span
          aria-hidden="true"
          style={{ scaleX: lineScale }}
          className="pointer-events-none absolute left-[6%] right-[6%] top-[1.15rem] hidden h-px origin-left bg-platinum/25 sm:block"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: lineScale }}
          className="pointer-events-none absolute bottom-4 left-[0.95rem] top-4 w-px origin-top bg-platinum/25 sm:hidden"
        />

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
          {process.steps.map((step, index) => (
            <ProcessStep
              key={step.name}
              step={step}
              index={index}
              total={process.steps.length}
              scrollYProgress={scrollYProgress}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
