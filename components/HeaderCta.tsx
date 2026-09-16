"use client";

import { nav } from "@/content/copy";
import { useComingSoon } from "@/components/modal/ComingSoonContext";

export function HeaderCta() {
  const { open } = useComingSoon();
  return (
    <button
      type="button"
      onClick={open}
      className="whitespace-nowrap border border-platinum/30 px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/[0.08]"
    >
      {nav.cta}
    </button>
  );
}
