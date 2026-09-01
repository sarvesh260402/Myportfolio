import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial } from '@react-three/drei';

function AvatarCore({ isSpeaking, isThinking }) {
  const meshRef = useRef();
  const outerMeshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * (isThinking ? 1.5 : isSpeaking ? 0.8 : 0.3);
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y = -time * 0.4;
      outerMeshRef.current.rotation.z = Math.cos(time * 0.3) * 0.2;
    }
  });

  const speed = isThinking ? 4 : isSpeaking ? 3 : 1.5;
  const distort = isThinking ? 0.6 : isSpeaking ? 0.45 : 0.25;

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.2}>
      {/* Inner Glowing Holographic Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <MeshDistortMaterial
          color={isThinking ? "#00e5ff" : isSpeaking ? "#d4af37" : "#0077ff"}
          emissive={isThinking ? "#00e5ff" : isSpeaking ? "#d4af37" : "#00e5ff"}
          emissiveIntensity={0.6}
          distort={distort}
          speed={speed}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Glass Ring */}
      <mesh ref={outerMeshRef}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Cyan & Gold Point Lights */}
      <pointLight position={[2, 2, 2]} color="#00e5ff" intensity={2} />
      <pointLight position={[-2, -2, -2]} color="#d4af37" intensity={2} />
    </Float>
  );
}

export default function ShreeAvatar({ isSpeaking = false, isThinking = false, style }) {
  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none', ...style }}>
      <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} dpr={[1, 2]} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.6} />
        <AvatarCore isSpeaking={isSpeaking} isThinking={isThinking} />
      </Canvas>
    </div>
  );
}
