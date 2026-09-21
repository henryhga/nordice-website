"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, product } from "@/content/copy";
import { useDialogBehavior } from "@/lib/useDialogBehavior";

const productOptions = [...product.items.map((item) => `${item.name} ${item.spec}`), "Not sure / several"];

interface RequestModalDialogProps {
  isOpen: boolean;
  product?: string;
  onClose: () => void;
}

type SubmitStatus = "idle" | "submitting" | "sent" | "error";

// Sin backend de email/CRM todavía: el formulario arma el mensaje y lo
// manda por WhatsApp al número real del negocio, igual que el contacto
// directo — funcional hoy, no un envío que se pierde en el vacío. Cuando
// haya un servicio de email/CRM, este handler es lo único que cambia.
function buildWhatsAppMessage(fields: {
  name: string;
  occasion: string;
  contactMethod: string;
  productOfInterest: string;
  message: string;
}) {
  const lines = [
    `Hi Northice, I'm ${fields.name || "—"}.`,
    "I'd like to check availability.",
    fields.occasion && `Business / occasion: ${fields.occasion}`,
    fields.productOfInterest && `Product of interest: ${fields.productOfInterest}`,
    fields.contactMethod && `I'd prefer to be contacted by: ${fields.contactMethod}`,
    fields.message && `Message: ${fields.message}`,
  ].filter(Boolean);
  return encodeURIComponent(lines.join("\n"));
}

export function RequestModalDialog({ isOpen, product: presetProduct, onClose }: RequestModalDialogProps) {
  // El padre remonta este componente con una `key` nueva cada vez que se
  // abre (ver RequestModalContext), así que el estado inicial derivado de
  // `presetProduct` ya nace correcto — sin necesidad de resetearlo con un
  // setState dentro de un efecto.
  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [productOfInterest, setProductOfInterest] = useState(presetProduct ?? "");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useDialogBehavior(isOpen, onClose, firstFieldRef);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setStatus("submitting");
    const text = buildWhatsAppMessage({ name, occasion, contactMethod, productOfInterest, message });

    let win: Window | null = null;
    try {
      win = window.open(`${contact.whatsapp.href}?text=${text}`, "_blank", "noopener,noreferrer");
    } catch {
      win = null;
    }

    if (!win) {
      setStatus("error");
      setFormError(
        "We couldn't open WhatsApp — your browser may have blocked the pop-up. Allow pop-ups for this site or message us directly on WhatsApp.",
      );
      return;
    }

    setStatus("sent");
  }

  const inputClass =
    "w-full border-b border-platinum/30 bg-transparent py-3 text-sm text-ice outline-none transition-colors duration-500 placeholder:text-platinum-dim/60 focus:border-platinum";
  const labelClass = "mb-1 block text-xs uppercase tracking-[0.2em] text-platinum-dim";

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
            aria-labelledby="request-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-platinum/15 bg-ink-deep p-8 md:p-10"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-6 top-6 text-platinum-dim transition-colors duration-500 hover:text-ice"
            >
              ✕
            </button>

            <h2 id="request-modal-title" className="font-serif text-2xl font-normal text-ice sm:text-3xl">
              Check availability
            </h2>

            {status === "sent" ? (
              <p className="mt-8 text-sm text-platinum-dim">
                We&rsquo;re redirecting you to WhatsApp to send your inquiry. If it didn&rsquo;t open, message us directly at{" "}
                <a href={contact.whatsapp.href} className="text-ice underline underline-offset-4">
                  {contact.whatsapp.value}
                </a>
                .
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                <div>
                  <label htmlFor="request-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="request-name"
                    ref={firstFieldRef}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="request-occasion" className={labelClass}>
                    Business or occasion
                  </label>
                  <input
                    id="request-occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className={inputClass}
                    placeholder="Bar, hotel, private event…"
                  />
                </div>

                <div>
                  <label htmlFor="request-product" className={labelClass}>
                    Product of interest
                  </label>
                  <select
                    id="request-product"
                    value={productOfInterest}
                    onChange={(e) => setProductOfInterest(e.target.value)}
                    className={`${inputClass} appearance-none bg-ink-deep`}
                  >
                    <option value="" className="bg-ink-deep">
                      Select…
                    </option>
                    {productOptions.map((option) => (
                      <option key={option} value={option} className="bg-ink-deep">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="request-contact" className={labelClass}>
                    Preferred contact
                  </label>
                  <input
                    id="request-contact"
                    required
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                    className={inputClass}
                    placeholder="Phone, email or WhatsApp"
                  />
                </div>

                <div>
                  <label htmlFor="request-message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="request-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us what you need"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-xs text-gold">
                    {formError}
                  </p>
                )}

                <p className="text-[11px] leading-relaxed text-platinum-dim/70">
                  Your inquiry is sent via WhatsApp to {contact.whatsapp.value}. Email or CRM integration
                  isn&rsquo;t configured yet.
                </p>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 inline-flex items-center justify-center gap-3 border border-platinum/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/5 disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending…" : "Check via WhatsApp"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
