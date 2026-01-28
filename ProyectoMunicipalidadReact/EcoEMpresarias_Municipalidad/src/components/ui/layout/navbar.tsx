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

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useAuth();
  return (
    <nav className="bg-[#056F94] gradient-hero text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="mx-auto max-w-350px px-4 sm:px-8">
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
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Link
              to="/emprendedores"
              className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2"
            >
              Emprendedores
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
            {["EMPRENDEDOR"].includes(user?.rol ?? "") && (
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
                      to="/inventario"
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
              >
                <Link to="/">Logout</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden text-white"
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
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-white/20">
            <Link
              to="/emprendedores"
              className="block py-2 px-2 text-white font-medium hover:text-accent"
            >
              Emprendedores
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

            {/* ADMIN */}
            {["ADMIN"].includes(user?.rol ?? "") && (
              <div className="mt-4">
                <p className="px-2 text-sm font-semibold text-white/70 uppercase">
                  Administrador
                </p>

                <Link
                  to="/usuarios"
                  className="block py-2 px-4 text-white hover:text-accent"
                >
                  Usuarios
                </Link>
                <Link
                  to="/roles"
                  className="block py-2 px-4 text-white hover:text-accent"
                >
                  Gestión de Roles
                </Link>
                <Link
                  to="/emprendimientos-admin"
                  className="block py-2 px-4 text-white hover:text-accent"
                >
                  Gestión de emprendimientos
                </Link>
                <Link
                  to="/revision-productos"
                  className="block py-2 px-4 text-white hover:text-accent"
                >
                  Revisión de productos
                </Link>
                <Link
                  to="/solicitudes"
                  className="block py-2 px-4 text-white hover:text-accent"
                >
                  Aprobación de solicitudes
                </Link>
                <Link
                  to="/inteligencia-municipal"
                  className="block py-2 px-4 text-white hover:text-accent"
                >
                  Sistema de Inteligencia Municipal
                </Link>
                <Link
                  to="/analisis-sectores"
                  className="block py-2 px-4 text-white hover:text-accent"
                >
                  Análisis de sectores
                </Link>
              </div>
            )}

            {/* EMPRENDEDOR */}
            {["EMPRENDEDOR"].includes(user?.rol ?? "") && (
              <div className="mt-4">
                <p className="px-2 text-sm font-semibold text-white/70 uppercase">
                  Emprendedor
                </p>

                <Link
                  to="/inventario"
                  className="block py-2 px-4 text-white hover:text-accent"
                >
                  Inventario
                </Link>
                <Link
                  to="/mis-productos"
                  className="block py-2 px-4 text-white hover:text-accent"
                >
                  Mis Productos
                </Link>
                <Link
                  to="/analiticas"
                  className="block py-2 px-4 text-white hover:text-accent"
                >
                  Analíticas del negocio
                </Link>
                <Link
                  to="/mis-eventos"
                  className="block py-2 px-4 text-white hover:text-accent"
                >
                  Mis Eventos
                </Link>
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
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Link to="/">Logout</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
