import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingCrystalProps {
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
}

export const FloatingCrystal = ({ 
  position = [0, 0, 0], 
  scale = 1,
  rotationSpeed = 1 
}: FloatingCrystalProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Create icosahedron geometry for crystal shape
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1, 0);
  }, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * rotationSpeed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * rotationSpeed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = state.clock.elapsedTime * 0.2 * rotationSpeed;
      glowRef.current.rotation.y = state.clock.elapsedTime * 0.3 * rotationSpeed;
      glowRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      
      // Pulse the glow
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(scale * 1.2 * pulse);
    }
  });
  
  return (
    <group position={position}>
      {/* Inner crystal with transmission material */}
      <mesh ref={meshRef} geometry={geometry} scale={scale}>
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={256}
          transmission={0.95}
          roughness={0.1}
          thickness={0.5}
          ior={2.4}
          chromaticAberration={0.5}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.2}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#00f5ff"
          color="#00f5ff"
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh ref={glowRef} geometry={geometry} scale={scale * 1.2}>
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Point light for glow effect */}
      <pointLight color="#00f5ff" intensity={2} distance={10} />
    </group>
  );
};
