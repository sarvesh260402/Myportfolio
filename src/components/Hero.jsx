import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

function AnimatedSphere() {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#00e5ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
          emissive="#00e5ff"
          emissiveIntensity={0.5}
        />
      </Sphere>
      <Sphere args={[0.8, 32, 32]}>
        <meshPhysicalMaterial
          color="#d4af37"
          transmission={0.9}
          opacity={1}
          metalness={1}
          roughness={0}
          ior={1.5}
          thickness={0.5}
        />
      </Sphere>
    </Float>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero-section" style={{ height: '100vh', padding: 0, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} performance={{ min: 0.5 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 style={{ letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '0.8rem', fontSize: 'clamp(0.9rem, 3vw, 1.2rem)' }}>
            SARVESH GUPTA
          </h2>
          <h3 className="gold-accent" style={{ marginBottom: '1.5rem', fontSize: 'clamp(1.1rem, 4vw, 1.6rem)' }}>
            Oracle APEX & Full-Stack AI Developer
          </h3>
          <h1 style={{ marginBottom: '1.5rem', maxWidth: '800px' }}>
            Building Intelligent Digital Experiences <br />
            <span className="gradient-accent">with Code, AI & Innovation.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.6, marginBottom: '2.5rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)' }}>
            Software Developer experienced in Oracle APEX, Full-Stack Development, 
            AI Integration and modern user-focused applications.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn-primary" 
              style={{ background: 'var(--accent-cyan)', color: '#000', borderColor: 'var(--accent-cyan)', fontWeight: 'bold' }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              VIEW MY WORK
            </button>
            <button 
              className="btn-primary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              CONTACT ME
            </button>
            <a href="resources/Sarvesh-Gupta-FlowCV-Resume-20260213.pdf" download className="btn-primary" style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }}>
              DOWNLOAD RESUME
            </a>
          </div>
        </motion.div>
      </div>

      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: '1px', height: '30px', background: 'var(--text-secondary)' }}
        />
      </div>
    </section>
  );
}
