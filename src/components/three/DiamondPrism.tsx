import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DiamondPrismProps {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
}

export const DiamondPrism = ({ 
  position = [0, 0, 0], 
  scale = 1,
  rotationSpeed = 0.5 
}: DiamondPrismProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const rainbowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2 * rotationSpeed;
      meshRef.current.rotation.y = time * 0.3 * rotationSpeed;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
    }
    
    if (glowRef.current) {
      glowRef.current.rotation.x = time * 0.2 * rotationSpeed;
      glowRef.current.rotation.y = time * 0.3 * rotationSpeed;
      glowRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
    }
    
    if (rainbowRef.current) {
      rainbowRef.current.rotation.z = time * 0.1;
      const pulse = 1 + Math.sin(time * 2) * 0.1;
      rainbowRef.current.scale.setScalar(scale * 3 * pulse);
    }
  });
  
  return (
    <group position={position}>
      {/* Rainbow refraction halo */}
      <mesh ref={rainbowRef} position={[0, 0, -2]} scale={scale * 3}>
        <ringGeometry args={[0.8, 1.2, 64]} />
        <meshBasicMaterial
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        >
          <primitive 
            attach="map" 
            object={(() => {
              const canvas = document.createElement('canvas');
              canvas.width = 256;
              canvas.height = 256;
              const ctx = canvas.getContext('2d')!;
              const gradient = ctx.createRadialGradient(128, 128, 60, 128, 128, 128);
              gradient.addColorStop(0, 'rgba(255, 100, 150, 0.5)');
              gradient.addColorStop(0.25, 'rgba(150, 100, 255, 0.5)');
              gradient.addColorStop(0.5, 'rgba(100, 255, 255, 0.5)');
              gradient.addColorStop(0.75, 'rgba(100, 200, 255, 0.5)');
              gradient.addColorStop(1, 'rgba(255, 100, 150, 0.5)');
              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, 256, 256);
              return new THREE.CanvasTexture(canvas);
            })()} 
          />
        </meshBasicMaterial>
      </mesh>
      
      {/* Main crystal - Octahedron (Diamond shape) */}
      <mesh ref={meshRef} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#e0f7fa"
          metalness={0.1}
          roughness={0.05}
          transmission={0.95}
          thickness={1.5}
          ior={2.4}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh ref={glowRef} scale={scale * 1.3}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#80deea"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Light source inside */}
      <pointLight 
        color="#ffffff" 
        intensity={2} 
        distance={15}
        position={[0, 0, 0]}
      />
      <pointLight 
        color="#80deea" 
        intensity={1} 
        distance={10}
        position={[0, 0, 0]}
      />
    </group>
  );
};
