import type { Transition, Variants } from "framer-motion";

// El lujo se mueve despacio: duraciones largas, easing sin rebote,
// desplazamientos mínimos. Reutilizado en todas las secciones para que
// el ritmo de movimiento sea consistente en todo el sitio.

export const slow: Transition = {
  duration: 1.1,
  ease: [0.16, 1, 0.3, 1],
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: slow },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: slow },
};

export function stagger(delayChildren = 0.15, staggerChildren = 0.18): Variants {
  return {
    hidden: {},
    visible: {
      transition: { delayChildren, staggerChildren },
    },
  };
}

// Revelado de izquierda a derecha para el tríptico. `revealTransition` se
// exporta aparte para que un elemento acompañante (la línea de barrido)
// pueda animarse en el mismo tiempo exacto.
export const revealDurationSeconds = 2.6;

export const revealTransition: Transition = {
  duration: revealDurationSeconds,
  ease: [0.65, 0, 0.35, 1],
};

// Nota: se probó primero con clip-path (inset 100%→0%), pero en Framer
// Motion 13.1.1 animar `clipPath` dentro de whileInView se queda pegado
// en el estado inicial (confirmado aislando el mismo elemento con una
// animación de opacidad, que sí disparó correctamente). En su lugar, una
// "cortina" del color del fondo cubre la imagen y se retrae con scaleX
// (transform-origin a la derecha) — mismo resultado visual, sin el bug.
export const wipeReveal: Variants = {
  hidden: { scaleX: 1 },
  visible: { scaleX: 0, transition: revealTransition },
};
