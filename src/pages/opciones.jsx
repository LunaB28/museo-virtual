import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../style/App.css';

const Opciones = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className=" rounded-4 d-flex flex-column justify-content-center align-items-center position-relative p-2" style={{width: '80%', background: 'transparent'}}>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <button type="button" className="btn btn-a l-group my-2" onClick={() => navigate('/proceso')}>Esbozos</button>
                        <button type="button" className="btn btn-b l-group my-2" onClick={() => navigate('/cartas')}>Pergaminos</button>
                        <button type="button" className="btn btn-c text-white l-group my-2" onClick={() => navigate('/obras')}>Guardianes</button>
                    </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Opciones;