export default function Footer() {
  return (
    <footer style={{ padding: '3rem 0', borderTop: '1px solid var(--glass-border)', marginTop: '4rem', background: 'rgba(5,5,5,0.8)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }} className="gradient-text">
          SARVESH GUPTA
        </div>
        <p style={{ color: 'var(--accent-gold)' }}>Oracle APEX & Full-Stack AI Developer</p>
        <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '1rem' }}>
          "Building intelligent digital experiences."
        </p>
        
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
          <a href="https://github.com/sarvesh260402" target="_blank" className="hover-cyan interactive" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }}>GitHub</a>
          <a href="https://linkedin.com/in/sarvesh-gupta-2300492aa" target="_blank" className="hover-cyan interactive" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }}>LinkedIn</a>
          <a href="mailto:skg232322@gmail.com" className="hover-cyan interactive" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }}>Email</a>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          © 2026 Sarvesh Gupta. All Rights Reserved.
        </p>
      </div>

      <style>{`
        .hover-cyan:hover {
          color: var(--accent-cyan) !important;
        }
      `}</style>
    </footer>
  );
}
