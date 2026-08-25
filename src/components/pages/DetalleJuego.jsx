import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaTimes, FaChevronRight } from "react-icons/fa";

// Datos de ejemplo. Reemplazá esto por los datos reales del juego
// (por ejemplo obtenidos por fetch/useParams cuando conectes tu API/backend).
const gameData = {
  title: "God of War Ragnarök",
  category: "Aventura",
  developer: "Santa Monica Studio",
  releaseDate: "09 Nov, 2022",
  price: 27999,
  rating: 4.8,
  reviewsCount: 1250,
};

const currency = (n) => n.toLocaleString("es-AR", { minimumFractionDigits: 0 });

const DetalleJuego = () => {
  const navigate = useNavigate();
  const game = gameData;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-gray-100 py-6 px-4">
      <div className="max-w-6xl mx-auto bg-[#111114] border border-white/10 rounded-2xl overflow-hidden">
        {/* Header: breadcrumb + cerrar */}
        <div className="flex items-start justify-between px-6 pt-5">
          <nav className="text-sm text-gray-400 flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">
              Inicio
            </Link>
            <FaChevronRight className="text-[10px] opacity-60" />
            <span className="hover:text-white transition-colors cursor-pointer">
              Catálogo
            </span>
            <FaChevronRight className="text-[10px] opacity-60" />
            <span className="text-[#5fc9c0]">{game.category}</span>
            <FaChevronRight className="text-[10px] opacity-60" />
            <span className="text-white">{game.title}</span>
          </nav>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Cerrar"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Info principal */}
        <div className="px-6 py-6">
          <h1 className="text-3xl font-bold">{game.title}</h1>

          <div className="flex items-center gap-2 mt-2">
            <FaStar className="text-[#f5b301]" />
            <span className="text-gray-300 text-sm">
              {game.rating} ({game.reviewsCount.toLocaleString("es-AR")} reseñas)
            </span>
          </div>

          <p className="text-3xl font-bold mt-3">$ {currency(game.price)}</p>

          <div className="mt-4 space-y-1 text-sm">
            <p>
              <span className="text-gray-400">Categoría: </span>
              {game.category}
            </p>
            <p>
              <span className="text-gray-400">Desarrollador: </span>
              {game.developer}
            </p>
            <p>
              <span className="text-gray-400">Lanzamiento: </span>
              {game.releaseDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;