import StellarCarousel from './components/carrousel';
import FlipBook from './components/FlipBook';

function App() {
  // Define tus slides aquí - puedes modificarlos fácilmente
  const mySlides = [
    { 
      title: "Mission Alpha", 
      icon: "🚀", 
      desc: "Launch sequence and space journey" 
    },
    { 
      title: "Galaxy Node", 
      icon: "🌌", 
      desc: "Galactic networks and star systems" 
    },
    { 
      title: "Nebula Station", 
      icon: "🛸", 
      desc: "Research facility in stellar nursery" 
    },
    { 
      title: "Stellar Core", 
      icon: "⭐", 
      desc: "Heart of stars and cosmic fusion" 
    },
    { 
      title: "Terra Nova", 
      icon: "🌍", 
      desc: "New world discovery" 
    },
    { 
      title: "Lunar Base", 
      icon: "🌙", 
      desc: "Moon outpost establishment" 
    },
    { 
      title: "Observatory", 
      icon: "🔭", 
      desc: "Deep space observation deck" 
    },
    { 
      title: "Cosmic Return", 
      icon: "🌠", 
      desc: "Journey completion and wisdom" 
    }
  ];

  const myPages = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ];

  return (
    <>
     <div className=''>
         <StellarCarousel 
        slides={mySlides}
        autoStart={false}
        initialSpeed="normal"
      /> 
      
     {/*lipBook pages={myPages} />]*/}
     </div>
    </>
  );
}

export default App;
