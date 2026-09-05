"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { icons } from "@/components/icons";
import { process } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

// Cuatro pasos conectados por flechas — en fila en desktop, apilados con
// flechas giradas 90° en mobile. Aparición secuencial vía el mismo
// sistema de stagger que el resto del sitio (150ms entre pasos).
export function Process() {
  return (
    <section
      id="proceso"
      aria-label="Nuestro proceso"
      className="bg-ink-deep px-6 py-32 md:py-40"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger(0.1, 0.15)}
        className="mx-auto max-w-6xl"
      >
        <motion.h2
          variants={fadeUp}
          className="text-center font-serif text-3xl font-normal text-ice sm:text-4xl"
        >
          {process.title}
        </motion.h2>
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-5 h-px w-10 bg-platinum/40"
        />

        <div className="mt-20 flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-4">
          {process.steps.map((step, index) => {
            const Icon = icons[step.icon];
            const isLast = index === process.steps.length - 1;
            return (
              <Fragment key={step.name}>
                <motion.div
                  variants={fadeUp}
                  className="flex max-w-[220px] flex-col items-center text-center"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-platinum-dim">
                    {index + 1}
                  </span>
                  <Icon className="mt-3 h-10 w-10 text-ice" />
                  <h3 className="mt-4 text-sm uppercase tracking-[0.15em] text-ice">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-sm text-platinum-dim">{step.description}</p>
                </motion.div>

                {!isLast && (
                  <motion.span
                    variants={fadeUp}
                    aria-hidden="true"
                    className="rotate-90 text-platinum/50 md:mt-8 md:rotate-0"
                  >
                    →
                  </motion.span>
                )}
              </Fragment>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
