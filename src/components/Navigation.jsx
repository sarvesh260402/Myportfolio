import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['HOME', 'ABOUT', 'EXPERIENCE', 'SKILLS', 'PROJECTS', 'EDUCATION', 'CONTACT'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(5,5,5,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }} className="gradient-text">
        SG
      </div>
      
      {/* Desktop Menu */}
      <div style={{ display: 'none' }} className="desktop-nav">
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          {links.map((link) => (
            <li key={link}>
              <a 
                href={`#${link.toLowerCase()}`} 
                style={{ 
                  fontSize: '0.8rem', 
                  letterSpacing: '1px', 
                  transition: 'color 0.3s ease',
                }}
                className="hover-gold interactive"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Button - simplify for now */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ color: 'var(--text-primary)', zIndex: 101 }}
        className="mobile-menu-btn interactive"
      >
        {menuOpen ? 'CLOSE' : 'MENU'}
      </button>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--bg-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100
          }}
        >
          <ul style={{ listStyle: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {links.map((link) => (
              <li key={link}>
                <a 
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  style={{ fontSize: '2rem', fontWeight: 'bold' }}
                  className="interactive gradient-text"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
        .hover-gold:hover { color: var(--accent-gold); }
      `}</style>
    </motion.nav>
  );
}
