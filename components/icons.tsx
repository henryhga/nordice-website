import type { SVGProps } from "react";

// Íconos de línea, minimalistas, un solo grosor de trazo — mismo lenguaje
// visual que el grabado del tríptico, pero reducido a su forma esencial.
// Todos comparten viewBox 0 0 48 48 y heredan color vía `currentColor`.

function base(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 48 48",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function MountainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M5 34 L17 14 L23 24 L29 10 L43 34" />
      <path d="M5 34 H43" />
    </svg>
  );
}

export function CubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M24 7 L40 15.5 V32.5 L24 41 L8 32.5 V15.5 Z" />
      <path d="M8 15.5 L24 24 L40 15.5" />
      <path d="M24 24 V41" />
    </svg>
  );
}

export function CraftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M9 33 H27 V38 H9 Z" />
      <path d="M18 33 L33 15" />
      <path d="M29 11 L37 19 L33 23 L25 15 Z" />
    </svg>
  );
}

export function GlassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M15 13 H33 L30.5 38 Q30.3 40 28 40 H20 Q17.7 40 17.5 38 Z" />
      <rect x="19.5" y="24" width="8" height="8" />
    </svg>
  );
}

export function WaterfallIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M6 30 L18 12 L24 20 L30 8 L42 30" />
      <path d="M20 21 V35 M23.5 23 V35 M27 21 V35" />
      <path d="M6 35 H42" />
    </svg>
  );
}

export function IcebergIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M13 31 L24 9 L35 31 Z" />
      <path d="M18 31 L24 21 L30 31" strokeOpacity={0.45} />
      <path d="M5 31 H43" />
    </svg>
  );
}

export function MartiniIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M9 10 H39 L24 26 V38" />
      <path d="M16 38 H32" />
    </svg>
  );
}

export function CutleryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M13 8 V18 M17 8 V18 M13 13 H17 M15 18 V40" />
      <path d="M31 8 C28 9 28 16 31 17 V40" />
    </svg>
  );
}

export function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M11 33 H37" />
      <path d="M13 33 C13 21 35 21 35 33 Z" />
      <path d="M24 21 V15" />
      <circle cx="24" cy="13" r="1.6" />
    </svg>
  );
}

export function ToastIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M5 9 H19 L12 21 V35" />
      <path d="M8 35 H16" />
      <path d="M29 9 H43 L36 21 V35" />
      <path d="M32 35 H40" />
    </svg>
  );
}

export const icons = {
  mountain: MountainIcon,
  cube: CubeIcon,
  craft: CraftIcon,
  glass: GlassIcon,
  waterfall: WaterfallIcon,
  iceberg: IcebergIcon,
  martini: MartiniIcon,
  cutlery: CutleryIcon,
  bell: BellIcon,
  toast: ToastIcon,
};
