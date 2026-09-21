import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/content/copy";
import { HeaderCta } from "@/components/HeaderCta";

// Real faceted N icon (cropped from the original brand asset, see
// public/brand/n-mark.png) — same as in the 5 reference photos, not a 3D
// render. Full nav from `lg` up; mobile/tablet shows just logo + button —
// 5 links + button don't fit a narrow screen without breaking. Logo / nav
// / button are 3 direct children in `justify-between` (not nav+button
// grouped) so the nav sits centered between both, like the reference —
// not glued to the button.
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-10">
      <Link
        href="#home"
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
        {site.name.toUpperCase()}
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-16 lg:flex">
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
