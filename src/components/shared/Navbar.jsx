import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaGamepad,
  FaSearch,
  FaBell,
  FaGlobe,
  FaUser,
  FaUserCircle,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAppContext();
  const isCurrentPath = (path) => location.pathname === path;

  return (
    <header className="bg-neutral border-b border-secondary/40 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* LOGO GAMER STORE */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-accent-green p-2 rounded-xl text-white group-hover:scale-105 transition">
            <FaGamepad className="text-2xl" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-wider text-white uppercase leading-none">
              GAMER
            </span>
            <span className="text-xs font-bold text-slate-400 tracking-widest leading-none">
              STORE
            </span>
          </div>
        </Link>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <Link
            to="/"
            className={`pb-1 transition duration-200 ${
              isCurrentPath("/")
                ? "text-white border-b-2 border-accent-green"
                : "text-slate-300 hover:text-white"
            }`}
          >
            INICIO
          </Link>
          <Link
            to="/catalogo"
            className={`pb-1 transition duration-200 ${
              isCurrentPath("/catalogo")
                ? "text-white border-b-2 border-accent-green"
                : "text-slate-300 hover:text-white"
            }`}
          >
            CATÁLOGO
          </Link>
          <Link
            to="/"
            className="text-slate-300 hover:text-white pb-1 transition duration-200"
          >
            WISHLIST
          </Link>
          <Link
            to="/equipo"
            className={`pb-1 transition duration-200 ${
              isCurrentPath("/equipo")
                ? "text-white border-b-2 border-accent-green"
                : "text-slate-300 hover:text-white"
            }`}
          >
            ABOUT
          </Link>
          {user?.rol === "admin" && (
            <Link
              to="/admin"
              className={`pb-1 transition duration-200 flex items-center gap-1.5 ${
                isCurrentPath("/admin")
                  ? "text-accent-green border-b-2 border-accent-green"
                  : "text-amber-400 hover:text-amber-300"
              }`}
            >
              <FaUserShield className="text-sm" />
              <span>PANEL ADMIN</span>
            </Link>
          )}
        </nav>

        {/* BARRA DE BÚSQUEDA Y SECCIÓN DE PERFIL / AUTENTICACIÓN */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center relative">
            <input
              type="text"
              placeholder="Buscar juegos..."
              className="bg-tertiary border border-secondary/50 text-white placeholder-slate-400 text-xs rounded-full pl-4 pr-9 py-2 w-48 focus:w-60 focus:outline-none focus:border-accent-green transition-all duration-300"
            />
            <FaSearch className="absolute right-3 text-slate-400 text-xs" />
          </div>

          <button
            title="Idioma"
            className="text-slate-400 hover:text-white p-2 text-sm hidden sm:block"
          >
            <FaGlobe />
          </button>

          <button
            title="Notificaciones"
            className="relative text-slate-400 hover:text-white p-2 text-sm hidden sm:block"
          >
            <FaBell />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-green rounded-full" />
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              {/* ÍCONO Y BOTÓN DE PERFIL / ADMIN */}
              <Link
                to={user.rol === "admin" ? "/admin" : "#"}
                title={user.email}
                className="flex items-center gap-2 bg-tertiary/90 hover:bg-tertiary border border-secondary/60 hover:border-accent-green text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg transition duration-200"
              >
                {user.rol === "admin" ? (
                  <FaUserShield className="text-accent-green text-base" />
                ) : (
                  <FaUserCircle className="text-accent-green text-base" />
                )}
                <span className="hidden sm:inline max-w-[110px] truncate">
                  {user.email ? user.email.split("@")[0] : "Perfil"}
                </span>
              </Link>

              {/* CERRAR SESIÓN */}
              <button
                onClick={() => logout("/")}
                title="Cerrar sesión"
                className="flex items-center gap-1.5 bg-red-500/90 hover:bg-red-600 text-white font-bold uppercase text-xs px-3 py-2 rounded-lg shadow-md transition duration-200"
              >
                <FaSignOutAlt className="text-xs" />
                <span className="hidden sm:inline">SALIR</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              title="Acceder a tu cuenta"
              className="flex items-center gap-2 bg-accent-green hover:bg-accent-green-hover text-white font-bold uppercase text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-md transition duration-200 transform hover:-translate-y-0.5"
            >
              <FaUser className="text-sm" />
              <span>INICIAR SESIÓN</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
