"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { process } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

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

export function Process() {
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

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={stagger(0.1, 0.15)}
        className="grid grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3 sm:gap-4 sm:px-10 md:py-16 lg:px-24"
      >
        {process.steps.map((step, index) => (
          <motion.div key={step.name} variants={fadeUp} className="flex items-baseline gap-4">
            <span className="font-serif text-3xl font-normal text-ice">0{index + 1}</span>
            <span className="h-px flex-1 max-w-16 bg-platinum/30" />
            <span className="flex flex-col">
              <span className="text-sm uppercase tracking-[0.15em] text-ice">{step.name}</span>
              <span className="mt-1 text-sm text-platinum-dim">{step.description}</span>
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
