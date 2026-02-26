"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../../../assets/logo.png";
import { useAuth } from "../../../auth/AuthContext";
import { handleLogout } from "../../../pages/auth/logout/handleLogout";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [emprendedorOpen, setEmprendedorOpen] = useState(false);
  const { user } = useAuth();


  const toggleAdmin = () => {
    setAdminOpen(!adminOpen);
    setEmprendedorOpen(false);
  };

  const toggleEmprendedor = () => {
    setEmprendedorOpen(!emprendedorOpen);
    setAdminOpen(false);
  };


  return (
    <nav className="bg-[#056F94] gradient-hero text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-90 transition-opacity"
          >
            <img
              src={logo}
              alt=".."
              width={60}
              height={60}
              className="h-15 w-auto"
            />
            Ecoempresarias
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xlg:flex xlg:items-center lg:gap-4">
            <Link
              to="/emprendimientos"
              className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2"
            >
              Emprendimientos
            </Link>

            <Link
              to="/productos"
              className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2"
            >
              Productos
            </Link>
            {user && (
              <Link
                to="/carrito"
                className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2"
              >
                Carrito
              </Link>
            )}
            {["ADMIN", "EMPRENDEDOR"].includes(user?.rol ?? "") && (
              <Link
                to="/eventos"
                className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2"
              >
                {/* ejemplo de como proteger visualmente los accesos, recurden que es solo visual */}
                Eventos
              </Link>
            )}

            {["ADMIN", "EMPRENDEDOR", "USUARIO"].includes(user?.rol ?? "") && (
              <Link
                to="/entregas"
                className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2"
              >
                Entregas y seguimientos
              </Link>
            )}
            {/* No se que es esto de mapas */}
            <Link
              to="/mapas"
              className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2"
            >
              Mapas
            </Link>
            {/* Cambiar A ADMIN para Cuando ya este Conectado A APi */}
            {["ADMIN"].includes(user?.rol ?? "") && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1  font-medium hover:text-accent transition-colors whitespace-nowrap px-2">
                  Administrador
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-[#056F94] gradient-hero border-0 rounded-lg"
                >
                  <DropdownMenuItem
                    asChild
                    className="text-foreground hover:bg-accent hover:to-blue-500 cursor-pointer"
                  >
                    <Link
                      to="/usuarios"
                      className="
      text-white
      cursor-pointer
      data-highlighted:bg-[#09C2EF]
      data-highlighted:text-black
      focus:outline-none
    "
                    >
                      Usuarios
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="text-foreground hover:bg-accent hover:to-blue-500 cursor-pointer"
                  >
                    <Link
                      to="/roles"
                      className="
      text-white
      cursor-pointer
      data-highlighted:bg-[#09C2EF]
      data-highlighted:text-black
      focus:outline-none
    "
                    >
                      Gestión de Roles
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="text-foreground hover:bg-accent hover:to-blue-500 cursor-pointer"
                  >
                    <Link
                      to="/emprendimientos-admin"
                      className="
      text-white
      cursor-pointer
      data-highlighted:bg-[#09C2EF]
      data-highlighted:text-black
      focus:outline-none
    "
                    >
                      Gestión de emprendimientos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="text-foreground hover:bg-accent hover:to-blue-500 cursor-pointer"
                  >
                    <Link
                      to="/revision-productos"
                      className="
      text-white
      cursor-pointer
      data-highlighted:bg-[#09C2EF]
      data-highlighted:text-black
      focus:outline-none
    "
                    >
                      Revisión de productos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="text-foreground hover:bg-accent hover:to-blue-500 cursor-pointer"
                  >
                    <Link
                      to="/solicitudes"
                      className="
      text-white
      cursor-pointer
      data-[highlighted]:bg-[#09C2EF]
      data-[highlighted]:text-black
      focus:outline-none
    "
                    >
                      Aprobación de solicitudes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="text-foreground hover:bg-accent hover:to-blue-500 cursor-pointer"
                  >
                    <Link
                      to="/inteligencia-municipal"
                      className="
      text-white
      cursor-pointer
      data-highlighted:bg-[#09C2EF]
      data-highlighted:text-black
      focus:outline-none
    "
                    >
                      Sistema de Inteligencia Municipal
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="text-foreground hover:bg-accent hover:to-blue-500 cursor-pointer"
                  >
                    <Link
                      to="/analisis-sectores"
                      className="
      text-white
      cursor-pointer
      data-highlighted:bg-[#09C2EF]
      data-highlighted:text-black
      focus:outline-none
    "
                    >
                      Análisis de sectores
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Emprendedor Dropdown */}
            {["EMPRENDEDOR", "ADMIN"].includes(user?.rol ?? "") && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2">
                  Emprendedor
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-[#056F94] border-0 rounded-lg"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to="/emprendimientos-propio"
                      className="
            text-white
            cursor-pointer
            data-[highlighted]:bg-[#09C2EF]
            data-[highlighted]:text-black
            focus:outline-none
          "
                    >
                      Inventario
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      to="/mis-productos"
                      className="
            text-white
            cursor-pointer
            data-[highlighted]:bg-[#09C2EF]
            data-[highlighted]:text-black
            focus:outline-none
          "
                    >
                      Mis Productos
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      to="/analiticas"
                      className="
            text-white
            cursor-pointer
            data-[highlighted]:bg-[#09C2EF]
            data-[highlighted]:text-black
            focus:outline-none
          "
                    >
                      Analíticas del negocio
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      to="/mis-eventos"
                      className="
            text-white
            cursor-pointer
            data-[highlighted]:bg-[#09C2EF]
            data-[highlighted]:text-black
            focus:outline-none
          "
                    >
                      Mis Eventos
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {!user && (
              <Button
                asChild
                variant="secondary"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
            )}
            {user && (
              <Button
                variant="secondary"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="xlg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-[#056F94] shadow-2xl z-50 p-6 space-y-3
  overflow-y-auto
  transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
  xl:hidden
  ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >

          {/* Botón cerrar */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
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
              to="/entregas"
              className="block py-2 px-2 text-white font-medium hover:text-accent"
            >
              Entregas y seguimientos
            </Link>
          )}

          <Link
            to="/mapas"
            className="block py-2 px-2 text-white font-medium hover:text-accent"
          >
            Mapas
          </Link>

          {["ADMIN"].includes(user?.rol ?? "") && (
            <div className="mt-4">
              <button
                onClick={toggleAdmin}
                className="w-full flex items-center justify-between py-2 px-3 rounded-md text-white font-medium transition-all hover:text-accent"
              >
                Administrador
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${adminOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${adminOpen ? "max-h-[500px] mt-2" : "max-h-0"
                  }`}
              >
                <Link to="/usuarios" className="block py-2 px-4 text-white hover:text-accent rounded-md">
                  Usuarios
                </Link>

                <Link to="/roles" className="block py-2 px-4 text-white hover:text-accent rounded-md">
                  Gestión de Roles
                </Link>

                <Link to="/emprendimientos-admin" className="block py-2 px-4 text-white hover:text-accent rounded-md">
                  Gestión de emprendimientos
                </Link>

                <Link to="/revision-productos" className="block py-2 px-4 text-white hover:text-accent rounded-md">
                  Revisión de productos
                </Link>

                <Link to="/solicitudes" className="block py-2 px-4 text-white hover:text-accent rounded-md">
                  Aprobación de solicitudes
                </Link>

                <Link to="/inteligencia-municipal" className="block py-2 px-4 text-white hover:text-accent rounded-md">
                  Sistema de Inteligencia Municipal
                </Link>

                <Link to="/analisis-sectores" className="block py-2 px-4 text-white hover:text-accent rounded-md ">
                  Análisis de sectores
                </Link>
              </div>
            </div>
          )}

          {["EMPRENDEDOR", "ADMIN"].includes(user?.rol ?? "") && (
            <div className="mt-4">
              <button
                onClick={toggleEmprendedor}
                className="w-full flex items-center justify-between py-2 px-3 rounded-md text-white font-medium transition-all hover:text-accent"
              >
                Emprendedor
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${emprendedorOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${emprendedorOpen ? "max-h-96 mt-2" : "max-h-0"
                  }`}
              >
                <Link to="/emprendimientos-propio" className="block py-2 px-4 text-white hover:text-accent rounded-md">
                  Inventario
                </Link>

                <Link to="/mis-productos" className="block py-2 px-4 text-white hover:text-accent rounded-md">
                  Mis Productos
                </Link>

                <Link to="/analiticas" className="block py-2 px-4 text-white hover:text-accent rounded-md">
                  Analíticas del negocio
                </Link>

                <Link to="/mis-eventos" className="block py-2 px-4 text-white hover:text-accent rounded-md">
                  Mis Eventos
                </Link>
              </div>
            </div>
          )}

          {/* AUTH*/}
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
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            )}

          </div>
        </div>

      </div>
    </nav>
  );
}
