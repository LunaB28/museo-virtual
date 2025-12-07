import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Opciones = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card-height bg-secondary rounded-4 d-flex flex-column position-relative p-5" style={{width: '80%', maxWidth: '1200px'}}>
                <div className="mt-5"> 
                <h1 className="text-center">Texto que invita a seleccionar</h1>
                </div>
                <div className="d-flex justify-content-center align-items-center flex-grow-1 ">
                    <button type="button" className="btn btn-primary l-group" onClick={() => navigate('/proceso')}>Proceso</button>
                    <button type="button" className="btn btn-danger l-group mx-3" onClick={() => navigate('/cartas')}>Cartas</button>
                    <button type="button" className="btn btn-warning text-white l-group" onClick={() => navigate('/obras')}>Obras finales</button>
                </div>
        </div>
    </div>
    );
};

export default Opciones;