import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlipBook from '../components/FlipBook';
import Footer from '../components/Footer';
import '../style/FlipBook.css';
import '../style/RegresarButton.css';

const Cartas = () => {
    const navigate = useNavigate();

    // Puedes usar strings simples o objetos con header y content
    const myPages = [
        {
            header: "Queridas y queridos estudiantes,",
            content: "Quiero agradecerles por hacer parte de este proceso. No alcanzan a imaginar lo especiales que son para mí. Gracias por permitirme compartir con ustedes en el aula, por abrirme un espacio en sus vidas y dejarme, de una forma u otra, marcar sus caminos. \nHoy me siento profundamente orgulloso de ver en lo que se han convertido: de ver a las y los artistas que son, y a las personas maravillosas en las que seguirán creciendo.\nNunca olviden que son brillantes y que su futuro está en sus manos. \nNo permitan que nadie les apague la magia de crear, de imaginar mundos nuevos, historias propias y universos que solo ustedes pueden traer a la vida."
        },
        
        {
             header: " ",
            content: "Espero haberles dado herramientas valiosas para expresarse, para hablar sin palabras, para transformar lo que sienten en arte… y también para caminar la vida con más sensibilidad y fuerza.\n\n A las madres, padres, familias y redes de apoyo, gracias. Sin ustedes nada sería posible. Gracias por creer en sus hijos e hijas, por valorar su trabajo, por cuidarles, acompañarles y amarles. Gracias por la paciencia y el cariño.\n\nNunca corten las alas de sus infancias; al contrario, ayúdenles a recordar siempre que su potencial es inmenso.\n"
        },
        {
            header: " ",
            content: "No sé si en un futuro se dedicarán al arte, pero estoy seguro de que serán seres sensibles y empáticos, algo que este mundo necesita con urgencia.\n\nMi deseo es que el aula haya sido un refugio para ustedes: un espacio seguro donde respirar, crear y ser, en medio de un mundo tan ruidoso.\n\n También quiero pedirles perdón si en algún momento consideran que me equivoqué. Al fin y al cabo, soy humano… y ustedes también. Y ahí, justamente ahí, está lo más hermoso de este proceso: aprender juntos y juntas, con aciertos y errores, desde el corazón. "
       },
        {
             header: " ",
             content:"Recuerden siempre que cada uno y cada una tiene su propio camino. No hay competencia. Nada es personal. La única comparación válida es con la persona que fueron ayer. \n\n Y no puedo no agradecer a Cristal y Andrés. Gracias, de verdad, por permitirme soñar y crear junto a estas infancias. Gracias por darme la primera oportunidad en mi carrera, por confiar en mi trabajo y por acompañarme a seguir aprendiendo. Su “sí” marcó un antes y un después. \n\n Gracias a todos y todas ustedes, con amor y pasión.\nAtentamente, \nSu profe Estephan."
        },
        {
             header: "Clases Creativas",
            content: "Para = Docente Y compañeros\n \nCarta = Agradecimientos.\n\nQuiero agradecer prafundamente a todos mis compañeros y al docente Estefan por el tiempo compartido en nuestras clases de Artes plásticas. \n\nCada momento aprendiendo sobre sombras, técnicas de Coloreo, teoria del color y tantas otras herramientas valiosas para nuestra vida artística."
        },
        {
             header: " ",
            content: " Me llevo no solo conocimientos sino también cariño, apoyo y otras lindas experiencias vividas aqui. Los quiero y atesoro mucho, y guardare en un rincón de mi corazón a Alejo, Alice, Juanita, Sharif, Sara y por supuesto al profesor Estefan siempre. \n\nLos Quiero mucho, Bendiciones. \n\n\nAtt- Isabella S."
         },
     {      header: "De: Alejandro, para: CAS",
            content: "\n\n\nEn estos 6 meses aprendí muchas cosas y pude dejar que mi mente pueda ir libremente, esto haciendo y pensando criaturas raras o mistica sin ser jusgodo por estas cosos raras"
        },
        {
             header: "Carta para Isa",
            content: "Quería escribirte esta carta porque en nuestras clases de Artes plásticas he pensado en lo que hemos aprendido y en lo chevere que ha sido.\n\n Me gusta como encuentras la forma diferente de ver las cosas.\n\n Como mezclas colores sin miedo y como tus ideas salen del papel y cobran vida propia.\n\n\n De Ali"
        },
        {
            header: "Aprendizajes y experiencias",
            content: "Para: Alice\nCarta - Proceso Artístico.\nDurante todas estas clases he aprendido bastante, y el poder haberlo hecho junto a ti es algo que valoro mucho, pues agradezco el poder haber compartido no solo enseñanzas en las artes sino que tambien anécdotas y experencias que me cambiaron como persona de forma Positiva. Porque aunque el tiempo de nuestra amistad no es mucho, la manera en la que he podido hablar contigo de forma tan natural y sin complicaciones fue la característica principal de nosotras. Gracias por acompañarme en este proceso creativo y también por ser parte de este, te quiero.\nAtt= Isabella S."
        }
    ];

    return (
        <>
            <style>{`
                .cartas-main-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    padding: 0 5%;
                }
                
                @media (max-width: 767px) {
                    .cartas-main-container {
                        padding: 0 2%;
                    }
                }
            `}</style>
            <div className="cartas-main-container">
                <button 
                  onClick={() => navigate('/opciones')} 
                  className="btn btn-link text-white position-fixed top-0 start-0 m-4 regresar-btn"
                >
                  <span className="texto-completo">← Regresar</span>
                  <span className="texto-corto">←</span>
                </button>
                <div className="card-height rounded-4 position-relative d-flex justify-content-center align-items-center" style={{width: '100%', maxWidth: '900px', background: 'transparent', margin: '0 auto'}}>
                <FlipBook 
                    pages={myPages}
                    coverTitle="PERGAMINOS"
                    endTitle="FIN"
                />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cartas;