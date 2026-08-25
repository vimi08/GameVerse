import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/404-bg.jpg";

const Error404 = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-[#05070a] bg-cover bg-center text-white text-center px-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div>
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