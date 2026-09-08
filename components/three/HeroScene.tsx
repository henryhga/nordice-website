"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type { PointLight } from "three";
import { IceN } from "./IceN";

// Entorno sintético (sin HDRI externo) solo para que el material de
// transmisión tenga algo que refractar/reflejar — sin esto, el "vidrio"
// se ve casi negro salvo por reflejos puntuales de las luces.
function IceEnvironment() {
  return (
    <Environment resolution={256}>
      <group>
        <Lightformer form="rect" intensity={3} color="#eef4f6" position={[0, 2, -3]} scale={[6, 3, 1]} />
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#c9a45c"
          position={[2.5, 0, 1.5]}
          scale={[2, 5, 1]}
          rotation-y={Math.PI / 2}
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#dfe7ea"
          position={[-2.5, -0.5, 1.5]}
          scale={[2, 4, 1]}
          rotation-y={-Math.PI / 2}
        />
      </group>
    </Environment>
  );
}

// Luz dorada con flicker orgánico (senos superpuestos a distintas
// frecuencias, sin dependencia externa de ruido) simulando el brillo
// cálido del whisky detrás de la N.
function FlickerLight() {
  const ref = useRef<PointLight>(null);

  useFrame(({ clock }) => {
    const light = ref.current;
    if (!light) return;
    const t = clock.getElapsedTime();
    light.intensity =
      16 + Math.sin(t * 3) * 4 + Math.sin(t * 7.3) * 2 + Math.sin(t * 13.1) * 1;
  });

  return (
    <pointLight
      ref={ref}
      color="#c9a45c"
      position={[0.3, 0.2, -1.4]}
      intensity={16}
      distance={7}
      decay={2}
    />
  );
}

// Canvas transparente: sin fondo propio, para que la foto detrás (lago +
// botella) se siga viendo alrededor de la N. Bloom con threshold alto
// (~0.9) para que solo el brillo dorado detrás de la N genere resplandor,
// no la escena entera.
export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 32 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 3, 2]} intensity={0.5} color="#dfe7ea" />
      <IceEnvironment />
      <FlickerLight />
      <IceN size={1.7} autoRotate rotateSpeed={0.05} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.2} intensity={0.8} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
