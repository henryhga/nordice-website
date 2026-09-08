import Link from "next/link";
import Image from "next/image";
import { nav } from "@/content/copy";
import { HeaderCta } from "@/components/HeaderCta";

// Ícono N facetado real (recortado del asset de marca original, ver
// public/brand/n-mark.png) — igual al de las 5 fotos de referencia, no
// un render 3D. Nav completa desde `lg`; en mobile/tablet solo logo +
// botón — 5 enlaces + botón no caben en una pantalla angosta sin
// romperse. Logo / nav / botón son 3 hijos directos en `justify-between`
// (no nav+botón agrupados) para que el nav quede centrado entre ambos,
// igual que en la referencia — no pegado al botón.
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-10">
      <Link
        href="#inicio"
        className="flex items-center gap-3 font-serif text-lg tracking-[0.2em] text-ice"
      >
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

      <nav aria-label="Principal" className="hidden items-center gap-16 lg:flex">
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

      <HeaderCta />
    </header>
  );
}
