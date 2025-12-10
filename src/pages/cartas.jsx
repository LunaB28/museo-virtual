import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlipBook from '../components/FlipBook';
import '../style/FlipBook.css';

const Cartas = () => {
    const navigate = useNavigate();

    const myPages = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ];

    return (
        <div className="d-flex justify-content-start align-items-center min-vh-100" style={{paddingLeft: '2%'}}>
            <button 
              onClick={() => navigate('/opciones')} 
              className="btn btn-link text-white position-fixed top-0 start-0 m-4"
              style={{zIndex: 1000, textDecoration: 'none', fontSize: '1.5rem'}}
            >
              ← Regresar
            </button>
            <div className="card-height rounded-4 position-relative d-flex justify-content-center align-items-center" style={{width: '80%', background: 'transparent'}}>
            <FlipBook pages={myPages} />
            </div>
        </div>
    );
};

export default Cartas;