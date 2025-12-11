import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 3000;

export const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  
  const { positions, velocities, originalPositions } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 30 - 10;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return { positions, velocities, originalPositions };
  }, []);
  
  const sizes = useMemo(() => {
    const sizes = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      sizes[i] = Math.random() * 3 + 1;
    }
    return sizes;
  }, []);
  
  const colors = useMemo(() => {
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const colorPalette = [
      new THREE.Color('#00f5ff'),
      new THREE.Color('#0099ff'),
      new THREE.Color('#66ccff'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#00ddff'),
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
    
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      
      // Get current position
      let x = posArray[i3];
      let y = posArray[i3 + 1];
      let z = posArray[i3 + 2];
      
      // Calculate distance to mouse
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Mouse repulsion effect
      const mouseRadius = 8;
      if (dist < mouseRadius && dist > 0) {
        const force = (1 - dist / mouseRadius) * 0.5;
        const angle = Math.atan2(dy, dx);
        velocities[i3] += Math.cos(angle) * force;
        velocities[i3 + 1] += Math.sin(angle) * force;
      }
      
      // Apply velocity with damping
      x += velocities[i3];
      y += velocities[i3 + 1];
      z += velocities[i3 + 2];
      
      // Return to original position
      const returnForce = 0.01;
      velocities[i3] += (originalPositions[i3] - x) * returnForce;
      velocities[i3 + 1] += (originalPositions[i3 + 1] - y) * returnForce;
      velocities[i3 + 2] += (originalPositions[i3 + 2] - z) * returnForce;
      
      // Add subtle drift
      velocities[i3] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.01) * 0.001;
      velocities[i3 + 1] += Math.cos(state.clock.elapsedTime * 0.3 + i * 0.01) * 0.001;
      
      // Damping
      velocities[i3] *= 0.98;
      velocities[i3 + 1] *= 0.98;
      velocities[i3 + 2] *= 0.98;
      
      posArray[i3] = x;
      posArray[i3 + 1] = y;
      posArray[i3 + 2] = z;
    }
    
    positionAttr.needsUpdate = true;
    
    // Rotate slowly
    pointsRef.current.rotation.z = state.clock.elapsedTime * 0.02;
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
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
