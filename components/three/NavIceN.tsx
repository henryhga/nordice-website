"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { IceN } from "./IceN";

// Versión chica del navbar: estática, sin auto-rotación — solo un leve
// tilt al pasar el mouse (ver IceN `interactive`). Mismo entorno
// sintético que el hero (sin él, el material de transmisión es casi
// invisible a 32px).
export function NavIceN() {
  return (
    <div className="h-8 w-8 shrink-0">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3.2], fov: 32 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={0.9} color="#dfe7ea" />
        <pointLight color="#c9a45c" position={[0, 0, 2]} intensity={4} distance={5} />
        <Environment resolution={64}>
          <group>
            <Lightformer form="rect" intensity={3} color="#eef4f6" position={[0, 1, -2]} scale={[3, 2, 1]} />
            <Lightformer
              form="rect"
              intensity={2}
              color="#c9a45c"
              position={[1.5, 0, 1]}
              scale={[1, 3, 1]}
              rotation-y={Math.PI / 2}
            />
          </group>
        </Environment>
        <IceN size={0.85} interactive />
      </Canvas>
    </div>
  );
}
