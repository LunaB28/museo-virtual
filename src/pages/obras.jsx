import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carrousel from '../components/carrousel';
import Footer from '../components/Footer';
import '../style/App.css';
import '../style/RegresarButton.css';

const Obras = () => {
  const navigate = useNavigate();
  
  const myImages = [
    "/guardianI.jpg",
    "/guardianII.jpg",
    "/guardianIII.jpeg",
    "/guardianIV.jpeg"
  ];

  // Fichas técnicas para las obras finales
  const fichasTecnicas = [
    {
      autor: "Alice",
      tecnica: "Lápices de colores sobre papel",
      año: "2025"
    },
    {
      autor: "Isabella",
      tecnica: "Lápices de colores sobre papel",
      año: "2025"
    },
    {
      autor: "Sharick",
      tecnica: "Lápices de colores sobre papel",
      año: "2025"
    },
    {
      autor: "Alejandro",
      tecnica: "Lápices de colores sobre papel",
      año: "2025"
    }
  ];

    return (
      <>
     <div className="d-flex justify-content-center align-items-center min-vh-100">
            <button 
              onClick={() => navigate('/opciones')} 
              className="btn btn-link text-white position-fixed top-0 start-0 m-4 regresar-btn"
            >
              <span className="texto-completo">← Regresar</span>
              <span className="texto-corto">←</span>
            </button>
            <div className="card-height rounded-4 position-relative" style={{width: '80%', maxWidth: '1200px', overflow: 'visible', background: 'transparent'}}>
         <Carrousel 
        images={myImages}
        fichasTecnicas={fichasTecnicas}
      /> 
      </div>
     </div>
     <Footer />
    </>
    );
};

export default Obras;