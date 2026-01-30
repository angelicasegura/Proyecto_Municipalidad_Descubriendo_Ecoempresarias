import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/ui/layout/navbar";
import { Footer } from "./components/ui/layout/footer";
import Home from "./pages/index/home";
import { useAuth } from "./auth/AuthContext";
/* import { ProtectedRoute } from "./auth/ProtectedRoute"; */
import { PageLoader } from "./components/ui/layout/pageLoader";
import AdminUsuarios from "./pages/Admin/Usuarios/adminUsuarios";
import AdminEmprendedores from "./pages/Admin/Emprendimientos/adminEmprendedores";

function App() {
  const { loading } = useAuth();
  if (loading) {
    return <PageLoader />;
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Esta parte es la del router aqui se define el link que se quiere que 
        accione una ruta para cambiar de pagina, esto no es nada del los get o put a 
        la api, esto es solo lo visual */}
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<AdminUsuarios />} />
          <Route
            path="/emprendimientos-admin"
            element={<AdminEmprendedores />}
          />
          {/* Esto es solo de prueba a futuro cuando ya este conectado a API, por ahora no es necesario */}
          {/* <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/usuarios" element={<AdminUsuarios />} />
        </Route> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
