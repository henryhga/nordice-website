import Link from "next/link";
import { site, nav, contact, hero } from "@/content/copy";

// 3 columnas (no 4): "Síguenos" se omite hasta tener redes sociales
// reales — no se inventan enlaces. Logo/tagline en texto, no en imagen:
// el wordmark y la firma caligráfica solo resuelven bien a tamaño
// grande (mismo criterio que el header).
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-platinum/10 bg-ink-deep px-6 py-16 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-3">
        <div>
          <Link href="#inicio" className="font-serif text-lg tracking-[0.2em] text-ice">
            NORDICE
          </Link>
          <p className="mt-3 font-serif text-sm italic text-platinum-dim">{hero.sub}</p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-platinum">Navegación</h3>
          <ul className="mt-4 space-y-2">
            {nav.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-platinum-dim transition-colors duration-500 hover:text-ice"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-platinum">Contacto</h3>
          <ul className="mt-4 space-y-2 text-sm text-platinum-dim">
            <li>
              {contact.email.href ? (
                <a href={contact.email.href} className="transition-colors duration-500 hover:text-ice">
                  {contact.email.value}
                </a>
              ) : (
                <span>Email — próximamente</span>
              )}
            </li>
            <li>
              <a href={contact.phone.href} className="transition-colors duration-500 hover:text-ice">
                {contact.phone.value}
              </a>
            </li>
            <li>{contact.location.value}</li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-16 max-w-6xl text-center text-[11px] uppercase tracking-[0.15em] text-platinum-dim/60 sm:text-left">
        © {year} {site.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
