import Link from "next/link";
import { nav } from "@/content/copy";

// Cromo persistente: logotipo en texto (la textura metálica del asset
// real solo resuelve bien a tamaño grande, se reserva para el hero y el
// footer). Nav completa desde `lg`; en mobile/tablet solo logo + botón —
// 5 enlaces + botón no caben en una pantalla angosta sin romperse.
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-10">
      <Link
        href="#inicio"
        className="font-serif text-lg tracking-[0.2em] text-ice"
      >
        NORDICE
      </Link>

      <div className="flex items-center gap-10">
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[11px] uppercase tracking-[0.25em] text-platinum transition-colors duration-500 hover:text-ice"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="whitespace-nowrap border border-platinum/30 px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/[0.08]"
        >
          {nav.cta}
        </a>
      </div>
    </header>
  );
}
