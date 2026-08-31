import { motion } from 'framer-motion';

const experiences = [
  {
    title: "FULL STACK DEVELOPER / ORACLE APEX DEVELOPER",
    company: "Nerd and Geeks",
    location: "Bengaluru, Karnataka",
    period: "08/2025 – 2026",
    description: "Experience in designing and developing secure, scalable and user-friendly applications."
  },
  {
    title: "EMPLOYEE",
    company: "Copyright Integrity International",
    location: "Bengaluru",
    period: "03/2024 – 06/2024",
    description: "Contributing to platforms that help prevent and ban illegal sports video distribution."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}
      >
        PROFESSIONAL <span className="gradient-accent">EXPERIENCE</span>
      </motion.h2>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* Vertical Line */}
        <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'var(--glass-border)' }} />

        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            style={{ position: 'relative', paddingLeft: '60px', marginBottom: '4rem' }}
            className="experience-item"
          >
            {/* Timeline Dot */}
            <div style={{ 
              position: 'absolute', 
              left: '14px', 
              top: '8px', 
              width: '14px', 
              height: '14px', 
              borderRadius: '50%', 
              background: 'var(--accent-cyan)',
              boxShadow: '0 0 10px var(--accent-cyan)'
            }} />
            
            <div className="glass interactive" style={{ padding: '2rem', borderRadius: '12px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                 onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 229, 255, 0.1)'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{exp.title}</h3>
              <h4 className="gold-accent" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{exp.company}</h4>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>{exp.period}</span>
                <span>|</span>
                <span>{exp.location}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
