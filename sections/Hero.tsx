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
      id="home"
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-ink-deep"
    >
      {/* Todo lo que ocupaba la pantalla completa original (fondo de
          escritorio, contenido, hint de scroll) queda dentro de este
          contenedor min-h-svh — así el hint de scroll ("bottom-6") sigue
          anclado al final de esa primera pantalla y no se hunde al pie de
          la franja de foto que se agrega después en mobile. */}
      <div className="relative min-h-svh w-full">
        <motion.div style={{ y: mountainY, scale: mountainScale }} className="absolute inset-0 hidden sm:block">
          <Image
            src="/photography/hero-full.jpg"
            alt="Snow-covered mountains beside a lake, with a bottle and a whiskey glass holding Northice ice under warm golden light."
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

            {/* Wordmark como texto real, no como imagen: el PNG original
                tiene "NORDICE" horneado en los píxeles y no hay forma de
                regenerar esa tipografía custom para el nuevo nombre. Mismo
                font-serif de marca (Fraunces), mismas mayúsculas y tracking
                que antes — el degradado plata imita el acabado facetado/
                pulido del wordmark original sin cambiar la letra. */}
            <motion.h1
              variants={fadeUp}
              className="mt-2 bg-gradient-to-b from-ice via-platinum to-platinum-dim bg-clip-text font-serif text-6xl font-normal uppercase tracking-[0.06em] text-transparent select-none sm:text-7xl md:text-8xl"
            >
              {hero.brandName}
            </motion.h1>

            {/* Misma razón que el wordmark: signature.png tenía la frase
                en un script a mano horneado en la imagen, con un trazo
                decorativo (flourish) debajo, hacia la esquina inferior
                derecha de la firma. Se reemplaza el texto por una cursiva
                real de trazo fino (Herr Von Muellerhoff) y el trazo se
                reconstruye a mano como SVG — ninguno de los dos existía
                como elemento independiente en el PNG original. */}
            <motion.div variants={fadeUp} className="mt-1 max-w-md">
              <p className="font-signature text-5xl text-ice sm:text-6xl">{hero.sub}</p>
              <svg
                viewBox="0 0 220 56"
                className="ml-auto -mt-1 h-6 w-44 text-platinum-dim sm:h-7 sm:w-52"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 48 C 50 34, 110 16, 160 9 C 176 7, 190 6, 182 16 C 176 24, 186 23, 200 14 C 206 10, 212 8, 216 6"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
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
      </div>

      {/* En mobile, object-cover full-bleed sobre un viewport angosto y
          alto recortaría la montaña o la botella (la foto es panorámica,
          1672×871). En vez de eso, la foto completa entra como una franja
          normal a lo ancho de pantalla, en su relación de aspecto real —
          se ve entera, sin omitir ningún costado — debajo de la primera
          pantalla en vez de encima. */}
      <motion.div style={{ y: mountainY }} className="relative w-full sm:hidden">
        <div className="relative aspect-[1672/871] w-full">
          <Image
            src="/photography/hero-full.jpg"
            alt="Snow-covered mountains beside a lake, with a bottle and a whiskey glass holding Northice ice under warm golden light."
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, transparent 6%, var(--color-ink-deep) 24%, var(--color-ink-deep) 68%, transparent 86%, transparent 100%)",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
