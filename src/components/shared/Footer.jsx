import React from "react";
import { FaGamepad, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#171a21] border-t border-[#2a475e]/40 text-slate-400 py-10 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#76b82a] p-2 rounded-xl text-white">
            <FaGamepad className="text-xl" />
          </div>
          <div>
            <span className="text-white font-black tracking-wider uppercase text-lg">
              GAMER STORE
            </span>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Todos los derechos reservados.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 flex items-center gap-1">
          Desarrollado con <FaHeart className="text-red-500" /> para el Módulo 2
        </p>
      </div>
    </footer>
  );
};

export default Footer;