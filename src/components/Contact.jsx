import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="container" style={{ padding: '100px 0' }}>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}
      >
        LET'S BUILD SOMETHING <span className="gradient-accent">AMAZING</span>
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>Email</h3>
            <p>skg232322@gmail.com</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>Phone</h3>
            <p>9096809952</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>Social</h3>
            <p><a href="https://linkedin.com/in/sarvesh-gupta-2300492aa" target="_blank" className="hover-gold">LinkedIn</a></p>
            <p style={{ marginTop: '0.5rem' }}><a href="https://github.com/sarvesh260402" target="_blank" className="hover-gold">GitHub</a></p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form 
            action="https://formsubmit.co/skg232322@gmail.com" 
            method="POST" 
            className="glass" 
            onSubmit={handleSubmit} 
            style={{ padding: '3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}
          >
            
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={window.location.href} />

            <AnimatePresence>
              {submitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5,5,5,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, borderRadius: '16px', flexDirection: 'column' }}
                >
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--accent-cyan)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem', color: 'var(--accent-cyan)', fontSize: '2rem' }}>
                    ✓
                  </div>
                  <h3 className="gradient-accent">MESSAGE SENT</h3>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Name</label>
              <input type="text" name="name" required className="form-input interactive" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
              <input type="email" name="email" required className="form-input interactive" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Message</label>
              <textarea name="message" rows="4" required className="form-input interactive" style={{ resize: 'none' }}></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '15px' }}>SEND MESSAGE</button>
          </form>
        </motion.div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(0,0,0,0.5);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: var(--text-primary);
          font-family: inherit;
          transition: all 0.3s ease;
          outline: none;
        }
        .form-input:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
        }
      `}</style>
    </section>
  );
}
