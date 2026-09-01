import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ShreeAI from './components/ShreeAI';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only initialize Lenis smooth scroll on non-touch desktop screens to prevent mobile scroll sticking
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      infinite: false,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <Navigation />
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <Philosophy />
            <Contact />
          </main>
          <Footer />
          <ShreeAI />
        </>
      )}
    </>
  );
}

export default App;
