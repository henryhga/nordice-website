"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { experience } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";
import { useRequestModal } from "@/components/modal/RequestModalContext";

// Fondo real recortado de la referencia del cliente (botella + vaso bajo
// + vaso Collins, ver public/photography/experience-scene.jpg) sangrando
// por el borde izquierdo — el recorte excluye por completo la columna de
// texto horneada del mockup (vivía sobre fondo negro plano a la derecha),
// así que el texto real ocupa esa misma columna sin superponerse a nada.
export function Experience() {
  const { openSample } = useRequestModal();

  return (
    <section
      id="experiencia"
      aria-label="La experiencia Nordice"
      className="relative min-h-[42rem] w-full overflow-hidden bg-ink-deep py-20 md:py-28"
    >
      <div className="absolute inset-y-0 left-0 hidden w-[58%] lg:block">
        <Image
          src="/photography/experience-scene.jpg"
          alt="Vaso con cubo de hielo Nordice y vaso Collins con barra de hielo, junto a una botella."
          fill
          sizes="58vw"
          className="object-cover"
        />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-ink-deep to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col gap-12 px-6 sm:px-10 lg:block lg:px-0">
        <div className="relative aspect-[21/9] w-full overflow-hidden lg:hidden">
          <Image
            src="/photography/experience-scene.jpg"
            alt="Vaso con cubo de hielo Nordice y vaso Collins con barra de hielo, junto a una botella."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger()}
          className="lg:pl-[62%] lg:pr-24"
        >
          <motion.span
            variants={fadeUp}
            className="block text-xs font-medium uppercase tracking-[0.3em] text-platinum"
          >
            {experience.kicker}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-3xl font-normal text-ice"
          >
            {experience.title[0]}
            <br />
            {experience.title[1]}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-sm text-sm text-platinum-dim md:text-base">
            {experience.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {experience.categories.map((category, index) => (
              <span
                key={category}
                className={`pl-10 text-[11px] uppercase tracking-[0.2em] text-platinum-dim first:pl-0 ${
                  index !== 0 ? "border-l border-platinum/10" : ""
                }`}
              >
                {category}
              </span>
            ))}
          </motion.div>

          <motion.button
            type="button"
            variants={fadeUp}
            onClick={() => openSample()}
            className="mt-12 inline-flex items-center gap-3 border border-platinum/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/5"
          >
            {experience.cta}
            <span aria-hidden="true">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
