import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/ui/layout/navbar";
import { Footer } from "./components/ui/layout/footer";
import Home from "./pages/index/home";
import { useAuth } from "./auth/AuthContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { PageLoader } from "./components/ui/layout/pageLoader";
import AdminUsuarios from "./pages/Admin/Usuarios/adminUsuarios";
import AdminEmprendedores from "./pages/Admin/Emprendimientos/adminEmprendedores";
import LoginPage from "./pages/auth/login/loginPage";

import RegisterPage from "./pages/auth/register/registerPage";

import EmprendimientosPage from "./pages/public/ListaEmprendimientos/listaEmprendimientosPublic";

import DetalleEmprendimiento from "./pages/public/DetalleEmprendimiento/DetalleEmprendimiento";


import { Toaster } from "react-hot-toast";
import DetalleProductoPage from "./pages/public/DetalleProducto/DetalleProducto";
import EmprendimientosPropios from "./pages/Emprendedores/ListaEmprendimientosPropiosInventario/ListaEmprendientosPropios";
import InventarioEmprendimiento from "./pages/Emprendedores/Inventario/InvetarioEmprendimiento";
import { Breadcrumbs } from "./components/ui/layout/Breadcrumbs";

function App() {
  const { loading } = useAuth();
  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="gradient-hero text-white px-4 py-2 ">
        <Breadcrumbs />
      </div>
      <main className="flex-1">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Esta parte es la del router aqui se define el link que se quiere que 
        accione una ruta para cambiar de pagina, esto no es nada del los get o put a 
        la api, esto es solo lo visual */}
          

          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/emprendimientos" element={<EmprendimientosPage />} />
          <Route path="/emprendimiento/:id/:cedulaJuridica" element={<DetalleEmprendimiento />} /> 
          <Route path="/producto/:id" element={<DetalleProductoPage />} />

          {/* HU-28: Ruta de registro */}
          <Route path="/registro" element={<RegisterPage />} />

          

          {/* admin routes */}
          
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/usuarios" element={<AdminUsuarios />} />
            <Route path="/emprendimientos-admin" element={<AdminEmprendedores />} />
          </Route>
            

          {/* Emprendedores routes */}
          <Route element={<ProtectedRoute allowedRoles={["EMPRENDEDOR"]} />}>
            <Route path="/emprendimientos-propio" element={<EmprendimientosPropios />} />
            <Route path="/inventario/:id/:cedulaJuridica" element={<InventarioEmprendimiento />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
    </>
  );
}

export default App;
