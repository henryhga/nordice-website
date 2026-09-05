"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { product } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

// Renders reales (recortados de la referencia del cliente, ver
// public/illustrations) — tarjetas con borde fino. Hover en plata, nunca
// dorado: son piezas de hielo, no whisky (el ámbar se reserva para el
// líquido real en foto).
export function Product() {
  return (
    <section
      id="producto"
      aria-label="Nuestros productos"
      className="bg-ink-deep px-6 py-20 md:py-28"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger()}
        className="mx-auto max-w-6xl"
      >
        <motion.h2
          variants={fadeUp}
          className="text-center font-serif text-3xl font-normal text-ice sm:text-4xl"
        >
          {product.title}
        </motion.h2>
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-5 h-px w-10 bg-platinum/40"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {product.items.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="group flex flex-col items-center border border-platinum/15 px-6 py-10 text-center transition-colors duration-500 hover:border-platinum/50"
            >
              <Image
                src={item.image}
                alt={`${item.name} ${item.spec}`}
                width={161}
                height={145}
                unoptimized
                className="h-24 w-auto object-contain transition-transform duration-500 group-hover:-translate-y-1"
              />
              <h3 className="mt-6 font-serif text-base uppercase tracking-[0.06em] text-ice">
                {item.name} {item.spec}
              </h3>
              <p className="mt-3 text-sm text-platinum-dim">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
