import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const links = ['HOME', 'ABOUT', 'EXPERIENCE', 'SKILLS', 'PROJECTS', 'EDUCATION', 'CONTACT'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // ScrollSpy logic to determine active section
      const sections = links.map(link => link.toLowerCase());
      let current = 'home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the top of the viewport
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      }
      
      // Special case: if we are at the very top, set home
      if (window.scrollY < 100) current = 'home';
      
      // Special case: if we are at the very bottom, set contact
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        current = 'contact';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px', cursor: 'pointer' }} className="gradient-text interactive" onClick={() => { document.getElementById('home')?.scrollIntoView({behavior: 'smooth'}) }}>
        SG
      </div>
      
      {/* Desktop Menu */}
      <div style={{ display: 'none' }} className="desktop-nav">
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          {links.map((link) => {
            const sectionId = link.toLowerCase();
            const isActive = activeSection === sectionId;
            return (
              <li key={link} style={{ position: 'relative' }}>
                <button 
                  onClick={() => {
                    const el = document.getElementById(sectionId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ 
                    fontSize: '0.8rem', 
                    letterSpacing: '1px', 
                    transition: 'color 0.3s ease',
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-primary)',
                    fontWeight: isActive ? 'bold' : 'normal',
                    padding: '8px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  className="hover-gold interactive"
                >
                  {link}
                </button>
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent-gold)'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Menu Button */}
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
            {links.map((link) => {
              const sectionId = link.toLowerCase();
              const isActive = activeSection === sectionId;
              return (
                <li key={link}>
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      const el = document.getElementById(sectionId);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ 
                      fontSize: '2rem', 
                      fontWeight: 'bold',
                      color: isActive ? 'var(--accent-gold)' : 'var(--text-primary)' 
                    }}
                    className={`interactive ${!isActive ? 'gradient-text' : ''}`}
                  >
                    {link}
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
        .hover-gold:hover { color: var(--accent-gold) !important; }
      `}</style>
    </motion.nav>
  );
}
