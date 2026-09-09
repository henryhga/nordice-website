"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { product } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";
import { useRequestModal } from "@/components/modal/RequestModalContext";
import { InteractiveLight } from "@/components/product/InteractiveLight";
import { ProductSheet, type ProductSheetItem } from "@/components/product/ProductSheet";
import { Product360Viewer, type Product360Item } from "@/components/product/Product360Viewer";

export function Product() {
  const { openAvailability } = useRequestModal();
  const [sheetItem, setSheetItem] = useState<ProductSheetItem | null>(null);
  const [viewerItem, setViewerItem] = useState<Product360Item | null>(null);

  function handleCheckAvailability(name: string) {
    setSheetItem(null);
    openAvailability(name);
  }

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

        <motion.div variants={fadeUp} className="mt-14">
          {/* Recorte más alto que el original (1672×423, ver
              public/photography/product-scene.jpg) — el primero excluía
              el facetado superior del Collins, que es más alto que los
              otros tres objetos. Ese recorte más alto vuelve a dejar
              visible el final del título horneado del mockup ("Nuestros
              productos" / subtítulo) en la franja central-derecha; se
              tapa con una máscara angosta que no toca ni el Collins
              (columna izquierda) ni el cuarto cubo (columna derecha). */}
          <InteractiveLight className="aspect-[1672/423] w-full">
            <Image
              src="/photography/product-scene.jpg"
              alt="Los cuatro productos Nordice — Collins, cubo 2×2, esfera y cubo 2×1.75 — sobre la misma superficie."
              fill
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-contain"
            />
            <div
              aria-hidden="true"
              className="absolute left-[20%] right-[19%] top-0 h-[24%]"
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-ink-deep) 0%, var(--color-ink-deep) 45%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 11.5%, black 88.5%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 11.5%, black 88.5%, transparent 100%)",
              }}
            />
          </InteractiveLight>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6"
        >
          {product.items.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center">
              <button
                type="button"
                onClick={() => setSheetItem({ name: item.name, spec: item.spec })}
                aria-label={`Ver ficha de ${item.name} ${item.spec}`}
                className="group -mx-2 min-h-[2.75rem] px-2 py-1"
              >
                <span className="block font-serif text-sm uppercase tracking-[0.06em] text-ice transition-colors duration-500 group-hover:text-platinum sm:text-base">
                  {item.name}
                </span>
                <span className="mt-0.5 block text-xs text-platinum-dim">{item.spec}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewerItem({ name: item.name, spec: item.spec, frames: [item.photo] })}
                aria-label={`Ver ${item.name} ${item.spec} en detalle`}
                className="mt-2 min-h-[2.75rem] px-2 text-[10px] uppercase tracking-[0.15em] text-platinum-dim underline underline-offset-4 transition-colors duration-500 hover:text-ice"
              >
                {product.view360}
              </button>
            </div>
          ))}
        </motion.div>

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

      <ProductSheet item={sheetItem} onClose={() => setSheetItem(null)} onCheckAvailability={handleCheckAvailability} />
      <Product360Viewer item={viewerItem} onClose={() => setViewerItem(null)} />
    </section>
  );
}
