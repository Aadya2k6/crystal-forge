import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ParticleField } from './ParticleField';

export const CrystalBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Cosmic gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, hsl(220 40% 12%) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsl(185 100% 50% / 0.05) 0%, transparent 40%),
            radial-gradient(ellipse at 20% 60%, hsl(270 100% 50% / 0.03) 0%, transparent 40%),
            linear-gradient(180deg, hsl(230 60% 4%) 0%, hsl(225 50% 6%) 50%, hsl(230 60% 4%) 100%)
          `,
        }}
      />
      
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ position: 'absolute', inset: 0 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Suspense>
      </Canvas>
      
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(230 60% 4% / 0.6) 100%)',
        }}
      />
    </div>
  );
};
