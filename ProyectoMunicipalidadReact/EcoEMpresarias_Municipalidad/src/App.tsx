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
import CarritoPage from "./pages/public/Carrito/CarritoPage";
import ForbiddenPage from "./pages/public/Forbidden/ForbiddenPage";
import MapasPage from "./pages/public/mapas/MapasPage";
import MisPedidosPage from "./pages/Pedidos/Usuario/mispedidos/MisPedidosPage";
import ListaEmprendimientosPropios from "./pages/Pedidos/Emprendedor/misEmprendimientos/ListaEmprendientosPropios";
import PedidosPage from "./pages/Pedidos/Emprendedor/misPedidos/pedidosPageEmprendedor";
<Route path="/mapas" element={<MapasPage />} />
import MisProductosPage from "./pages/Productos/MisProductos/MisProductosPage";
import MisEmprendimientosPage from "./pages/Productos/MisProductos/MisEmprendimientosPage";
import ListaPendientesPage from "./pages/Productos/ProductosPendientes/ListaPendientesPage";
import ProductosPendientesPage from "./pages/Productos/ProductosPendientes/ProductosPendientesPage";
import EventosPage from "./pages/Eventos/EventosPage";
import EventoDetallePage from "./pages/Eventos/EventoDetallePage";
import MisEventosPage from "./pages/Eventos/MisEventosPage";
import MisEventosDetallePage from "./pages/Eventos/MisEventosDetallePage";
import ReservarEventoPage from "./pages/Eventos/ReservarEventoPage";
import SeleccionarEmprendimientoReservaPage from "./pages/Eventos/seleccionarEmprendimientoReservaPage";
import SolicitudesEventoPage from "./pages/Admin/Eventos/SolicitudesEventoPage";
import AdminLugaresPage from "./pages/Admin/Lugares/AdminLugaresPage";
import EditarLugarPage from "./pages/Admin/Lugares/EditarLugarPage";
import ReportesAdmin from "./pages/Admin/ReportesAdmin/reportesDashboard";
import CrearLugarPage from "./pages/Admin/Lugares/crearLugarPage";
import DetalleProductoPages from "./pages/Productos/Detalle/DetalleProductoPages";
import ProductosPage from "./pages/Productos/ProductoPage";


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
            <Route path="/403" element={<ForbiddenPage />} />
            <Route path="/mapas" element={<MapasPage />} />
            <Route path="/eventos" element={<EventosPage />} />
            <Route path="/eventos/:id" element={<EventoDetallePage />} />
            <Route
              path="/emprendimiento/:id/:cedulaJuridica"
              element={<DetalleEmprendimiento />}
            />
            <Route path="/mapas" element={<MapasPage />} />

            <Route path="/producto/:id" element={<DetalleProductoPage />} />

            {/* HU-28: Ruta de registro */}
            <Route path="/registro" element={<RegisterPage />} />


            {/*Rutas de peidos*/}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN","EMPRENDEDOR","USUARIO"]} />}>
              <Route path="/pedidos/mis-pedidos" element={<MisPedidosPage />} />
            </Route>
            {/* Ruta protegida para USUARIO (Carrito) */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/carrito" element={<CarritoPage />} />
            </Route>

            {/* admin routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/usuarios" element={<AdminUsuarios />} />
              <Route
                path="/emprendimientos-admin"
                element={<AdminEmprendedores />}
              />
              <Route path="/solicitudes-eventos" element={<SolicitudesEventoPage />} />
              <Route path="/admin/lugares" element={<AdminLugaresPage />} />
              <Route path="/admin/crear-lugar" element={<CrearLugarPage />} />
              <Route path="/admin/editar-lugar/:id" element={<EditarLugarPage />} />
              <Route path="/reportesDashboard" element={<ReportesAdmin />} />
            </Route>

            {/* Emprendedores routes */}
            <Route element={<ProtectedRoute allowedRoles={["EMPRENDEDOR","ADMIN"]} />}>
              <Route
                path="/emprendimientos-propio"
                element={<EmprendimientosPropios />}
              />
              <Route
                path="/inventario/:id/:cedulaJuridica"
                element={<InventarioEmprendimiento />}
              />
              <Route
                path="/emprendimientos-propios"
                element={<ListaEmprendimientosPropios/>}
              />
              <Route
                path="/Seguimiento-Pedidos/:cedulaJuridica"
                element={<PedidosPage />}
              />
              <Route path="/mis-eventos" element={<MisEventosPage />} />
              <Route path="/mis-eventos/:emprendimientoId" element={<MisEventosDetallePage />} />
              <Route path="/reservar-evento/:eventoId" element={<SeleccionarEmprendimientoReservaPage />} />
              <Route path="/reservar-evento/:eventoId/:emprendimientoId" element={<ReservarEventoPage />} />
            </Route>
            {/* Productos routes */}
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/productos/:id" element={<DetalleProductoPages />} />
            <Route path="/mis-productos" element={<MisEmprendimientosPage />} />
            <Route path="/mis-productos/:emprendimientoId" element={<MisProductosPage />} />

            <Route path="/revision-productos" element={<ProductosPendientesPage />} />
            <Route path="/productos-pendientes/:tipo" element={<ListaPendientesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;