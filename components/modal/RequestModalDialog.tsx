"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, product } from "@/content/copy";
import { useDialogBehavior } from "@/lib/useDialogBehavior";
import { useRequestModal, type RequestModalMode } from "./RequestModalContext";
import { clearSampleSelection } from "@/lib/sampleSelectionStore";

const productOptions = [...product.items.map((item) => `${item.name} ${item.spec}`), "No estoy seguro / varios"];

interface RequestModalDialogProps {
  isOpen: boolean;
  mode: RequestModalMode;
  product?: string;
  onClose: () => void;
}

const copyByMode: Record<RequestModalMode, { title: string; submitLabel: string }> = {
  sample: { title: "Solicitar muestra", submitLabel: "Enviar solicitud" },
  availability: { title: "Consultar disponibilidad", submitLabel: "Consultar por WhatsApp" },
};

type SubmitStatus = "idle" | "submitting" | "sent" | "error";

// Sin backend de email/CRM todavía: el formulario arma el mensaje y lo
// manda por WhatsApp al número real del negocio, igual que el contacto
// directo — funcional hoy, no un envío que se pierde en el vacío. Cuando
// haya un servicio de email/CRM, este handler es lo único que cambia.
function buildWhatsAppMessage(fields: {
  mode: RequestModalMode;
  name: string;
  occasion: string;
  contactMethod: string;
  productsOfInterest: string[];
  message: string;
}) {
  const intro = fields.mode === "sample" ? "Quisiera solicitar una muestra." : "Quisiera consultar disponibilidad.";
  const lines = [
    `Hola Nordice, soy ${fields.name || "—"}.`,
    intro,
    fields.occasion && `Negocio / ocasión: ${fields.occasion}`,
    fields.productsOfInterest.length > 0 && `Producto(s) de interés: ${fields.productsOfInterest.join(", ")}`,
    fields.contactMethod && `Prefiero que me contacten por: ${fields.contactMethod}`,
    fields.message && `Mensaje: ${fields.message}`,
  ].filter(Boolean);
  return encodeURIComponent(lines.join("\n"));
}

export function RequestModalDialog({ isOpen, mode, product: presetProduct, onClose }: RequestModalDialogProps) {
  // El padre remonta este componente con una `key` nueva cada vez que se
  // abre (ver RequestModalContext), así que el estado inicial derivado de
  // `presetProduct` ya nace correcto — sin necesidad de resetearlo con un
  // setState dentro de un efecto.
  const { sampleSelection, toggleSampleProduct, removeSampleProduct } = useRequestModal();
  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [availabilityProduct, setAvailabilityProduct] = useState(presetProduct ?? "");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useDialogBehavior(isOpen, onClose, firstFieldRef);

  const productsOfInterest = mode === "sample" ? sampleSelection : availabilityProduct ? [availabilityProduct] : [];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (mode === "sample" && sampleSelection.length === 0) {
      setFormError("Selecciona al menos un producto para tu muestra.");
      return;
    }

    setStatus("submitting");
    const text = buildWhatsAppMessage({ mode, name, occasion, contactMethod, productsOfInterest, message });

    let win: Window | null = null;
    try {
      win = window.open(`${contact.whatsapp.href}?text=${text}`, "_blank", "noopener,noreferrer");
    } catch {
      win = null;
    }

    if (!win) {
      setStatus("error");
      setFormError(
        "No pudimos abrir WhatsApp — es posible que el navegador haya bloqueado la ventana emergente. Permite pop-ups para este sitio o escríbenos directo por WhatsApp.",
      );
      return;
    }

    setStatus("sent");
    if (mode === "sample") clearSampleSelection();
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
            aria-label="Cerrar"
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
              aria-label="Cerrar"
              onClick={onClose}
              className="absolute right-6 top-6 text-platinum-dim transition-colors duration-500 hover:text-ice"
            >
              ✕
            </button>

            <h2 id="request-modal-title" className="font-serif text-2xl font-normal text-ice sm:text-3xl">
              {copyByMode[mode].title}
            </h2>

            {status === "sent" ? (
              <p className="mt-8 text-sm text-platinum-dim">
                Te estamos redirigiendo a WhatsApp para enviar tu solicitud. Si no se abrió, escríbenos directo a{" "}
                <a href={contact.whatsapp.href} className="text-ice underline underline-offset-4">
                  {contact.whatsapp.value}
                </a>
                .
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                <div>
                  <label htmlFor="request-name" className={labelClass}>
                    Nombre
                  </label>
                  <input
                    id="request-name"
                    ref={firstFieldRef}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="request-occasion" className={labelClass}>
                    Negocio u ocasión
                  </label>
                  <input
                    id="request-occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className={inputClass}
                    placeholder="Bar, hotel, evento privado…"
                  />
                </div>

                {mode === "sample" ? (
                  <fieldset>
                    <legend className={labelClass}>Productos de interés</legend>

                    {sampleSelection.length > 0 && (
                      <ul className="mb-3 flex flex-wrap gap-2">
                        {sampleSelection.map((selected) => (
                          <li
                            key={selected}
                            className="flex items-center gap-2 border border-platinum/30 py-1.5 pl-3 pr-2 text-xs text-ice"
                          >
                            {selected}
                            <button
                              type="button"
                              onClick={() => removeSampleProduct(selected)}
                              aria-label={`Quitar ${selected}`}
                              className="text-platinum-dim transition-colors duration-500 hover:text-ice"
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-col gap-3">
                      {productOptions.map((option) => {
                        const checked = sampleSelection.includes(option);
                        return (
                          <label
                            key={option}
                            className="flex min-h-[2.75rem] cursor-pointer items-center gap-3 text-sm text-platinum-dim transition-colors duration-500 hover:text-ice"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleSampleProduct(option)}
                              className="h-4 w-4 shrink-0 accent-platinum"
                            />
                            <span className={checked ? "text-ice" : ""}>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ) : (
                  <div>
                    <label htmlFor="request-product" className={labelClass}>
                      Producto de interés
                    </label>
                    <select
                      id="request-product"
                      value={availabilityProduct}
                      onChange={(e) => setAvailabilityProduct(e.target.value)}
                      className={`${inputClass} appearance-none bg-ink-deep`}
                    >
                      <option value="" className="bg-ink-deep">
                        Seleccionar…
                      </option>
                      {productOptions.map((option) => (
                        <option key={option} value={option} className="bg-ink-deep">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="request-contact" className={labelClass}>
                    Medio de contacto
                  </label>
                  <input
                    id="request-contact"
                    required
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                    className={inputClass}
                    placeholder="Teléfono, email o WhatsApp"
                  />
                </div>

                <div>
                  <label htmlFor="request-message" className={labelClass}>
                    Mensaje
                  </label>
                  <textarea
                    id="request-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="Cuéntanos qué necesitas"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-xs text-gold">
                    {formError}
                  </p>
                )}

                <p className="text-[11px] leading-relaxed text-platinum-dim/70">
                  Tu solicitud se envía por WhatsApp a {contact.whatsapp.value}. La integración de email o CRM
                  todavía no está configurada.
                </p>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 inline-flex items-center justify-center gap-3 border border-platinum/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/5 disabled:opacity-50"
                >
                  {status === "submitting" ? "Enviando…" : copyByMode[mode].submitLabel}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
