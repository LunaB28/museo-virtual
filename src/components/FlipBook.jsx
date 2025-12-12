import React, { useRef, forwardRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../style/FlipBook.css';

const PageCover = forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = forwardRef(({ header, number, children }, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2 className="page-header">{header || `Page ${number}`}</h2>
        <div className="page-text">{children}</div>
        <div className="page-footer">{number}</div>
      </div>
    </div>
  );
});

const FlipBook = ({ pages = [], coverTitle = "BOOK TITLE", endTitle = "THE END" }) => {
  const flipBookRef = useRef(null);
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const [bookSize, setBookSize] = useState({ width: 380, height: 550 });
  const [scale, setScale] = useState(1);

  // Calcular tamaño del libro basado en el ancho de la ventana
  useEffect(() => {
    const updateBookSize = () => {
      const windowWidth = window.innerWidth;
      
      if (windowWidth <= 412) {
        // Para pantallas pequeñas, usar 90% del ancho (sin límite máximo)
        const width = windowWidth * 0.9;
        const height = (width * 550) / 380; // Mantener proporción
        const scaleFactor = width / 380; // Calcular factor de escala
        setBookSize({ width: Math.floor(width), height: Math.floor(height) });
        setScale(scaleFactor);
      } else {
        // Tamaño original
        setBookSize({ width: 380, height: 550 });
        setScale(1);
      }
    };

    updateBookSize();
    window.addEventListener('resize', updateBookSize);
    return () => window.removeEventListener('resize', updateBookSize);
  }, []);

  // Initialize Audio
  useEffect(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0.5;
    } catch (error) {
      console.warn("Audio not supported:", error);
    }
  }, []);

  const playPageFlipSound = () => {
    if (!audioContextRef.current) return;

    // Sonido más realista de papel - usando ruido blanco filtrado
    const bufferSize = audioContextRef.current.sampleRate * 0.3; // 0.3 segundos
    const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
    const output = buffer.getChannelData(0);

    // Generar ruido blanco
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioContextRef.current.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = audioContextRef.current.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2000, audioContextRef.current.currentTime);
    filter.Q.setValueAtTime(1, audioContextRef.current.currentTime);

    const gain = audioContextRef.current.createGain();
    gain.gain.setValueAtTime(0.15, audioContextRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.25);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(gainNodeRef.current);

    whiteNoise.start();
    whiteNoise.stop(audioContextRef.current.currentTime + 0.3);
  };

  const handleFlip = (e) => {
    playPageFlipSound();
  };

  return (
    <div className="flipbook-container">
      <style>{`
        .demo-book .page-content {
          font-size: ${scale}rem;
        }
        .demo-book .page-header {
          font-size: ${1.2 * scale}rem;
        }
        .demo-book .page-text {
          font-size: ${1 * scale}rem;
        }
        .demo-book .page-footer {
          font-size: ${0.9 * scale}rem;
        }
        .demo-book .page-cover .page-content {
          font-size: ${2 * scale}rem;
        }
      `}</style>
      <HTMLFlipBook
        key={`${bookSize.width}-${bookSize.height}`}
        width={bookSize.width}
        height={bookSize.height}
        size="stretch"
        minWidth={Math.floor(bookSize.width * 0.7)}
        maxWidth={Math.floor(bookSize.width * 1.2)}
        minHeight={Math.floor(bookSize.height * 0.7)}
        maxHeight={Math.floor(bookSize.height * 1.2)}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="demo-book"
        ref={flipBookRef}
        onFlip={handleFlip}
      >
        <PageCover>{coverTitle}</PageCover>
        
        {pages.map((page, index) => {
          // Si page es un objeto con header y content, usar esos valores
          if (typeof page === 'object' && page !== null) {
            return (
              <Page key={index} number={index + 1} header={page.header}>
                {page.content}
              </Page>
            );
          }
          // Si page es un string, usarlo como contenido
          return (
            <Page key={index} number={index + 1}>
              {page}
            </Page>
          );
        })}
        
        <PageCover>{endTitle}</PageCover>
      </HTMLFlipBook>
    </div>
  );
};

export default FlipBook;
