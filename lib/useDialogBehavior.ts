"use client";

import { useEffect, type RefObject } from "react";

// Comportamiento compartido por todos los overlays del sitio (ficha de
// producto, visor 360°, comparador, formulario): bloqueo de scroll del
// body, cierre con Escape y foco inicial en el primer elemento enfocable
// (o en el ref explícito si se pasa uno). Extraído a un hook porque ya
// se repetía en cuatro componentes distintos con el mismo detalle fino
// (restaurar overflow y listener al desmontar).
export function useDialogBehavior(
  isOpen: boolean,
  onClose: () => void,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!isOpen) return;

    // Devolver el foco a quien abrió el diálogo (el botón del producto,
    // del header, etc.) al cerrarlo — sin esto el foco cae al <body> y
    // un usuario de teclado pierde su lugar en la página.
    const previouslyFocused = document.activeElement as HTMLElement | null;

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      initialFocusRef?.current?.focus();
    }, 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
      previouslyFocused?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose]);
}
