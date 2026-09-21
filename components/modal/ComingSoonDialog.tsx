"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { comingSoon, contact } from "@/content/copy";
import { useDialogBehavior } from "@/lib/useDialogBehavior";

interface ComingSoonDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mismo patrón sin backend que el resto del sitio: "Be part of Northice"
// abre WhatsApp con un mensaje de lista de lanzamiento ya armado — no hay
// captura de email real todavía, así que no simulamos un envío.
const JOIN_LIST_MESSAGE = encodeURIComponent(
  "Hi Northice, I'd like to join the launch list and get updates.",
);

export function ComingSoonDialog({ isOpen, onClose }: ComingSoonDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useDialogBehavior(isOpen, onClose, closeRef);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-6 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-ink-deep/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="coming-soon-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-platinum/15 bg-ink-deep p-8 text-center md:p-12"
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-6 top-6 text-platinum-dim transition-colors duration-500 hover:text-ice"
            >
              ✕
            </button>

            <span className="block text-xs font-medium uppercase tracking-[0.3em] text-platinum">
              {comingSoon.eyebrow}
            </span>

            <h2
              id="coming-soon-title"
              className="mt-6 font-serif text-2xl font-normal leading-snug text-ice sm:text-3xl"
            >
              {comingSoon.headline}
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-platinum-dim md:text-base">{comingSoon.body}</p>

            <p className="mt-6 text-sm leading-relaxed text-ice">{comingSoon.origin}</p>

            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-platinum-dim">{comingSoon.timeline}</p>

            <p className="mt-8 text-sm leading-relaxed text-platinum-dim">{comingSoon.invite}</p>

            <a
              href={`${contact.whatsapp.href}?text=${JOIN_LIST_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center gap-3 border border-platinum/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/5"
            >
              {comingSoon.cta}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
