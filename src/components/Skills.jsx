import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const skills = [
  'Oracle APEX', 'SQL', 'HTML5', 'JavaScript', 'React.js', 
  'API Integration', 'Oracle DB', 'PL/SQL', 'CSS3', 
  'Bootstrap', 'Node.js', 'AI Chatbots', 'Prompt Eng'
];

function Constellation() {
  const groupRef = useRef();
  
  // Generate random positions for nodes in a sphere
  const nodes = useMemo(() => {
    return skills.map(() => {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 3 + Math.random() * 2;
      return [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ];
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center node */}
      <Float speed={2} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.5} wireframe />
        </mesh>
        <Text position={[0, -0.8, 0]} fontSize={0.3} color="#fff" anchorX="center" anchorY="middle">
          SARVESH
        </Text>
      </Float>

      {nodes.map((pos, i) => (
        <group key={i}>
          {/* Connection line to center */}
          <Line points={[[0,0,0], pos]} color="#00e5ff" transparent opacity={0.2} lineWidth={1} />
          
          <Float speed={1 + Math.random()} floatIntensity={0.5} position={pos}>
            <mesh>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshBasicMaterial color="#00e5ff" />
            </mesh>
            <Text 
              position={[0, -0.3, 0]} 
              fontSize={0.25} 
              color="#fff" 
              anchorX="center" 
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000"
            >
              {skills[i]}
            </Text>
          </Float>
        </group>
      ))}
    </group>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}
      >
        TECH <span className="gradient-accent">STACK</span>
      </motion.h2>
      
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        Interactive 3D Technology Constellation (Drag to rotate)
      </p>

      <div style={{ height: '600px', width: '100%', background: 'rgba(25,25,25,0.2)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)' }} className="interactive">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]} performance={{ min: 0.5 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Constellation />
        </Canvas>
      </div>
    </section>
  );
}
