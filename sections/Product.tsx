"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { product } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

// Formatos. Fotografía macro real, mucho espacio negativo — sin ficha de
// precio ni copy adicional todavía (pendiente de confirmar con el cliente).
export function Product() {
  return (
    <section
      id="producto"
      aria-label="El producto"
      className="bg-ink-deep px-6 py-32 md:py-40"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger()}
        className="mx-auto max-w-6xl"
      >
        <motion.span
          variants={fadeUp}
          className="block text-xs font-medium uppercase tracking-[0.3em] text-platinum"
        >
          {product.kicker}
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="mt-6 font-serif text-3xl font-normal text-ice sm:text-4xl md:text-5xl"
        >
          {product.title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-md text-sm text-platinum-dim md:text-base"
        >
          {product.intro}
        </motion.p>

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-3">
          {product.items.map((item) => (
            <motion.div key={item.name} variants={fadeUp} className="flex flex-col">
              {/* Fotos reducidas ~40% respecto al ancho de columna, con
                  más espacio negativo alrededor de cada objeto. */}
              <div className="mx-auto w-[60%]">
                <div className="relative aspect-square w-full overflow-hidden bg-ink-deep">
                  <Image
                    src={item.image}
                    alt={`Nordice — formato ${item.name}, ${item.spec}`}
                    fill
                    sizes="(min-width: 768px) 20vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 font-serif text-xl text-ice">{item.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-platinum-dim">
                  {item.spec}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
