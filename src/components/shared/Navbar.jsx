import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGamepad, FaSearch, FaBell, FaGlobe } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <header className="bg-[#171a21] border-b border-[#2a475e]/40 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* LOGO GAMER STORE */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-[#76b82a] p-2 rounded-xl text-white group-hover:scale-105 transition">
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

        {/* NAVEGACIÓN PRINCIPAL (Idéntica al mockup) */}
        <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <Link
            to="/"
            className={`pb-1 transition duration-200 ${
              isCurrentPath("/")
                ? "text-white border-b-2 border-[#76b82a]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            INICIO
          </Link>
          <Link
            to="/"
            className="text-slate-300 hover:text-white pb-1 transition duration-200"
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
                ? "text-white border-b-2 border-[#76b82a]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            ABOUT
          </Link>
        </nav>

        {/* BARRA DE BÚSQUEDA Y BOTÓN INICIAR SESIÓN */}
        <div className="flex items-center gap-4">
          <div className="hidden xl:flex items-center relative">
            <input
              type="text"
              placeholder="Buscar juegos..."
              className="bg-[#1b2838] border border-[#2a475e]/50 text-white placeholder-slate-400 text-xs rounded-full pl-4 pr-9 py-2 w-48 focus:w-60 focus:outline-none focus:border-[#76b82a] transition-all duration-300"
            />
            <FaSearch className="absolute right-3 text-slate-400 text-xs" />
          </div>

          <button title="Idioma" className="text-slate-400 hover:text-white p-2 text-sm hidden sm:block">
            <FaGlobe />
          </button>

          <button title="Notificaciones" className="relative text-slate-400 hover:text-white p-2 text-sm hidden sm:block">
            <FaBell />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#76b82a] rounded-full" />
          </button>

          <Link
            to="/login"
            className="bg-[#76b82a] hover:bg-[#65a30d] text-white font-bold uppercase text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md transition duration-200 transform hover:-translate-y-0.5"
          >
            INICIAR SESIÓN
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;