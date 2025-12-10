import { useState, useEffect, useRef } from 'react';
import Modal from './modal';
import '../style/StellarCarousel.css';

function Carrousel({ images }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(false);
  const [currentSlides] = useState(images);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const carouselRef = useRef(null);
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);

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

  const handleImageClick = (imageUrl, index) => {
    setSelectedImage({ src: imageUrl, alt: `Slide ${index + 1}` });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
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

  return (
    <>
      <main id="carousel-container" tabIndex="-1">
        <section ref={carouselRef} id="stellar-carousel" aria-label="Stellar Slide Carousel" tabIndex="0">
          {currentSlides.map((imageUrl, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === activeIdx ? 'active' : ''}`}
              style={getSlideStyle(index)}
              tabIndex="0"
              role="group"
              aria-label={`Slide ${index + 1}`}
              aria-hidden={index !== activeIdx}
            >
              <img 
                src={imageUrl} 
                alt={`Slide ${index + 1}`}
                onClick={() => handleImageClick(imageUrl, index)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '24px',
                  cursor: 'pointer'
                }}
              />
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
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => handleGoTo(index)}
            />
          ))}
        </nav>
      </main>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        image={selectedImage} 
      />
    </>
  );
}

export default Carrousel;