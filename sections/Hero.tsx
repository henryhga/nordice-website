"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/useMediaQuery";

// Una sola foto panorámica continua (montaña + piso + botella, recorte
// completo de la referencia del cliente — ver
// public/photography/hero-full.jpg), no dos recortes laterales separados
// por un vacío negro plano: eso es lo que hacía que el hero se viera
// como "una foto pegada encima", no integrada. El degradado central
// tapa el texto horneado del mockup y deja lugar al texto real (HTML)
// sin cortar la escena — montaña y botella quedan conectadas por el
// mismo piso/cielo continuo, igual que en la referencia.
//
// Paisaje que responde al scroll: la montaña (fondo) y un fragmento de
// hielo (primer plano decorativo, /products/cubo.png — la misma foto de
// estudio que usan la ficha/360°/comparador) se mueven a velocidades
// distintas atadas al progreso de scroll de esta sección — sin pin ni
// scroll-jacking, el desplazamiento nativo de la página sigue intacto.
// El texto nunca lleva transform de scroll: se mantiene estable.
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const reduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const intensity = reduceMotion ? 0 : isMobile ? 0.45 : 1;

  const mountainY = useTransform(scrollYProgress, [0, 1], [0, -48 * intensity]);
  const mountainScale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.05 * intensity]);
  const iceY = useTransform(scrollYProgress, [0, 1], [30 * intensity, -70 * intensity]);
  const iceScale = useTransform(scrollYProgress, [0, 1], [0.9, 0.9 + 0.14 * intensity]);
  const iceOpacity = useTransform(scrollYProgress, [0, 0.55], [reduceMotion ? 0.5 : 0.18, 0.5]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Presentación"
      className="relative min-h-svh w-full overflow-hidden bg-ink-deep"
    >
      <motion.div style={{ y: mountainY, scale: mountainScale }} className="absolute inset-0 hidden sm:block">
        <Image
          src="/photography/hero-full.jpg"
          alt="Montañas nevadas junto a un lago, con una botella y un vaso de whisky con hielo Nordice bajo luz dorada."
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, transparent 6%, var(--color-ink-deep) 24%, var(--color-ink-deep) 68%, transparent 86%, transparent 100%)",
          }}
        />
      </motion.div>

      <motion.div style={{ y: mountainY }} className="absolute inset-x-0 bottom-0 h-40 sm:hidden">
        <Image
          src="/photography/hero-bottle.jpg"
          alt="Botella y vaso Nordice con luz dorada."
          fill
          sizes="100vw"
          className="object-cover object-[70%_30%]"
          priority
        />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink-deep to-transparent" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ y: iceY, scale: iceScale, opacity: iceOpacity }}
        className="pointer-events-none absolute bottom-0 left-0 z-[1] hidden h-64 w-64 sm:block lg:h-80 lg:w-80"
      >
        <div
          className="relative h-full w-full"
          style={{
            maskImage: "radial-gradient(closest-side, black 50%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(closest-side, black 50%, transparent 100%)",
          }}
        >
          <Image src="/products/cubo.png" alt="" fill sizes="20rem" className="object-contain" />
        </div>
      </motion.div>

      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 pb-24 pt-24 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger()}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp}>
            <Image
              src="/brand/n-mark.png"
              alt=""
              width={785}
              height={914}
              priority
              unoptimized
              className="h-24 w-auto select-none sm:h-28"
            />
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
            <span aria-hidden="true">→</span>
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
