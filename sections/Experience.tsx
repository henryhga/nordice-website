"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { experience } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

// Foto e íconos reales (recortados de la referencia del cliente) sangrando
// hasta el borde derecho del viewport; el texto se alinea con el mismo
// margen izquierdo que usa max-w-6xl en el resto del sitio, vía calc().
export function Experience() {
  return (
    <section
      aria-label="Eleva cada experiencia"
      className="bg-ink-deep py-20 md:py-28"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger()}
        className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12"
      >
        <div className="pl-6 pr-6 lg:pr-12 lg:pl-[max(1.5rem,calc((100vw-72rem)/2))]">
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl font-normal text-ice sm:text-4xl"
          >
            {experience.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-sm text-sm text-platinum-dim md:text-base">
            {experience.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-x-8 gap-y-6">
            {experience.categories.map((category, index) => (
              <div
                key={category.name}
                className={`flex flex-col items-center gap-3 pl-8 first:pl-0 ${
                  index !== 0 ? "border-l border-platinum/10" : ""
                }`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={65}
                  height={60}
                  unoptimized
                  className="h-8 w-auto object-contain"
                />
                <span className="text-[11px] uppercase tracking-[0.2em] text-platinum-dim">
                  {category.name}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.a
            variants={fadeUp}
            href="#contacto"
            className="mt-12 inline-flex items-center gap-3 border border-platinum/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/5"
          >
            {experience.cta}
          </motion.a>
        </div>

        <motion.div variants={fadeUp} className="relative aspect-[21/9] w-full lg:aspect-auto lg:h-[26rem]">
          <Image
            src="/photography/bar.jpg"
            alt="Hielo Nordice en una barra, junto a un whisky servido."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-ink-deep to-transparent lg:w-1/3" />
        </motion.div>
      </motion.div>
    </section>
  );
}
