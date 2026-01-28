import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/ui/layout/navbar";
import {Footer} from "./components/ui/layout/footer"
 import Home from "./pages/index/home"; 
 import { useAuth } from './auth/AuthContext';
 //import ProtectedRoute from "./auth/ProtectedRoute"
import {PageLoader} from "./components/ui/layout/pageLoader";
import AdminUsuarios from "./pages/Admin/Usuarios/adminUsuarios";

function App() {
  const {  loading } = useAuth();
  if (loading) {
    return (<PageLoader />);
  }
  return (
    <>
        <Navbar />
      
      <Routes>
        {/* Esta parte es la del router aqui se define el link que se quiere que 
        accione una ruta para cambiar de pagina, esto no es nada del los get o put a 
        la api, esto es solo lo visual */}
         <Route path="/" element={<Home />} /> 
        <Route path="/usuarios" element={<AdminUsuarios />} />
      </Routes>

       <Footer/>
    </>
  );
}

export default App;