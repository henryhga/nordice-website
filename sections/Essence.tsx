"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { essence } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

// Fondo real recortado de la referencia del cliente (montaña + lago +
// cubo transparente, ver public/photography/essence-scene.jpg) sangrando
// por el borde derecho; el texto propio del mockup nunca se incluyó en
// el recorte (se cortó del lado izquierdo), así que no hay nada que
// tapar — el texto real vive en una columna plana a la izquierda con un
// degradado de transición hacia la foto.
export function Essence() {
  return (
    <section
      id="esencia"
      aria-label="Nuestra esencia"
      className="relative min-h-[46rem] w-full overflow-hidden bg-ink-deep px-6 py-20 sm:px-10 md:py-28 lg:px-24"
    >
      <div className="absolute inset-y-0 right-0 hidden w-[46%] sm:block">
        <Image
          src="/photography/essence-scene.jpg"
          alt="Cubo de hielo transparente Nordice frente a montañas nevadas."
          fill
          sizes="46vw"
          className="object-cover"
        />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-ink-deep to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger()}
        className="relative z-10 flex max-w-md flex-col justify-center sm:max-w-3xl sm:min-h-[38rem]"
      >
        <motion.span
          variants={fadeUp}
          className="block text-xs font-medium uppercase tracking-[0.3em] text-platinum"
        >
          {essence.kicker}
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="mt-6 font-serif text-4xl font-normal leading-[1.15] text-ice sm:whitespace-nowrap sm:text-6xl lg:text-7xl"
        >
          {essence.title[0]}
          <br />
          {essence.title[1]}
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-6 max-w-sm text-sm text-platinum-dim md:text-base">
          {essence.body}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.3em] text-platinum-dim"
        >
          {essence.values.map((value) => (
            <span key={value}>{value}</span>
          ))}
        </motion.p>
      </motion.div>

      <div className="mt-10 sm:hidden">
        <div className="relative aspect-square w-full">
          <Image
            src="/photography/essence-scene.jpg"
            alt="Cubo de hielo transparente Nordice frente a montañas nevadas."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
