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
