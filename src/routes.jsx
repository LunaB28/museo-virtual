import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Home from "./pages/home";
import Opciones from "./pages/opciones";
import Proceso from "./pages/proceso";
import Cartas from "./pages/cartas";
import Obras from "./pages/obras";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="opciones" element={<Opciones />} />
            <Route path="proceso" element={<Proceso />} />
            <Route path="cartas" element={<Cartas />} />
            <Route path="obras" element={<Obras />} />
        </>
    )
);