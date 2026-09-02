import Image from "next/image";
import { site } from "@/content/copy";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-platinum/10 bg-ink-deep px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <Image
          src="/brand/n-mark.png"
          alt={site.name}
          width={1254}
          height={1254}
          unoptimized
          className="h-6 w-6 select-none opacity-80"
        />
        <p className="text-xs uppercase tracking-[0.2em] text-platinum-dim">
          © {year} {site.name}. Miami, FL.
        </p>
      </div>
    </footer>
  );
}
