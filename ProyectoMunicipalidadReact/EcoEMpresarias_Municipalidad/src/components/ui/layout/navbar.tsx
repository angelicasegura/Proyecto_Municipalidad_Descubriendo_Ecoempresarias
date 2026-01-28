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
            {user&& (
            <Link
              to="/carrito"
              className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2"
            >
              Carrito
              
            </Link>
            )}
            {["ADMIN", "EMPRENDEDOR"].includes(user?.rol ?? "") && (<Link
              to="/eventos"
              className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2"
            >
              Eventos
            </Link>)}
            
            <Link
              to="/entregas"
              className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2"
            >
              Entregas y seguimientos
            </Link>
            <Link
              to="/mapas"
              className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2"
            >
              Mapas
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2">
                Administrador
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-primary border-0 rounded-lg"
              >
                <DropdownMenuItem
                  asChild
                  className="text-foreground hover:bg-accent hover:text-white cursor-pointer"
                >
                  <Link to="/usuarios">Usuarios</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-foreground hover:bg-accent hover:text-white cursor-pointer"
                >
                  <Link to="/roles">Gestión de Roles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-foreground hover:bg-accent hover:text-white cursor-pointer"
                >
                  <Link to="/emprendimientos-admin">
                    Gestión de emprendimientos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-foreground hover:bg-accent hover:text-white cursor-pointer"
                >
                  <Link to="/revision-productos">Revisión de productos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-foreground hover:bg-accent hover:text-white cursor-pointer"
                >
                  <Link to="/solicitudes">Aprobación de solicitudes</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-foreground hover:bg-accent hover:text-white cursor-pointer"
                >
                  <Link to="/inteligencia-municipal">
                    Sistema de Inteligencia Municipal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-foreground hover:bg-accent hover:text-white cursor-pointer"
                >
                  <Link to="/analisis-sectores">Análisis de sectores</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Emprendedor Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-white font-medium hover:text-accent transition-colors whitespace-nowrap px-2">
                Emprendedor
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-primary border-0 rounded-lg"
              >
                <DropdownMenuItem
                  asChild
                  className="text-foreground hover:bg-accent hover:text-white cursor-pointer"
                >
                  <Link to="/inventario">Inventario</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-foreground hover:bg-accent hover:text-white cursor-pointer"
                >
                  <Link to="/mis-productos">Mis Productos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-foreground hover:bg-accent hover:text-white cursor-pointer"
                >
                  <Link to="/analiticas">Analíticas del negocio</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-foreground hover:bg-accent hover:text-white cursor-pointer"
                >
                  <Link to="/mis-eventos">Mis Eventos</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              className="block py-2 text-white font-medium hover:text-accent"
            >
              Emprendedores
            </Link>
            <Link
              to="/productos"
              className="block py-2 text-white font-medium hover:text-accent"
            >
              Productos
            </Link>
            <Link
              to="/carrito"
              className="block py-2 text-white font-medium hover:text-accent"
            >
              Carrito
            </Link>
            <Link
              to="/eventos"
              className="block py-2 text-white font-medium hover:text-accent"
            >
              Eventos
            </Link>
            <Link
              to="/entregas"
              className="block py-2 text-white font-medium hover:text-accent"
            >
              Entregas y seguimientos
            </Link>
            <Link
              to="/mapas"
              className="block py-2 text-white font-medium hover:text-accent"
            >
              Mapas
            </Link>
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
