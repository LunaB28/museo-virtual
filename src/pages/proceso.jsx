import Carrousel from '../components/carrousel';
import { useNavigate } from 'react-router-dom';
import '../style/App.css';

function Proceso() {
  const navigate = useNavigate();

  // Define tus imágenes aquí - URLs o rutas locales
  const myImages = [
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3",
    "https://picsum.photos/400/300?random=4",
    "https://picsum.photos/400/300?random=5",
    "https://picsum.photos/400/300?random=6",
    "https://picsum.photos/400/300?random=7",
    "https://picsum.photos/400/300?random=8"
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
}

export default Proceso;
