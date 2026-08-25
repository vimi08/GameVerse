import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/404-bg.jpg";

const Error404 = () => {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-[#05070a] bg-cover bg-center text-white text-center px-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Degradé oscuro para que el texto se lea bien sobre la imagen */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/50 via-transparent to-transparent" />

      <div className="relative z-10">
        <p className="text-6xl font-black">404</p>
        <h1 className="mt-4 text-2xl font-bold">¡Ups! Página no encontrada</h1>
        <p className="mt-3 text-gray-300">
          La página que buscás no existe o fue movida.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold uppercase text-sm bg-green-600 hover:bg-green-500 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Error404;