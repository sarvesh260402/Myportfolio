import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShreeAvatar from './ShreeAvatar';

const KNOWLEDGE_BASE = {
  profile: {
    name: "Sarvesh Gupta",
    title: "Oracle APEX & Full-Stack AI Developer",
    summary: "Software Developer with experience in Oracle APEX and full-stack development, skilled in building efficient, secure and user-friendly applications. A hardworking and adaptable developer with strong problem-solving skills and the ability to quickly adapt to new technologies and environments."
  },
  experience: [
    {
      title: "Full Stack Developer / Oracle APEX Developer",
      company: "Nerd and Geeks",
      location: "Bengaluru, Karnataka",
      period: "08/2025 – 2026",
      description: "Experience in designing and developing secure, scalable, and user-friendly applications."
    },
    {
      title: "Employee",
      company: "Copyright Integrity International",
      location: "Bengaluru",
      period: "03/2024 – 06/2024",
      description: "Contributing to platforms that help prevent and ban illegal sports video distribution."
    }
  ],
  skills: [
    "Oracle APEX", "SQL", "HTML5", "JavaScript", "React.js", 
    "API Integration", "Oracle Database", "PL/SQL", "CSS3", 
    "Bootstrap", "Node.js", "AI Chatbot Integration", "Prompt Engineering"
  ],
  projects: [
    {
      name: "COMPLAINT MANAGEMENT",
      description: "Complaint management involves receiving and addressing student concerns related to academics, facilities or services in a timely and fair manner. It includes recording issues, coordinating with departments and ensuring proper resolution.",
      link: "https://github.com/sarvesh260402"
    },
    {
      name: "SHAREBITE",
      description: "A food sharing app designed to connect people who have surplus food with those who need it, helping reduce food waste. Users can post available food, request items and coordinate pickups.",
      link: "https://sharebite-1-j9ms.onrender.com/"
    },
    {
      name: "TASKEY",
      description: "A task management system for office use that helps organize, assign and track daily tasks and projects among employees. It allows monitoring of deadlines, progress and responsibilities to improve productivity and teamwork.",
      link: "https://taskey-9imu.onrender.com/"
    },
    {
      name: "VELMORA",
      title: "VELMORA — AI-POWERED SHOPPING PLATFORM",
      description: "An AI-driven e-commerce platform that helps users discover products through intelligent recommendations, visualize items using AI-powered virtual try-on technology and preview how products look before purchase.",
      link: "https://github.com/sarvesh260402"
    },
    {
      name: "GETONDEAL",
      title: "GETONDEAL — AI-POWERED PLAN RECOMMENDATION PLATFORM",
      description: "An AI-based platform that helps users find the best deals, compare plans and prices, and receive personalized recommendations based on their needs.",
      link: "https://getondeal.onrender.com/"
    },
    {
      name: "GUDIYA",
      title: "GUDIYA — WOMEN'S EMERGENCY SAFETY APP",
      description: "A safety application that enables users to send emergency alerts with a single click, instantly notifying nearby authorities and emergency contacts.",
      link: "https://github.com/sarvesh260402"
    }
  ],
  education: [
    { degree: "MCA", institution: "Garden City University", location: "Bengaluru", period: "08/2024 – Present" },
    { degree: "BSC IT", institution: "S N College", location: "Mumbai", period: "2021 – 2024" }
  ],
  certification: "Oracle Apex Diploma in Software Developer from Coursera",
  contact: {
    email: "skg232322@gmail.com",
    phone: "9096809952",
    linkedin: "https://linkedin.com/in/sarvesh-gupta-2300492aa",
    github: "https://github.com/sarvesh260402"
  }
};

export default function ShreeAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto greeting after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 2500);

    const minimizeTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 8500);

    return () => {
      clearTimeout(timer);
      clearTimeout(minimizeTimer);
    };
  }, []);

  // Initialize initial message
  useEffect(() => {
    setMessages([
      {
        sender: 'shree',
        text: "Hello! My name is Shree 👋\nI'm Sarvesh Gupta's official AI portfolio assistant. How may I help you explore his experience, skills, and projects?",
        action: null
      }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Speech Synthesis (Voice Output)
  const speakText = (text) => {
    if (!voiceMode || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#]/g, '').replace(/https?:\/\/\S+/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Speech Recognition (Voice Input)
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      handleSend(transcript);
    };

    recognition.start();
  };

  // Query Processor & Knowledge Engine
  const processQuery = (rawQuery) => {
    const q = rawQuery.toLowerCase().trim();

    // 1. Identity Check
    if (q.includes('are you sarvesh') || q.includes('who are you') || q.includes('your name')) {
      return {
        text: "No, I'm Shree, Sarvesh Gupta's AI portfolio assistant. I'm here to help you explore his professional information and projects.",
        action: null
      };
    }

    // 2. Navigation / Section Requests
    if (q.includes('show me project') || q.includes('what project') || q.includes('built project') || q.includes('portfolio project')) {
      scrollToSection('projects');
      return {
        text: "Here are Sarvesh's selected projects: Complaint Management, Sharebite, Taskey, Velmora (AI Shopping), GetOnDeal (AI Plan Recommendation), and Gudiya (Women's Safety).",
        action: { label: 'EXPLORE PROJECTS SECTION', target: 'projects' }
      };
    }

    if (q.includes('experience') || q.includes('work history') || q.includes('nerd and geeks') || q.includes('copyright integrity')) {
      scrollToSection('experience');
      return {
        text: "Sarvesh worked as a Full Stack Developer & Oracle APEX Developer at Nerd and Geeks (Bengaluru, 08/2025–2026), and previously at Copyright Integrity International (03/2024–06/2024).",
        action: { label: 'EXPLORE EXPERIENCE SECTION', target: 'experience' }
      };
    }

    if (q.includes('skill') || q.includes('technology') || q.includes('know react') || q.includes('know oracle') || q.includes('strongest')) {
      scrollToSection('skills');
      if (q.includes('strongest')) {
        return {
          text: "Sarvesh's portfolio highlights Oracle APEX, SQL, PL/SQL, React.js, JavaScript, Node.js, API integration and AI integration among his technical skills.",
          action: { label: 'VIEW TECH STACK', target: 'skills' }
        };
      }
      if (q.includes('react')) {
        return {
          text: "Yes! Sarvesh is highly skilled in React.js, along with JavaScript, HTML5, CSS3, and Node.js for full-stack web development.",
          action: { label: 'VIEW TECH STACK', target: 'skills' }
        };
      }
      return {
        text: "Sarvesh's technical skillset includes: Oracle APEX, SQL, PL/SQL, Oracle Database, HTML5, CSS3, Bootstrap, JavaScript, React.js, Node.js, API Integration, AI Chatbot Integration, and Prompt Engineering.",
        action: { label: 'VIEW TECH STACK', target: 'skills' }
      };
    }

    if (q.includes('education') || q.includes('degree') || q.includes('mca') || q.includes('bsc') || q.includes('certification') || q.includes('college')) {
      scrollToSection('education');
      return {
        text: "Education & Certification:\n• MCA — Garden City University, Bengaluru (08/2024 – Present)\n• BSC IT — S N College, Mumbai (2021 – 2024)\n• Certification — Oracle Apex Diploma in Software Developer (Coursera)",
        action: { label: 'VIEW EDUCATION SECTION', target: 'education' }
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach')) {
      scrollToSection('contact');
      return {
        text: "You can reach Sarvesh via:\n• Email: skg232322@gmail.com\n• Phone: 9096809952\n• LinkedIn: linkedin.com/in/sarvesh-gupta-2300492aa\n• GitHub: github.com/sarvesh260402",
        action: { label: 'OPEN CONTACT SECTION', target: 'contact' }
      };
    }

    // Specific Project Queries
    if (q.includes('velmora')) {
      return {
        text: "VELMORA — AI-POWERED SHOPPING PLATFORM:\nAn AI-driven e-commerce platform that helps users discover products through intelligent recommendations, visualize items using AI-powered virtual try-on technology and preview how products look before purchase.",
        action: { label: 'VIEW PROJECTS', target: 'projects' }
      };
    }

    if (q.includes('sharebite')) {
      return {
        text: "SHAREBITE:\nA food sharing app designed to connect people who have surplus food with those who need it, helping reduce food waste. Users can post available food, request items and coordinate pickups.",
        action: { label: 'VIEW SHAREBITE LIVE', link: 'https://sharebite-1-j9ms.onrender.com/' }
      };
    }

    if (q.includes('taskey')) {
      return {
        text: "TASKEY:\nA task management system for office use that helps organize, assign and track daily tasks and projects among employees. It allows monitoring of deadlines, progress and responsibilities to improve productivity and teamwork.",
        action: { label: 'VIEW TASKEY LIVE', link: 'https://taskey-9imu.onrender.com/' }
      };
    }

    if (q.includes('getondeal')) {
      return {
        text: "GETONDEAL — AI-POWERED PLAN RECOMMENDATION PLATFORM:\nAn AI-based platform that helps users find the best deals, compare plans and prices, and receive personalized recommendations based on their needs.",
        action: { label: 'VIEW GETONDEAL LIVE', link: 'https://getondeal.onrender.com/' }
      };
    }

    if (q.includes('gudiya')) {
      return {
        text: "GUDIYA — WOMEN'S EMERGENCY SAFETY APP:\nA safety application that enables users to send emergency alerts with a single click, instantly notifying nearby authorities and emergency contacts.",
        action: { label: 'VIEW PROJECTS', target: 'projects' }
      };
    }

    if (q.includes('complaint')) {
      return {
        text: "COMPLAINT MANAGEMENT:\nComplaint management involves receiving and addressing student concerns related to academics, facilities or services in a timely and fair manner. It includes recording issues, coordinating with departments and ensuring proper resolution.",
        action: { label: 'VIEW PROJECTS', target: 'projects' }
      };
    }

    if (q.includes('who is sarvesh') || q.includes('about sarvesh') || q.includes('tell me about sarvesh') || q.includes('profile')) {
      scrollToSection('about');
      return {
        text: "Sarvesh Gupta is an Oracle APEX & Full-Stack AI Developer skilled in building efficient, secure, and user-friendly applications. He is hardworking, adaptable, and specializes in React, Node.js, Oracle APEX, and AI Integration.",
        action: { label: 'ABOUT SARVESH', target: 'about' }
      };
    }

    // Out-of-scope refusal logic
    return {
      text: "I'm Shree, Sarvesh Gupta's portfolio assistant. I can only help you with information about Sarvesh, his experience, skills, projects, education and this website.",
      action: null
    };
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSend = (textToSend = null) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    setTimeout(() => {
      const response = processQuery(query);
      setIsThinking(false);
      setMessages(prev => [...prev, { sender: 'shree', text: response.text, action: response.action }]);
      speakText(response.text);
    }, 700);
  };

  const handleSuggestionClick = (question) => {
    handleSend(question);
  };

  return (
    <>
      {/* Floating Greeting Bubble (2-3s auto) */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={() => { setIsOpen(true); setShowGreeting(false); }}
            style={{
              position: 'fixed',
              bottom: '95px',
              right: '25px',
              zIndex: 999,
              background: 'rgba(15, 15, 25, 0.9)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--accent-cyan)',
              boxShadow: '0 10px 30px rgba(0, 229, 255, 0.3)',
              borderRadius: '16px',
              padding: '12px 18px',
              color: '#fff',
              fontSize: '0.85rem',
              maxWidth: '260px',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontWeight: 'bold', color: 'var(--accent-gold)', marginBottom: '4px' }}>SHREE AI</div>
            <div>Hello! My name is Shree 👋<br/>I'm Sarvesh's AI portfolio assistant. How may I help you?</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bottom-Right Shree Floating Button */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setShowGreeting(false); }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          zIndex: 1000,
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          background: 'rgba(10, 10, 20, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--accent-cyan)',
          boxShadow: '0 0 25px rgba(0, 229, 255, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
        className="interactive"
        title="Ask Shree about Sarvesh"
      >
        <div style={{ width: '50px', height: '50px', position: 'relative' }}>
          <ShreeAvatar isSpeaking={isSpeaking} isThinking={isThinking} />
        </div>
        <div style={{
          position: 'absolute',
          bottom: '4px',
          fontSize: '0.55rem',
          fontWeight: 'bold',
          letterSpacing: '1px',
          color: 'var(--accent-gold)'
        }}>
          ● ONLINE
        </div>
      </motion.button>

      {/* Glassmorphism Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '25px',
              zIndex: 1001,
              width: 'min(400px, 90vw)',
              height: '560px',
              background: 'rgba(10, 10, 18, 0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              borderRadius: '24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(0, 229, 255, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.2rem 1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ width: '40px', height: '40px' }}>
                  <ShreeAvatar isSpeaking={isSpeaking} isThinking={isThinking} />
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', letterSpacing: '1px', color: 'var(--accent-gold)', fontSize: '1rem' }}>
                    SHREE
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Sarvesh's AI Portfolio Assistant &nbsp;<span style={{ color: 'var(--accent-cyan)' }}>● Online</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {/* Voice Toggle */}
                <button
                  onClick={() => setVoiceMode(!voiceMode)}
                  style={{
                    background: voiceMode ? 'rgba(0, 229, 255, 0.2)' : 'transparent',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    color: voiceMode ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    padding: '4px 8px',
                    cursor: 'pointer'
                  }}
                  title="Toggle Voice Output"
                >
                  {voiceMode ? '🔊 Voice ON' : '🔇 Voice OFF'}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '4px' }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Voice Waveform Indicator */}
            {(isSpeaking || isListening) && (
              <div style={{ padding: '6px 16px', background: 'rgba(0, 229, 255, 0.1)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <div style={{ width: '3px', height: '12px', background: 'var(--accent-cyan)', animation: 'pulse 0.5s infinite alternate' }} />
                  <div style={{ width: '3px', height: '16px', background: 'var(--accent-cyan)', animation: 'pulse 0.7s infinite alternate' }} />
                  <div style={{ width: '3px', height: '10px', background: 'var(--accent-cyan)', animation: 'pulse 0.4s infinite alternate' }} />
                </div>
                <span>{isListening ? '🎤 Listening...' : '🔊 Shree is speaking...'}</span>
              </div>
            )}

            {/* Chat Messages */}
            <div style={{ flex: 1, padding: '1.2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    background: msg.sender === 'user' 
                      ? 'linear-gradient(135deg, var(--accent-cyan), #0077ff)' 
                      : 'rgba(25, 25, 35, 0.8)',
                    color: msg.sender === 'user' ? '#000' : '#fff',
                    padding: '10px 14px',
                    borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    border: msg.sender === 'shree' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {msg.text}
                  {msg.action && (
                    <div style={{ marginTop: '8px' }}>
                      {msg.action.link ? (
                        <a
                          href={msg.action.link}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            background: 'var(--accent-gold)',
                            color: '#000',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            textDecoration: 'none'
                          }}
                        >
                          {msg.action.label} ↗
                        </a>
                      ) : (
                        <button
                          onClick={() => scrollToSection(msg.action.target)}
                          style={{
                            padding: '4px 10px',
                            background: 'var(--accent-gold)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          {msg.action.label} ↓
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}

              {isThinking && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(25, 25, 35, 0.8)', padding: '10px 14px', borderRadius: '16px', fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                  Thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div style={{ padding: '8px 12px', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {[
                "Who is Sarvesh?",
                "Tell me about his skills",
                "What projects has he built?",
                "Tell me about his experience",
                "What is Velmora?",
                "What is Sharebite?",
                "How can I contact him?"
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(q)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '4px 10px',
                    fontSize: '0.72rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                  className="hover-gold interactive"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              style={{
                padding: '10px 14px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                background: 'rgba(5,5,10,0.8)'
              }}
            >
              {/* Mic Button */}
              <button
                type="button"
                onClick={startListening}
                style={{
                  background: isListening ? 'rgba(0,229,255,0.3)' : 'transparent',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: isListening ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
                title="Speak to Shree"
              >
                🎤
              </button>

              <input
                type="text"
                placeholder="Ask Shree anything about Sarvesh..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />

              <button
                type="submit"
                style={{
                  background: 'var(--accent-gold)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#000',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0% { height: 6px; }
          100% { height: 16px; }
        }
      `}</style>
    </>
  );
}
