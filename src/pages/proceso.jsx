import Carrousel from '../components/carrousel';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../style/App.css';
import '../style/RegresarButton.css';

function Proceso() {
  const navigate = useNavigate();

  // Define tus imágenes aquí - URLs o rutas locales
  const myImages = [
    "/procesoI.jpg",
    "/procesoVIII.jpeg",
    "/ProcesoII.jpg",
    "/procesoIX.jpeg",
    "/procesoIII.jpg",
    "/procesoX.jpeg",
    "/procesoIV.jpg",
    "/procesoXII.jpeg",
    "/procesoV.jpg",
    "/procesoXI.jpeg",
    "/procesoVI.jpg",
    "/procesoVII.jpg",
    "/procesoXIII.jpeg"
  ];

  // Fichas técnicas opcionales (puedes editar o dejar vacías)
  const fichasTecnicas = [
    {
      titulo: "Ejercicio en clase",
      autor: "Isabella",
      tecnica: "Lápices de colores sobre papel",
      año: "2025"
    },
    {
      titulo: "Ejercicio en clase",
      autor: "Sharick",
      tecnica: "Lápices de colores sobre papel",
      año: "2025"
    },
    {
      titulo: "Ejercicio en clase",
      autor: "Isabella",
      tecnica: "Lápiz sobre papel",
      año: "2025"
    },
    {
      titulo: "Ejercicio en clase",
      autor: "Sharick",
      tecnica: "Lápiz sobre papel",
      año: "2025"
    },
    {
      titulo: "Ejercicio en clase",
      autor: "Isabella",
      tecnica: "Lápiz sobre papel",
      año: "2025"
    },
    {
      titulo: "Ejercicio en clase",
      autor: "Sharick",
      tecnica: "Lápiz sobre papel",
      año: "2025"
    },
    {
      titulo: "Ejercicio en clase",
      autor: "Isabella",
      tecnica: "Técnica mixta",
      año: "2025"
    },
    {
      titulo: "Ejercicio en clase",
      autor: "Alejandro",
      tecnica: "Lápices de colores sobre papel",
      año: "2025"
    },
    {
      titulo: "Ejercicio en clase",
      autor: "Isabella",
      tecnica: "Lápiz sobre papel",
      año: "2025"
    },
    {
      titulo: "Ejercicio en clase",
      autor: "Sharick",
      tecnica: "Lápiz sobre papel",
      año: "2025"
    },
    {
      titulo: "Ejercicio en clase",
      autor: "Alice",
      tecnica: "Lápiz sobre papel",
      año: "2025"
    },
    {
      titulo: "Autorretrato",
      autor: "Isabella",
      tecnica: "Técnica mixta",
      año: "2025"
    },
    {
      titulo: "Ejercicio en clase",
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
}

export default Proceso;
