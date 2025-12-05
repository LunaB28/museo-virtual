import { useState, useEffect, useRef } from 'react';
import '../StellarCarousel.css';

function StellarCarousel({ slides, autoStart = false, initialSpeed = 'normal' }) {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(false);
  const [currentSlides] = useState(slides);

  const starfieldRef = useRef(null);
  const particlesRef = useRef(null);
  const cursorRef = useRef(null);
  const carouselRef = useRef(null);
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Loading effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 18;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return newProgress;
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  // Initialize Audio
  useEffect(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.7;

      // Create ambient sound
      const oscillator1 = audioContextRef.current.createOscillator();
      const oscillator2 = audioContextRef.current.createOscillator();
      const filter = audioContextRef.current.createBiquadFilter();
      const ambientGain = audioContextRef.current.createGain();

      oscillator1.type = "sine";
      oscillator1.frequency.setValueAtTime(40, audioContextRef.current.currentTime);
      oscillator2.type = "sine";
      oscillator2.frequency.setValueAtTime(80.1, audioContextRef.current.currentTime);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, audioContextRef.current.currentTime);
      ambientGain.gain.setValueAtTime(0.05, audioContextRef.current.currentTime);

      oscillator1.connect(filter);
      oscillator2.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(gainNodeRef.current);

      oscillator1.start();
      oscillator2.start();
    } catch (error) {
      console.warn("Audio not supported:", error);
    }
  }, []);

  // Starfield effect
  useEffect(() => {
    if (!starfieldRef.current || loading) return;
    
    const canvas = starfieldRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let l = 0; l < 3; l++) {
        for (let i = 0; i < 80 + l * 40; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: l + 1,
            r: Math.random() * (1.2 + l * 0.6),
            alpha: 0.5 + Math.random() * 0.5
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = s.z === 1 ? "#fff" : s.z === 2 ? "#ffd700" : "#6c3fd1";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8 * s.z;
        ctx.fill();
        ctx.restore();
      }
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [loading]);

  // Particles effect
  useEffect(() => {
    if (!particlesRef.current || loading) return;
    
    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 48; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          r: 2 + Math.random() * 3,
          color: `rgba(108,63,209,${0.5 + Math.random() * 0.5})`
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#ffd700";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [loading]);

  // Custom cursor
  useEffect(() => {
    if (!cursorRef.current) return;
    
    const cursor = cursorRef.current;
    
    const handleMouseMove = (e) => {
      cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px) scale(1)`;
      cursor.style.opacity = '0.8';
    };
    
    const handleMouseDown = () => {
      cursor.style.transform += ' scale(0.7)';
      cursor.style.opacity = '0.5';
    };
    
    const handleMouseUp = () => {
      cursor.style.transform = cursor.style.transform.replace(' scale(0.7)', ' scale(1)');
      cursor.style.opacity = '0.8';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      
      switch (e.key) {
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'Home':
          setActiveIdx(0);
          playNavSound();
          break;
        case 'End':
          setActiveIdx(currentSlides.length - 1);
          playNavSound();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSlides.length]);

  const playNavSound = () => {
    if (!audioContextRef.current || muted) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContextRef.current.currentTime + 0.2);

    gain.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.2);

    oscillator.connect(gain);
    gain.connect(gainNodeRef.current);

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.2);
  };

  const handleNext = () => {
    setActiveIdx(prev => (prev + 1) % currentSlides.length);
    playNavSound();
  };

  const handlePrev = () => {
    setActiveIdx(prev => (prev - 1 + currentSlides.length) % currentSlides.length);
    playNavSound();
  };

  const handleGoTo = (idx) => {
    setActiveIdx(idx);
    playNavSound();
  };

  const getSlideStyle = (index) => {
    const angleStep = 360 / currentSlides.length;
    const angle = ((index - activeIdx) * angleStep * Math.PI) / 180;
    const radius = 420;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${(index - activeIdx) * angleStep}deg)`,
    };
  };

  if (loading) {
    return (
      <div id="loading-screen" role="status" aria-live="polite">
        <div>
          <span style={{ fontSize: '2.2rem', color: 'var(--stellar-gold)', fontFamily: 'var(--font-main)' }}>
            Stellar Slide Navigator
          </span>
          <div id="loading-progress" aria-label="Loading progress">
            <div id="loading-bar" style={{ width: `${Math.floor(loadingProgress)}%` }}></div>
          </div>
          <span id="loading-text" style={{ marginTop: '12px', fontSize: '1rem', color: '#fff' }}>
            Loading assets... {Math.floor(loadingProgress)}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <canvas ref={starfieldRef} id="starfield" aria-hidden="true"></canvas>
      <canvas ref={particlesRef} id="particles" aria-hidden="true"></canvas>
      <div ref={cursorRef} id="custom-cursor" aria-hidden="true"></div>
      
      <main id="carousel-container" tabIndex="-1">
        <section ref={carouselRef} id="stellar-carousel" aria-label="Stellar Slide Carousel" tabIndex="0">
          {currentSlides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === activeIdx ? 'active' : ''}`}
              style={getSlideStyle(index)}
              tabIndex="0"
              role="group"
              aria-label={`${slide.title}: ${slide.desc}`}
              aria-hidden={index !== activeIdx}
            >
              <span className="slide-icon">{slide.icon}</span>
              <span className="slide-title">{slide.title}</span>
              <span className="slide-desc">{slide.desc}</span>
            </div>
          ))}
        </section>

        <nav id="carousel-controls" aria-label="Carousel Controls">
          <button className="nav-btn" id="prev-btn" aria-label="Previous Slide" onClick={handlePrev}>‹</button>
          <button className="nav-btn" id="next-btn" aria-label="Next Slide" onClick={handleNext}>›</button>
        </nav>

        <nav id="dot-nav" aria-label="Slide Navigation">
          {currentSlides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIdx ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}: ${currentSlides[index].title}`}
              onClick={() => handleGoTo(index)}
            />
          ))}
        </nav>
      </main>
    </>
  );
}

export default StellarCarousel;