import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { DiamondDustParticles } from './DiamondDustParticles';

export const GlacierBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Glacial gradient - Light to Deep */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, hsl(186 100% 97%) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 30%, hsl(320 80% 95% / 0.3) 0%, transparent 30%),
            radial-gradient(ellipse at 50% 80%, hsl(270 80% 90% / 0.2) 0%, transparent 40%),
            linear-gradient(
              180deg,
              hsl(186 100% 94%) 0%,
              hsl(187 71% 88%) 25%,
              hsl(190 80% 75%) 50%,
              hsl(195 85% 55%) 75%,
              hsl(186 76% 30%) 100%
            )
          `,
        }}
      />
      
      {/* Light rays */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `
            conic-gradient(
              from 180deg at 50% 0%,
              transparent 0deg,
              hsl(0 0% 100% / 0.3) 30deg,
              transparent 60deg,
              hsl(0 0% 100% / 0.2) 90deg,
              transparent 120deg,
              hsl(0 0% 100% / 0.3) 150deg,
              transparent 180deg,
              hsl(0 0% 100% / 0.2) 210deg,
              transparent 240deg,
              hsl(0 0% 100% / 0.3) 270deg,
              transparent 300deg,
              hsl(0 0% 100% / 0.2) 330deg,
              transparent 360deg
            )
          `,
        }}
      />
      
      {/* Three.js Canvas for Diamond Dust */}
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        style={{ position: 'absolute', inset: 0 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <DiamondDustParticles />
        </Suspense>
      </Canvas>
      
      {/* Soft vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(186 76% 30% / 0.2) 100%)',
        }}
      />
    </div>
  );
};
