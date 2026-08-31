import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, MeshTransmissionMaterial, Text } from '@react-three/drei';
import { motion } from 'framer-motion';

function FloatingLaptop() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Simplified abstract laptop representation */}
        <Box args={[3, 0.1, 2]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </Box>
        <Box args={[3, 2, 0.1]} position={[0, 0.5, -0.95]} rotation={[-0.1, 0, 0]}>
          <MeshTransmissionMaterial 
            background="#000" 
            transmission={0.8} 
            thickness={0.5} 
            roughness={0.1}
            ior={1.2}
          />
        </Box>
        <Text
          position={[0, 0.5, -0.8]}
          fontSize={0.2}
          color="#00e5ff"
          anchorX="center"
          anchorY="middle"
        >
          {"< CODE />"}
        </Text>
      </Float>
    </group>
  );
}

export default function About() {
  return (
    <section id="about" className="container" style={{ display: 'flex', alignItems: 'center', minHeight: '100vh', gap: '4rem' }}>
      <div style={{ flex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>
            ABOUT <span className="gradient-accent">ME</span>
          </h2>
          <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Software Developer with experience in Oracle APEX and full-stack development, 
              skilled in building efficient, secure and user-friendly applications.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              A hardworking and adaptable developer with strong problem-solving skills and 
              the ability to quickly adapt to new technologies and environments.
            </p>
          </div>
        </motion.div>
      </div>

      <div style={{ flex: 1, height: '400px', position: 'relative' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} performance={{ min: 0.5 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <FloatingLaptop />
        </Canvas>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          #about {
            flex-direction: column;
            text-align: center;
          }
          #about > div {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
