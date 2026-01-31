import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/ui/layout/navbar";
import {Footer} from "./components/ui/layout/footer"
 import Home from "./pages/index/home"; 
 import Login from "./pages/login/login";


function App() {
const location = useLocation();
const hideLayoutRoutes = ["/login"]; 
const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout &&
        <Navbar />}


      <Routes>
        {/* Esta parte es la del router aqui se define el link que se quiere que 
        accione una ruta para cambiar de pagina, esto no es nada del los get o put a 
        la api, esto es solo lo visual */}
         <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
      </Routes>

       {!hideLayout && <Footer/>}
    </>
  );
}

export default App;