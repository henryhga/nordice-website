"use client";

import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, MeshTransmissionMaterial, Text3D } from "@react-three/drei";
import type { Group } from "three";

// Fuente serif extruida vía Text3D (no hay modelo 3D custom de la N).
// Los fonts de ejemplo de three.js ya no se publican en el paquete npm
// (unpkg da 404) — se sirven desde el repo de GitHub vía jsdelivr, que sí
// manda CORS, fijado a la versión instalada para que no cambie sola.
const FONT_URL =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r185/examples/fonts/droid/droid_serif_bold.typeface.json";

interface IceNProps {
  size?: number;
  autoRotate?: boolean;
  /** Velocidad de rotación en eje Y, rad/s. */
  rotateSpeed?: number;
  /** Si es true, no rota sola — solo responde a hover con un leve tilt. */
  interactive?: boolean;
}

function Letter({ size }: { size: number }) {
  return (
    <Center>
      <Text3D
        font={FONT_URL}
        size={size}
        height={size * 0.35}
        curveSegments={12}
        bevelEnabled
        bevelThickness={size * 0.02}
        bevelSize={size * 0.015}
        bevelSegments={5}
      >
        N
        <MeshTransmissionMaterial
          color="#eef4f6"
          thickness={size * 0.7}
          roughness={0.04}
          transmission={1}
          ior={1.3}
          chromaticAberration={0.03}
          anisotropy={0.15}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.08}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Text3D>
    </Center>
  );
}

// La "N" en cristal: geometría extruida + material de transmisión (vidrio
// / hielo). Un mismo componente sirve para el navbar (chico, estático,
// tilt en hover) y el centro del hero (grande, auto-rotación lenta).
// `Suspense` es obligatorio: Text3D carga la fuente de forma asíncrona
// (useLoader) y sin un boundary explícito la carga se comporta mal —
// en pruebas se manifestó como pérdida total del contexto WebGL.
export function IceN({ size = 1, autoRotate = false, rotateSpeed = 0.05, interactive = false }: IceNProps) {
  const groupRef = useRef<Group>(null);
  const targetTilt = useRef(0);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    if (autoRotate) {
      group.rotation.y += rotateSpeed * delta;
    }
    if (interactive) {
      group.rotation.x += (targetTilt.current - group.rotation.x) * Math.min(1, delta * 6);
      group.rotation.y += (targetTilt.current * 0.6 - group.rotation.y) * Math.min(1, delta * 6);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={interactive ? () => (targetTilt.current = -0.28) : undefined}
      onPointerOut={interactive ? () => (targetTilt.current = 0) : undefined}
    >
      <Suspense fallback={null}>
        <Letter size={size} />
      </Suspense>
    </group>
  );
}
