"use client";

import { motion } from "framer-motion";
import { icons } from "@/components/icons";
import { essence } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

// Cuatro pilares de marca. Separadores verticales finos solo desde
// desktop (única fila real); en 2×2/1 col no aportarían nada limpio.
export function Essence() {
  return (
    <section
      id="esencia"
      aria-label="Nuestra esencia"
      className="bg-ink-deep px-6 py-32 md:py-40"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger()}
        className="mx-auto max-w-6xl"
      >
        <motion.h2
          variants={fadeUp}
          className="text-center font-serif text-3xl font-normal text-ice sm:text-4xl"
        >
          {essence.title}
        </motion.h2>
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-5 h-px w-10 bg-platinum/40"
        />

        <div className="mt-20 grid grid-cols-1 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {essence.items.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <motion.div
                key={item.name}
                variants={fadeUp}
                className={`flex flex-col items-center px-6 text-center ${
                  index !== 0 ? "lg:border-l lg:border-platinum/10" : ""
                }`}
              >
                <Icon className="h-11 w-11 text-ice" />
                <h3 className="mt-6 font-serif text-base uppercase tracking-[0.1em] text-ice">
                  {item.name}
                </h3>
                <p className="mt-3 max-w-[220px] text-sm text-platinum-dim">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
