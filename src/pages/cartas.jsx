import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlipBook from '../components/FlipBook';
import '../App.css';

const Cartas = () => {
    const navigate = useNavigate();

    const myPages = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ];

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card-height bg-secondary rounded-4 position-relative" style={{width: '80%', maxWidth: '1200px', overflow: 'hidden'}}>
              <button 
                onClick={() => navigate('/opciones')} 
                className="btn btn-link text-white position-absolute top-0 start-0 m-3"
                style={{zIndex: 10, textDecoration: 'none', fontSize: '1.1rem'}}
              >
                ← Regresar
              </button>
            <FlipBook pages={myPages} />
            </div>
        </div>
    );
};

export default Cartas;