"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import {
  ChevronDown,
  Menu,
  X,
  Gift,
  ShoppingCart,
  Users,
  MapPin,
  BarChart,
} from "lucide-react";
import logo from "../../../assets/logo.png";
import { useAuth } from "../../../auth/AuthContext";
import { handleLogout } from "../../../pages/auth/logout/handleLogout";
import { useNavbar } from "@/context/NavbarContext";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [emprendedorOpen, setEmprendedorOpen] = useState(false);
  const { expanded: dashboardExpanded, setExpanded: setDashboardExpanded } = useNavbar();
  const { user } = useAuth();
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [emprendedorDropdownOpen, setEmprendedorDropdownOpen] = useState(false);
  const toggleAdmin = () => {
    if (adminOpen) {
      // Primero cerrar dropdowns internos
      setAdminDropdownOpen(false);
      // Luego cerrar accordion
      setAdminOpen(false);
    } else {
      // Abrir accordion
      setAdminOpen(true);
      // Cerrar el otro accordion y sus dropdowns
      setEmprendedorOpen(false);
      setEmprendedorDropdownOpen(false);
    }
  };

  const toggleEmprendedor = () => {
    if (emprendedorOpen) {
      setEmprendedorDropdownOpen(false);
      setEmprendedorOpen(false);
    } else {
      setEmprendedorOpen(true);
      setAdminOpen(false);
      setAdminDropdownOpen(false);
    }
  };
  const location = useLocation();
  useEffect(() => {
    setMobileMenuOpen(false);
    setAdminOpen(false);
    setEmprendedorOpen(false);
    setAdminDropdownOpen(false);
    setEmprendedorDropdownOpen(false);
  }, [location]);
  return (
    <>
      {/* Mobile Navbar solo en pantallas muy pequeñas */}
      <nav className="bg-[#056F94] gradient-hero text-primary-foreground sticky top-0 z-50 shadow-md sm:hidden">
        <div className="mx-auto max-w-screen-xl px-4 flex h-20 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-90 transition-opacity"
          >
            <img
              src={logo}
              alt="Logo"
              width={60}
              height={60}
              className="h-15 w-auto"
            />
            Ecoempresarias
          </Link>
          <button
            type="button"
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile slide menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-[#056F94] shadow-2xl z-50 p-6 space-y-3 overflow-y-auto transform transition-transform duration-700 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {/* Links */}
          <Link
            to="/emprendimientos"
            className="block py-2 px-2 text-white font-medium hover:text-accent"
          >
            Emprendimientos
          </Link>
          <Link
            to="/productos"
            className="block py-2 px-2 text-white font-medium hover:text-accent"
          >
            Productos
          </Link>
          {user && (
            <Link
              to="/carrito"
              className="block py-2 px-2 text-white font-medium hover:text-accent"
            >
              Carrito
            </Link>
          )}
          {["ADMIN", "EMPRENDEDOR"].includes(user?.rol ?? "") && (
            <Link
              to="/eventos"
              className="block py-2 px-2 text-white font-medium hover:text-accent"
            >
              Eventos
            </Link>
          )}
          {["ADMIN", "EMPRENDEDOR", "USUARIO"].includes(user?.rol ?? "") && (
            <Link
              to="/pedidos/mis-pedidos"
              className="block py-2 px-2 text-white font-medium hover:text-accent"
            >
              Mis Pedidos
            </Link>
          )}
          {["ADMIN"].includes(user?.rol ?? "") && (
            <>
              <Link
                to="/mapas"
                className="block py-2 px-2 text-white font-medium hover:text-accent"
              >
                Mapas
              </Link>
              <button
                onClick={toggleAdmin}
                className="w-full flex items-center justify-between py-2 px-3 rounded-md text-white font-medium transition-all hover:text-accent"
              >
                Administrador
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${adminOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${adminOpen ? "max-h-[500px] mt-2" : "max-h-0"}`}
              >
                <Link
                  to="/usuarios"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Usuarios
                </Link>
                <Link
                  to="/roles"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Gestión de Roles
                </Link>
                <Link
                  to="/emprendimientos-admin"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Gestión de emprendimientos
                </Link>
                <Link
                  to="/revision-productos"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Revisión de productos
                </Link>
                <Link
                  to="/solicitudes-eventos"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Aprobación de solicitudes eventos
                </Link>
                <Link
                  to="/reportesDashboard"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Sistema de Inteligencia Municipal
                </Link>
                <Link
                  to="/admin/lugares"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Lugares
                </Link>
                <Link
                  to="/mapasEventos"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Mapas eventos
                </Link>
              </div>
            </>
          )}
          {["EMPRENDEDOR", "ADMIN"].includes(user?.rol ?? "") && (
            <>
              <button
                onClick={toggleEmprendedor}
                className="w-full flex items-center justify-between py-2 px-3 rounded-md text-white font-medium transition-all hover:text-accent"
              >
                Emprendedor
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${emprendedorOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${emprendedorOpen ? "max-h-96 mt-2" : "max-h-0"}`}
              >
                <Link
                  to="/emprendimientos-propio"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Inventario
                </Link>
                <Link
                  to="/mis-productos"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Mis Productos
                </Link>
                <Link
                  to="/emprendimientos-propios"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Pedidos Y Entregas
                </Link>
                <Link
                  to="/emprendimientos-propios-reportes"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Analíticas del negocio
                </Link>
                <Link
                  to="/mis-eventos"
                  className="block py-2 px-4 text-white hover:text-accent rounded-md"
                >
                  Mis Eventos
                </Link>
              </div>
            </>
          )}

          <div className="pt-4">
            {!user && (
              <Button
                asChild
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
            )}
            {user && (
              <Button
                variant="secondary"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Desktop / Dashboard fijo a la derecha */}
      <div
        className={`hidden sm:flex fixed top-0 right-0 h-full bg-[#056F94] shadow-xl z-50 flex-col transition-all duration-500`}
        style={{ width: dashboardExpanded ? "250px" : "60px" }}
      >
        <div className="flex flex-col items-center pt-6 space-y-2 w-full">
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />

          {/* Texto que aparece solo cuando se expande */}
          <span
            className={`text-white text-xl font-bold transition-all duration-300 overflow-hidden whitespace-nowrap
      ${dashboardExpanded ? "opacity-100 max-h-10 mt-2" : "opacity-0 max-h-0 mt-0"}`}
          >
            Ecoempresarias
          </span>

          {/* Botón expand/collapse */}
          <button
            className="text-white mt-2"
            onClick={() => {
              setDashboardExpanded(!dashboardExpanded);

              if (dashboardExpanded) {
                setAdminOpen(false);
                setEmprendedorOpen(false);
                setAdminDropdownOpen(false);
                setEmprendedorDropdownOpen(false);
              }
            }}
          >
            <ChevronDown
              className={`h-6 w-6 transition-transform duration-300 ${dashboardExpanded ? "rotate-180" : ""
                }`}
            />
          </button>
        </div>

        <div className="flex-1 mt-10 flex flex-col items-center space-y-4">
          {/* Links con iconos */}
          <Link
            to="/emprendimientos"
            className="flex items-center gap-3 text-white hover:text-accent w-full px-2"
          >
            <Gift className="h-6 w-6" />
            {dashboardExpanded && <span>Emprendimientos</span>}
          </Link>
          <Link
            to="/productos"
            className="flex items-center gap-3 text-white hover:text-accent w-full px-2"
          >
            <ShoppingCart className="h-6 w-6" />
            {dashboardExpanded && <span>Productos</span>}
          </Link>
          {user && (
            <Link
              to="/carrito"
              className="flex items-center gap-3 text-white hover:text-accent w-full px-2"
            >
              <ShoppingCart className="h-6 w-6" />
              {dashboardExpanded && <span>Carrito</span>}
            </Link>
          )}
          {["ADMIN", "EMPRENDEDOR"].includes(user?.rol ?? "") && (
            <Link
              to="/eventos"
              className="flex items-center gap-3 text-white hover:text-accent w-full px-2"
            >
              <Gift className="h-6 w-6" />
              {dashboardExpanded && <span>Eventos</span>}
            </Link>
          )}

          {/* ADMIN Accordion */}
          {["ADMIN"].includes(user?.rol ?? "") && (
            <div className="w-full">
              <button
                onClick={() => {
                  if (!dashboardExpanded) setDashboardExpanded(true);
                  toggleAdmin();
                }}
                className="flex items-center justify-between w-full px-2 py-2 text-white hover:text-accent"
              >
                <Users className="h-6 w-6" />
                {dashboardExpanded && <span>Administrador</span>}
                {dashboardExpanded && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${adminOpen ? "rotate-180" : ""}`}
                  />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${adminOpen ? "max-h-96" : "max-h-0"} pl-8 flex flex-col space-y-1`}
              >
                <Link to="/usuarios" className="text-white hover:text-accent">
                  Usuarios
                </Link>
                <Link to="/roles" className="text-white hover:text-accent">
                  Gestión de Roles
                </Link>
                <Link
                  to="/emprendimientos-admin"
                  className="text-white hover:text-accent"
                >
                  Gestión de emprendimientos
                </Link>
                <Link
                  to="/revision-productos"
                  className="text-white hover:text-accent"
                >
                  Revisión de productos
                </Link>
                <Link
                  to="/solicitudes-eventos"
                  className="text-white hover:text-accent"
                >
                  Aprobación de solicitudes eventos
                </Link>
                <Link
                  to="/reportesDashboard"
                  className="text-white hover:text-accent"
                >
                  Sistema de Inteligencia Municipal
                </Link>
                <Link
                  to="/admin/lugares"
                  className="text-white hover:text-accent"
                >
                  Lugares
                </Link>
                <Link
                  to="/mapasEventos"
                  className="text-white hover:text-accent"
                >
                  Mapas eventos
                </Link>
              </div>
            </div>
          )}

          {/* EMPRENDEDOR Accordion */}
          {["EMPRENDEDOR", "ADMIN"].includes(user?.rol ?? "") && (
            <div className="w-full">
              <button
                onClick={() => {
                  if (!dashboardExpanded) setDashboardExpanded(true);
                  toggleEmprendedor();
                }}
                className="flex items-center justify-between w-full px-2 py-2 text-white hover:text-accent"
              >
                <BarChart className="h-6 w-6" />
                {dashboardExpanded && <span>Emprendedor</span>}
                {dashboardExpanded && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${emprendedorOpen ? "rotate-180" : ""}`}
                  />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${emprendedorOpen ? "max-h-96" : "max-h-0"} pl-8 flex flex-col space-y-1`}
              >
                <Link
                  to="/emprendimientos-propio"
                  className="text-white hover:text-accent"
                >
                  Inventario
                </Link>
                <Link
                  to="/mis-productos"
                  className="text-white hover:text-accent"
                >
                  Mis Productos
                </Link>
                <Link
                  to="/emprendimientos-propios"
                  className="text-white hover:text-accent"
                >
                  Pedidos Y Entregas
                </Link>
                <Link
                  to="/emprendimientos-propios-reportes"
                  className="text-white hover:text-accent"
                >
                  Analíticas del negocio
                </Link>
                <Link
                  to="/mis-eventos"
                  className="text-white hover:text-accent"
                >
                  Mis Eventos
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Botones auth */}
        <div className="mb-4 flex flex-col items-center mt-auto w-full px-2">
          {!user && (
            <Button
              asChild
              className={`flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300
        ${dashboardExpanded ? "w-full px-4" : "w-12 px-0 overflow-hidden"}`}
            >
              <Link
                to="/login"
                className="flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
                {dashboardExpanded && <span>Iniciar Sesión</span>}
              </Link>
            </Button>
          )}
          {user && (
            <Button
              variant="secondary"
              className={`flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300
        ${dashboardExpanded ? "w-full px-4" : "w-12 px-0 overflow-hidden"}`}
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
              {dashboardExpanded && <span>Cerrar Sesión</span>}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
