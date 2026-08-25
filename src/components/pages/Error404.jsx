import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/404-bg.jpg";

const Error404 = () => {
  return (
    <div
      className="relative min-h-screen w-full flex items-center bg-[#05070a] bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Degradé oscuro para que el texto se lea bien sobre la imagen */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/50 via-transparent to-transparent" />

      <div className="relative z-10 px-6 sm:px-12 lg:px-20 max-w-3xl">
        <p className="text-8xl sm:text-9xl lg:text-[11rem] font-black leading-none">
          404
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
          ¡Ups! Página no encontrada
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-300">
          La página que buscás no existe o fue movida.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center justify-center rounded-lg px-8 py-4 font-semibold uppercase text-base sm:text-lg tracking-wide bg-green-600 hover:bg-green-500 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Error404;