"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { contact } from "@/content/copy";
import { fadeUp, stagger } from "@/lib/motion";

const clientTypes = ["Bar / Restaurante", "Hotel", "Colección privada", "Evento", "Otro"];

// Sin backend de email todavía: el formulario arma el mensaje y lo manda
// por WhatsApp al número real del negocio — funcional hoy, no un botón
// que "envía" a ningún lado. Cuando haya un servicio de email/CRM, este
// handler es lo único que cambia.
function buildWhatsAppMessage(fields: {
  name: string;
  business: string;
  type: string;
  message: string;
}) {
  const lines = [
    `Hola Nordice, soy ${fields.name || "—"}.`,
    fields.business && `Negocio: ${fields.business}`,
    `Tipo: ${fields.type}`,
    fields.message && `Mensaje: ${fields.message}`,
  ].filter(Boolean);
  return encodeURIComponent(lines.join("\n"));
}

export function Contact() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [type, setType] = useState(clientTypes[0]);
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = buildWhatsAppMessage({ name, business, type, message });
    window.open(`${contact.whatsapp.href}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "w-full border-b border-platinum/30 bg-transparent py-3 text-sm text-ice outline-none transition-colors duration-500 placeholder:text-platinum-dim/60 focus:border-platinum";

  return (
    <section
      id="contacto"
      aria-label="Contacto"
      className="bg-ink-deep px-6 py-20 md:py-28"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger()}
        className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:gap-24"
      >
        <div>
          <motion.span
            variants={fadeUp}
            className="block text-xs font-medium uppercase tracking-[0.3em] text-platinum"
          >
            {contact.kicker}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-3xl font-normal text-ice sm:text-4xl md:text-5xl"
          >
            {contact.title}
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-4 max-w-sm text-sm text-platinum-dim md:text-base">
            {contact.intro}
          </motion.p>

          <motion.a
            variants={fadeUp}
            href={`${contact.whatsapp.href}?text=${encodeURIComponent("Hola Nordice, quisiera más información.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 border border-platinum/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/5"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M12 3a9 9 0 0 0-7.6 13.8L3 21l4.3-1.4A9 9 0 1 0 12 3Z" />
              <path d="M8.3 8.9c.2-.6.5-.6.8-.6h.6c.2 0 .4 0 .6.4.2.5.6 1.6.7 1.7.1.1.1.3 0 .5-.1.2-.2.3-.4.5-.2.2-.3.3-.1.6.2.3.9 1.4 1.9 2.2 1.3 1.1 2.3 1.4 2.7 1.6.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.7.8 2 .9.3.2.5.2.6.4.1.2.1.9-.2 1.6-.3.8-1.7 1.5-2.4 1.6-.6.1-1.3.2-4.3-.9-3.6-1.4-5.8-5-6-5.3-.2-.3-1.4-1.9-1.4-3.6 0-1.7.9-2.5 1.2-2.9Z" />
            </svg>
            {contact.whatsapp.label}: {contact.whatsapp.value}
          </motion.a>

          <motion.dl variants={fadeUp} className="mt-14 space-y-5">
            {[contact.phone, contact.email, contact.location].map((field) => (
              <div key={field.label} className="flex items-baseline justify-between gap-4 border-b border-platinum/10 pb-3">
                <dt className="text-xs uppercase tracking-[0.2em] text-platinum-dim">{field.label}</dt>
                <dd className="text-sm text-ice">
                  {"href" in field && field.href ? (
                    <a href={field.href} className="transition-colors duration-500 hover:text-platinum">
                      {field.value}
                    </a>
                  ) : (
                    field.value ?? "—"
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.form variants={fadeUp} onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div>
            <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-[0.2em] text-platinum-dim">
              Nombre
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="business" className="mb-1 block text-xs uppercase tracking-[0.2em] text-platinum-dim">
              Negocio
            </label>
            <input
              id="business"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className={inputClass}
              placeholder="Bar, hotel, evento…"
            />
          </div>

          <div>
            <label htmlFor="type" className="mb-1 block text-xs uppercase tracking-[0.2em] text-platinum-dim">
              Tipo de cliente
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`${inputClass} appearance-none bg-ink-deep`}
            >
              {clientTypes.map((option) => (
                <option key={option} value={option} className="bg-ink-deep">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-[0.2em] text-platinum-dim">
              Mensaje
            </label>
            <textarea
              id="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="Cuéntanos qué necesitas"
            />
          </div>

          <button
            type="submit"
            className="mt-4 inline-flex items-center justify-center gap-3 border border-platinum/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/5"
          >
            Enviar por WhatsApp
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}
