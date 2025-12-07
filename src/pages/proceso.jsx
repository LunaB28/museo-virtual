import Carrousel from '../components/carrousel';
import { useNavigate } from 'react-router-dom';
import '../App.css';

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
            <div className="card-height bg-secondary rounded-4 position-relative" style={{width: '80%', maxWidth: '1200px', overflow: 'hidden'}}>
              <button 
                onClick={() => navigate('/opciones')} 
                className="btn btn-link text-white position-absolute top-0 start-0 m-3"
                style={{zIndex: 10, textDecoration: 'none', fontSize: '1.1rem'}}
              >
                ← Regresar
              </button>
         <Carrousel 
        images={myImages}
      /> 
      </div>
     </div>
    </>
  );
}

export default Proceso;
