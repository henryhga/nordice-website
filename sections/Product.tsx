"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { product } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";
import { useRequestModal } from "@/components/modal/RequestModalContext";

// Fondo real recortado de la referencia del cliente (los 4 objetos sobre
// el mismo piso continuo, ver public/photography/product-scene.jpg) — el
// recorte excluye el título y las etiquetas horneadas del mockup; ambos
// se reconstruyen como texto real. Los porcentajes `left` de cada
// etiqueta se midieron sobre los píxeles de la imagen original (centro
// de cada objeto), no son un valor arbitrario.
const labelPositions = ["17%", "38%", "60%", "82%"];

export function Product() {
  const { openAvailability } = useRequestModal();

  return (
    <section
      id="producto"
      aria-label="Nuestros productos"
      className="bg-ink-deep px-6 py-20 sm:px-10 md:py-28 lg:px-24"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger()}
        className="mx-auto max-w-[1900px]"
      >
        <motion.span
          variants={fadeUp}
          className="block text-center text-xs font-medium uppercase tracking-[0.3em] text-platinum"
        >
          {product.kicker}
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="mt-6 text-center font-serif text-4xl font-normal text-ice sm:text-6xl lg:text-7xl"
        >
          {product.title}
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-3 text-center text-sm text-platinum-dim">
          {product.subtitle}
        </motion.p>

        <motion.div variants={fadeUp} className="relative mt-14 aspect-[1672/325] w-full">
          <Image
            src="/photography/product-scene.jpg"
            alt="Los cuatro productos Nordice — Collins, cubo 2×2, esfera y cubo 2×1.75 — sobre la misma superficie."
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-contain"
          />
        </motion.div>

        <div className="relative mt-4 h-16 sm:h-8">
          {product.items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openAvailability(`${item.name} ${item.spec}`)}
              aria-label={`Consultar disponibilidad: ${item.name} ${item.spec}. ${item.description}`}
              style={{ left: labelPositions[index] }}
              className="group absolute top-0 -translate-x-1/2 whitespace-nowrap text-center transition-colors duration-500"
            >
              <span className="block font-serif text-sm uppercase tracking-[0.06em] text-ice group-hover:text-platinum sm:text-base">
                {item.name}
              </span>
              <span className="mt-0.5 block text-xs text-platinum-dim">{item.spec}</span>
            </button>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => openAvailability()}
            className="inline-flex items-center gap-3 border border-platinum/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/5"
          >
            {product.cta}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
