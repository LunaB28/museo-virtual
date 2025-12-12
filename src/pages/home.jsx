import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../style/App.css';

function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/opciones');
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="card-height rounded-4 d-flex flex-column position-relative p-2" style={{width: '80%', maxWidth: '1200px', background: 'transparent'}}>
                    <div className="d-flex justify-content-center align-items-center flex-grow-1">
                        <button type="button" className="btn l-btn rounded-4 fst-italic" onClick={handleClick}> Iniciar recorrido</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Home;