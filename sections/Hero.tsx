"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { hero } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

// Canvas WebGL (N en cristal 3D) — solo cliente, nunca en SSR.
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false },
);

// Composición centrada: lago a la izquierda y botella+vaso a la derecha
// (foto real, referencia del cliente) sangrando a los bordes; al centro,
// la N 3D (WebGL, fondo transparente) + wordmark/firma en HTML normal.
// En mobile se simplifica a una franja de la botella al pie — mostrar
// las dos fotos completas angostas no deja espacio real para el texto.
export function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Presentación"
      className="relative min-h-svh w-full overflow-hidden bg-ink-deep"
    >
      <div className="absolute inset-y-0 left-0 hidden w-[28%] min-w-[260px] sm:block">
        <Image
          src="/photography/hero-lake.jpg"
          alt=""
          fill
          sizes="28vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-transparent to-ink-deep" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 sm:hidden">
        <Image
          src="/photography/hero-bottle.jpg"
          alt="Botella y vaso Nordice con luz dorada."
          fill
          sizes="100vw"
          className="object-cover object-[70%_30%]"
          priority
        />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink-deep to-transparent" />
      </div>

      <div className="absolute inset-y-0 right-0 hidden w-[32%] min-w-[300px] sm:block">
        <Image
          src="/photography/hero-bottle.jpg"
          alt="Botella y vaso Nordice con luz dorada."
          fill
          sizes="32vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent to-ink-deep" />
      </div>

      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 pb-24 pt-24 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger()}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="relative h-28 w-28 sm:h-36 sm:w-36">
            <HeroScene />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-2 w-full max-w-xl">
            {/* Wordmark real, sin transparencia (fuera de git/deploy —
                copia de seguridad en /assets-originals). `unoptimized`:
                el optimizador de imágenes de Next reencodea a WebP/AVIF y
                aplana el canal alfa a opaco en esta versión. */}
            <Image
              src="/brand/wordmark.png"
              alt={hero.brandName}
              width={2172}
              height={724}
              priority
              unoptimized
              className="h-auto w-full select-none"
            />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-3 w-full max-w-md">
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

          <motion.p
            variants={fadeUp}
            className="mt-6 text-xs uppercase tracking-[0.25em] text-platinum-dim"
          >
            {hero.subtext}
          </motion.p>

          <motion.a
            variants={fadeUp}
            href={hero.ctaHref}
            className="mt-10 inline-flex items-center gap-3 border border-platinum/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/5"
          >
            {hero.cta}
          </motion.a>
        </motion.div>
      </div>

      <motion.a
        href={hero.scrollHintHref}
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
