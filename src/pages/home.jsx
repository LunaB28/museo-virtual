import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/opciones');
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card-height bg-secondary rounded-4 d-flex flex-column position-relative p-5" style={{width: '80%', maxWidth: '1200px'}}>
               <div className="mt-5"> 
                <h1 className="text-center">Frase de bienvenida con mejor redacción</h1>
                </div>
                <div className="d-flex justify-content-center align-items-center flex-grow-1">
                    <button type="button" className="btn btn-primary l-btn" onClick={handleClick}>Iniciar recorrido</button>
                </div>
                
            </div>
        </div>
    );
}
export default Home;