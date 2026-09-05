"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { hero } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

// La foto sangra hasta el borde izquierdo/inferior del viewport (mitad
// izquierda en desktop, franja superior en mobile) y se funde con el
// fondo vía un degradado en el borde que toca el texto — en vez de
// flotar como una tarjeta separada dentro de la sección. Empieza justo
// debajo del header para no perder legibilidad del nav sobre la foto.
export function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Presentación"
      className="relative min-h-svh w-full overflow-hidden bg-ink-deep"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <motion.div
          className="absolute -right-[10%] bottom-[-15%] h-[60vh] w-[60vh] rounded-full bg-platinum/10 blur-[160px]"
          animate={{ x: [0, -30, 20, 0], y: [0, -20, 10, 0] }}
          transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 top-24 z-[1] h-[46vh] sm:h-[52vh] lg:inset-x-auto lg:bottom-0 lg:left-0 lg:right-1/2 lg:top-24 lg:h-auto"
      >
        <Image
          src="/photography/hero-pour.jpg"
          alt="La N de Nordice tallada en cristal, junto a un whisky recién servido sobre hielo."
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
        {/* Fusión con el fondo: abajo en mobile, a la derecha en desktop */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-deep to-transparent lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-32 lg:bg-gradient-to-l" />
      </motion.div>

      <div className="relative z-10 flex min-h-svh flex-col justify-end px-6 pb-16 pt-[46vh] sm:pt-[52vh] lg:grid lg:grid-cols-2 lg:items-center lg:justify-normal lg:gap-8 lg:px-10 lg:pb-16 lg:pt-0">
        <div aria-hidden="true" className="hidden lg:block" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger()}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.h1 variants={fadeUp} className="w-full">
            {/* Wordmark real, sin transparencia (fuera de git/deploy —
                copia de seguridad en /assets-originals). `unoptimized`:
                el optimizador de imágenes de Next reencodea a WebP/AVIF y
                aplana el canal alfa a opaco en esta versión; se sirve el
                PNG tal cual para conservarla. */}
            <Image
              src="/brand/wordmark.png"
              alt={hero.brandName}
              width={2172}
              height={724}
              priority
              unoptimized
              className="mx-auto h-auto w-full max-w-xl select-none lg:mx-0"
            />
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-3 w-full max-w-xl">
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
    </section>
  );
}
