import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 2000;

export const DiamondDustParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  
  const { positions, velocities, originalPositions, sparklePhases } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const sparklePhases = new Float32Array(PARTICLE_COUNT);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 30 - 5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = Math.random() * 0.02 + 0.01; // Gentle upward drift
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
      
      sparklePhases[i] = Math.random() * Math.PI * 2;
    }
    
    return { positions, velocities, originalPositions, sparklePhases };
  }, []);
  
  const sizes = useMemo(() => {
    const sizes = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      sizes[i] = Math.random() * 4 + 1;
    }
    return sizes;
  }, []);
  
  const colors = useMemo(() => {
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const colorPalette = [
      new THREE.Color('#ffffff'), // Pure white
      new THREE.Color('#e0f7fa'), // Ice white
      new THREE.Color('#b2ebf2'), // Light cyan
      new THREE.Color('#80deea'), // Cyan
      new THREE.Color('#e1bee7'), // Holographic pink tint
      new THREE.Color('#b39ddb'), // Holographic purple tint
    ];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return colors;
  }, []);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position;
    const posArray = positionAttr.array as Float32Array;
    const sizeAttr = geometry.attributes.size;
    const sizeArray = sizeAttr.array as Float32Array;
    
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      
      let x = posArray[i3];
      let y = posArray[i3 + 1];
      let z = posArray[i3 + 2];
      
      // Gentle floating motion
      x += Math.sin(time * 0.3 + sparklePhases[i]) * 0.005;
      y += velocities[i3 + 1];
      z += Math.cos(time * 0.2 + sparklePhases[i]) * 0.003;
      
      // Mouse attraction (gentle)
      const dx = mouseX - x;
      const dy = mouseY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 10 && dist > 0) {
        const force = (1 - dist / 10) * 0.02;
        x += dx * force * 0.1;
        y += dy * force * 0.1;
      }
      
      // Reset particles that go too high
      if (y > 25) {
        y = -25;
        x = originalPositions[i3] + (Math.random() - 0.5) * 10;
      }
      
      // Sparkle size animation
      const sparkle = Math.sin(time * 3 + sparklePhases[i]) * 0.5 + 0.5;
      sizeArray[i] = (sizes[i] * 0.5) + (sizes[i] * 0.5 * sparkle);
      
      posArray[i3] = x;
      posArray[i3 + 1] = y;
      posArray[i3 + 2] = z;
    }
    
    positionAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
    
    // Gentle rotation
    pointsRef.current.rotation.y = time * 0.01;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
