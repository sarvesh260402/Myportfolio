import { motion } from 'framer-motion';

export default function Philosophy() {
  const words = "CODE. CREATE. INNOVATE.".split(" ");

  return (
    <section className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      
      {/* Background Particles placeholder */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, opacity: 0.2, backgroundImage: 'radial-gradient(circle at center, var(--accent-cyan) 0%, transparent 60%)' }} />

      <div style={{ display: 'flex', gap: '2vw', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {words.map((word, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2, type: 'spring' }}
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 'bold' }}
            className="gradient-text"
          >
            {word}
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '600px', lineHeight: 1.8 }}
      >
        I build applications that combine technology, intelligence and meaningful user experiences.
      </motion.p>
    </section>
  );
}
