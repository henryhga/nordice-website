"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { hero } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

// Layout de 2 columnas: foto real a la izquierda (recorte de la
// referencia que pasó el cliente — la N tallada en cristal junto al
// whisky sirviéndose), lockup de marca + firma a la derecha. La luz que
// se mueve al fondo sigue siendo un placeholder generado (gradientes
// radiales a la deriva, ~60-75s por ciclo) que da ambiente sin competir
// con la foto.
export function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Presentación"
      className="relative min-h-svh w-full overflow-hidden bg-ink-deep"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -left-1/4 top-[-10%] h-[70vh] w-[70vh] rounded-full bg-glacier/25 blur-[140px]"
          animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -right-[10%] bottom-[-15%] h-[60vh] w-[60vh] rounded-full bg-platinum/10 blur-[160px]"
          animate={{ x: [0, -30, 20, 0], y: [0, -20, 10, 0] }}
          transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/50 via-transparent to-ink-deep" />
      </div>

      <div className="relative z-10 grid min-h-svh grid-cols-1 items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-2 lg:gap-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:mx-0 lg:aspect-auto lg:h-[72vh] lg:max-w-none"
        >
          <Image
            src="/photography/hero-pour.jpg"
            alt="La N de Nordice tallada en cristal, junto a un whisky recién servido sobre hielo."
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger()}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.h1
            variants={fadeUp}
            className="flex w-full flex-col items-center gap-6 lg:items-start"
          >
            {/* Lockup de marca: ícono (N tallada) + wordmark. Ambos
                reexportados con transparencia real desde /assets-originals
                (fuera de git/deploy — copia de seguridad). `unoptimized`:
                el optimizador de imágenes de Next reencodea a WebP/AVIF y
                aplana el canal alfa a opaco en esta versión; se sirven los
                PNG tal cual para conservarla. */}
            <Image
              src="/brand/n-mark.png"
              alt=""
              width={1254}
              height={1254}
              priority
              unoptimized
              className="h-16 w-16 select-none sm:h-20 sm:w-20"
            />
            <Image
              src="/brand/wordmark.png"
              alt={hero.brandName}
              width={2172}
              height={724}
              priority
              unoptimized
              className="h-auto w-full max-w-md select-none"
            />
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-8 w-full max-w-md">
            {/* Firma caligráfica original, con el mismo tratamiento que
                tenía antes (transparencia real, sin optimizador de Next
                por el bug de alfa en WebP/AVIF — ver /assets-originals). */}
            <Image
              src="/brand/signature.png"
              alt={hero.sub}
              width={2172}
              height={724}
              priority
              unoptimized
              className="h-auto w-full select-none"
            />
          </motion.div>

          <motion.a
            variants={fadeUp}
            href={hero.ctaHref}
            className="mt-14 inline-flex items-center gap-3 border border-platinum/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/5"
          >
            {hero.cta}
          </motion.a>
        </motion.div>
      </div>

      <motion.a
        href="#origen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-platinum-dim">
          {hero.scrollHint}
        </span>
        <motion.span
          className="h-10 w-px bg-platinum/40"
          style={{ transformOrigin: "top" }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}
