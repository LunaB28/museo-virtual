import React from 'react';
import '../style/modal.css';

const Modal = ({ isOpen, onClose, image }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                <img src={image.src} alt={image.alt || 'Modal image'} className="modal-image" />
            </div>
        </div>
    );
};

export default Modal;