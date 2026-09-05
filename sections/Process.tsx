"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { process } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

// Ilustraciones reales (recortadas de la referencia del cliente, ver
// public/illustrations) — el número va integrado en el label ("1.
// Origen"), no como elemento gráfico separado sobre el ícono.
export function Process() {
  return (
    <section
      id="proceso"
      aria-label="Nuestro proceso"
      className="bg-ink-deep px-6 py-20 md:py-28"
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

        <div className="mt-14 flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-4">
          {process.steps.map((step, index) => {
            const isLast = index === process.steps.length - 1;
            return (
              <Fragment key={step.name}>
                <motion.div
                  variants={fadeUp}
                  className="flex max-w-[220px] flex-col items-center text-center"
                >
                  <Image
                    src={step.image}
                    alt={step.name}
                    width={236}
                    height={120}
                    unoptimized
                    className="h-16 w-auto object-contain"
                  />
                  <h3 className="mt-4 text-sm uppercase tracking-[0.15em] text-ice">
                    {index + 1}. {step.name}
                  </h3>
                  <p className="mt-2 text-sm text-platinum-dim">{step.description}</p>
                </motion.div>

                {!isLast && (
                  <motion.span
                    variants={fadeUp}
                    aria-hidden="true"
                    className="rotate-90 text-platinum/50 md:mt-10 md:rotate-0"
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
