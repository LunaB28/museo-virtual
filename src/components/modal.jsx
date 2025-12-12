import React, { useState, useEffect } from 'react';
import '../style/modal.css';

const Modal = ({ isOpen, onClose, image, fichaTecnica }) => {
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const updateOrientation = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };

        updateOrientation();
        window.addEventListener('resize', updateOrientation);
        return () => window.removeEventListener('resize', updateOrientation);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${isLandscape ? 'landscape' : 'portrait'}`} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                <img src={image.src} alt={image.alt || 'Modal image'} className="modal-image" />
                
                {fichaTecnica && (
                    <div className="ficha-tecnica-modal">
                        {fichaTecnica.autor && <h3>{fichaTecnica.autor}</h3>}
                        {fichaTecnica.titulo && <p><strong>{fichaTecnica.titulo}</strong> </p>}
                        {fichaTecnica.tecnica && <p><strong>{fichaTecnica.tecnica}</strong></p>}
                        {fichaTecnica.año && <p><strong>{fichaTecnica.año}</strong> </p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;