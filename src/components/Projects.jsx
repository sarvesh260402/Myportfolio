import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const projects = [
  {
    title: "COMPLAINT MANAGEMENT",
    description: "Complaint management involves receiving and addressing student concerns related to academics, facilities or services in a timely and fair manner. It includes recording issues, coordinating with departments and ensuring proper resolution.",
    image: "resources/task.png",
    link: "https://github.com/sarvesh260402"
  },
  {
    title: "SHAREBITE",
    description: "A food sharing app designed to connect people who have surplus food with those who need it, helping reduce food waste. Users can post available food, request items and coordinate pickups.",
    image: "resources/Sharebite.png",
    link: "https://sharebite-1-j9ms.onrender.com/"
  },
  {
    title: "TASKEY",
    description: "A task management system for office use that helps organize, assign and track daily tasks and projects among employees.",
    image: "resources/Taskey.png",
    link: "https://taskey-9imu.onrender.com/"
  },
  {
    title: "VELMORA — AI-POWERED SHOPPING PLATFORM",
    description: "An AI-driven e-commerce platform that helps users discover products through intelligent recommendations, visualize items using AI-powered virtual try-on technology and preview how products look before purchase.",
    image: "resources/AI-Builder.png",
    link: "https://github.com/sarvesh260402"
  },
  {
    title: "GETONDEAL — AI PLAN RECOMMENDATION",
    description: "An AI-based platform that helps users find the best deals, compare plans and prices, and receive personalized recommendations based on their needs.",
    image: "resources/Food Sharing.png",
    link: "https://getondeal.onrender.com/"
  },
  {
    title: "GUDIYA — WOMEN'S EMERGENCY SAFETY APP",
    description: "A safety application that enables users to send emergency alerts with a single click, instantly notifying nearby authorities and emergency contacts.",
    image: "resources/Gudiye.png",
    link: "https://github.com/sarvesh260402"
  }
];

function ProjectCard({ project, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass interactive project-card"
      onClick={() => window.open(project.link, '_blank')}
    >
      <div style={{ transform: "translateZ(50px)", padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '200px', width: '100%', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.5rem', background: 'var(--bg-secondary)' }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-gold)' }}>{project.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, flexGrow: 1 }}>{project.description}</p>
        <button 
          className="btn-primary" 
          style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}
          onClick={(e) => { e.stopPropagation(); window.open(project.link, '_blank'); }}
        >
          VIEW PROJECT
        </button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="container" style={{ minHeight: '100vh', padding: '100px 0' }}>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}
      >
        SELECTED <span className="gradient-accent">PROJECTS</span>
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        perspective: '1000px'
      }}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      <style>{`
        .project-card {
          border-radius: 16px;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }
        .project-card:hover {
          border-color: var(--accent-cyan);
        }
      `}</style>
    </section>
  );
}
