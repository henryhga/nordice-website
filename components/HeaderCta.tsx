"use client";

import { nav } from "@/content/copy";
import { useRequestModal } from "@/components/modal/RequestModalContext";

export function HeaderCta() {
  const { openSample } = useRequestModal();
  return (
    <button
      type="button"
      onClick={() => openSample()}
      className="whitespace-nowrap border border-platinum/30 px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-ice transition-colors duration-500 hover:border-platinum hover:bg-ice/[0.08]"
    >
      {nav.cta}
    </button>
  );
}
