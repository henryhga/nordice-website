"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { origin } from "@/content/copy";
import { fadeUp, revealDurationSeconds, revealTransition, wipeReveal } from "@/lib/motion";

// El tríptico (glaciar → iceberg → vaso) se revela de izquierda a derecha
// apenas entra en viewport, como si se grabara en el momento. La imagen
// está siempre presente en el DOM; una cortina del color del fondo la
// cubre y se retrae (scaleX, transform-origin a la derecha).
// `viewport={{ once: true }}` es lo que garantiza el requisito clave: una
// vez completo, queda así para siempre — volver a hacer scroll hacia
// arriba y abajo nunca lo rebobina.
//
// Una línea de barrido acompaña el frente del revelado en el mismo tiempo
// exacto (`revealTransition` compartido) y se apaga justo al llegar al
// final, como un trazo de luz completando el grabado.
export function Origin() {
  return (
    <section
      id="origen"
      aria-label="El origen"
      className="bg-ink-deep px-6 py-32 md:py-40"
    >
      <div className="mx-auto max-w-lg">
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="mb-12 block text-center text-xs font-medium uppercase tracking-[0.3em] text-platinum"
        >
          {origin.kicker}
        </motion.span>

        <div className="relative">
          <Image
            src="/brand/triptych.png"
            alt="El viaje del hielo: del glaciar, al iceberg, al vaso."
            width={1448}
            height={1086}
            loading="eager"
            unoptimized
            className="h-auto w-full select-none"
          />

          <motion.div
            aria-hidden="true"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={wipeReveal}
            style={{ transformOrigin: "right" }}
            className="absolute inset-0 bg-ink-deep"
          />

          {/* Línea de barrido — puramente decorativa, oculta de lectores
              de pantalla; el <Image> de arriba ya lleva el alt real. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-ice/90 to-transparent"
            style={{ boxShadow: "0 0 16px 2px rgba(244, 245, 243, 0.5)" }}
            initial={{ left: "0%", opacity: 1 }}
            whileInView={{
              left: "100%",
              opacity: 0,
              transition: {
                left: revealTransition,
                opacity: { duration: 0.5, delay: revealDurationSeconds - 0.5 },
              },
            }}
            viewport={{ once: true, amount: 0.35 }}
          />
        </div>
      </div>
    </section>
  );
}
