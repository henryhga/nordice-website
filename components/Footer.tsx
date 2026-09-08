import Link from "next/link";
import Image from "next/image";
import { site, contact, hero } from "@/content/copy";

// Footer compacto: logo a la izquierda, frase de marca centrada,
// ubicación + contacto real a la derecha — misma distribución de 3
// columnas que la referencia (logo | frase | ciudad), con el WhatsApp
// real añadido junto a la ciudad (la referencia no trae contacto, pero
// no hay razón para perder un dato real y útil).
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-platinum/10 bg-ink-deep px-6 py-8 sm:px-10 lg:px-24">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="#inicio" className="flex items-center gap-3 font-serif text-lg tracking-[0.2em] text-ice">
          <Image
            src="/brand/n-mark.png"
            alt=""
            width={785}
            height={914}
            unoptimized
            className="h-8 w-auto select-none"
          />
          NORDICE
        </Link>

        <p className="font-serif text-sm italic text-platinum-dim">{hero.sub}</p>

        <ul className="flex flex-col items-center gap-1 text-sm text-platinum-dim sm:items-end">
          <li className="text-xs uppercase tracking-[0.2em]">{contact.location.value}</li>
          <li>
            <a href={contact.whatsapp.href} className="transition-colors duration-500 hover:text-ice">
              WhatsApp: {contact.whatsapp.value}
            </a>
          </li>
        </ul>
      </div>

      <p className="mt-8 text-center text-[11px] uppercase tracking-[0.15em] text-platinum-dim/60">
        © {year} {site.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
