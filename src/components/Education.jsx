import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section id="education" className="container" style={{ padding: '100px 0' }}>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}
      >
        EDUCATION & <span className="gradient-accent">CERTIFICATION</span>
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        
        {/* Education Timeline */}
        <div style={{ position: 'relative', paddingLeft: '20px' }}>
          <div style={{ position: 'absolute', left: '0', top: '10px', bottom: '0', width: '2px', background: 'var(--glass-border)' }} />
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ position: 'relative', marginBottom: '3rem' }}
          >
            <div style={{ position: 'absolute', left: '-26px', top: '8px', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
            <h3 style={{ fontSize: '1.4rem' }}>MCA</h3>
            <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>Garden City University</h4>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>08/2024 – Present | Bengaluru</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'absolute', left: '-26px', top: '8px', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
            <h3 style={{ fontSize: '1.4rem' }}>BSC IT</h3>
            <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>S N College</h4>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>2021 – 2024 | Mumbai</div>
          </motion.div>
        </div>

        {/* Certification Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass interactive cert-card"
          style={{ padding: '3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          {/* Holographic effect */}
          <div className="holo-glare" />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', zIndex: 1 }}>Oracle Apex Diploma in Software Developer</h3>
          <h4 className="gold-accent" style={{ fontSize: '1.2rem', zIndex: 1 }}>Coursera</h4>
        </motion.div>

      </div>

      <style>{`
        .cert-card {
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .cert-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent-gold);
        }
        .holo-glare {
          position: absolute;
          top: 0; left: -100%; right: 0; bottom: 0;
          width: 50%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: skewX(-20deg);
          transition: left 0.7s ease;
          z-index: 0;
        }
        .cert-card:hover .holo-glare {
          left: 200%;
        }
      `}</style>
    </section>
  );
}
