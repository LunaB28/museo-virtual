import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carrousel from '../components/carrousel';
import '../style/App.css';

const Obras = () => {
  const navigate = useNavigate();
      const myImages = [
    "/guardiánI.jpg",
    "/guardiánII.jpg"
  ];

    return (
      <>
     <div className="d-flex justify-content-center align-items-center min-vh-100">
            <button 
              onClick={() => navigate('/opciones')} 
              className="btn btn-link text-white position-fixed top-0 start-0 m-4"
              style={{zIndex: 1000, textDecoration: 'none', fontSize: '1.5rem'}}
            >
              ← Regresar
            </button>
            <div className="card-height rounded-4 position-relative" style={{width: '80%', maxWidth: '1200px', overflow: 'visible', background: 'transparent'}}>
         <Carrousel 
        images={myImages}
      /> 
      </div>
     </div>
    </>
    );
};

export default Obras;