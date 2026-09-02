import Link from "next/link";
import { hero } from "@/content/copy";

// Cromo persistente y mínimo: logotipo en texto (la textura metálica del
// asset real solo resuelve bien a tamaño grande, se reserva para el hero
// y el footer) + un único enlace, en el lenguaje de "acceso" del brief.
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-10">
      <Link
        href="#inicio"
        className="font-serif text-lg tracking-[0.2em] text-ice"
      >
        NORDICE
      </Link>
      <nav className="flex items-center gap-8">
        <a
          href="#producto"
          className="hidden text-[11px] uppercase tracking-[0.25em] text-platinum transition-colors duration-500 hover:text-ice sm:inline"
        >
          Producto
        </a>
        <a
          href="#contacto"
          className="whitespace-nowrap text-[11px] uppercase tracking-[0.25em] text-platinum transition-colors duration-500 hover:text-ice"
        >
          {hero.cta}
        </a>
      </nav>
    </header>
  );
}
