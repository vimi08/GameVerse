import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaCheck,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

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
  description:
    "Kratos y Atreus se embarcan en un viaje mítico en busca de respuestas antes del Ragnarök. Explorá los nueve reinos, enfrentate a dioses y monstruos nórdicos en batallas épicas.",
  features: [
    "Viajá a través de increíbles paisajes nórdicos",
    "Enfrentamientos épicos contra enemigos legendarios",
    "Mejorás tus habilidades y armamento",
  ],
  requisitos: {
    minimos: [
      ["Sistema operativo", "Windows 10 64-bit"],
      ["Procesador", "Intel i5-2500K / AMD Ryzen 3 1200"],
      ["Memoria", "8 GB RAM"],
      ["Gráficos", "GTX 960 / RX 470"],
      ["Almacenamiento", "70 GB disponibles"],
    ],
    recomendados: [
      ["Sistema operativo", "Windows 11 64-bit"],
      ["Procesador", "Intel i5-6600K / AMD Ryzen 5 2400G"],
      ["Memoria", "8 GB RAM"],
      ["Gráficos", "GTX 1060 6GB / RX 570 4GB"],
      ["Almacenamiento", "70 GB disponibles (SSD recomendado)"],
    ],
  },
};

const currency = (n) => n.toLocaleString("es-AR", { minimumFractionDigits: 0 });

const TABS = [
  { id: "descripcion", label: "Descripción" },
  { id: "requisitos", label: "Requisitos del sistema" },
];

const DetalleJuego = () => {
  const navigate = useNavigate();
  const game = gameData;

  const [activeTab, setActiveTab] = useState("descripcion");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartStatus, setCartStatus] = useState("idle"); // idle | added

  const handleAddToCart = () => {
    setCartStatus("added");
    setTimeout(() => setCartStatus("idle"), 1800);
  };

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

          <div className="flex flex-col gap-3 max-w-xs mt-4">
            <button
              onClick={handleAddToCart}
              disabled={cartStatus === "added"}
              className={`flex items-center justify-center gap-2 rounded-lg py-3 font-semibold uppercase text-sm tracking-wide text-white transition-colors ${
                cartStatus === "added"
                  ? "bg-green-700"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {cartStatus === "added" ? (
                <>
                  <FaCheck /> Agregado al carrito
                </>
              ) : (
                <>
                  <FaShoppingCart /> Agregar al carrito
                </>
              )}
            </button>

            <button
              onClick={() => setIsWishlisted((v) => !v)}
              className="flex items-center justify-center gap-2 rounded-lg py-3 font-semibold uppercase text-sm tracking-wide border border-white/25 hover:bg-white/5 transition-colors"
            >
              {isWishlisted ? (
                <>
                  <FaHeart className="text-green-500" /> En tu wishlist
                </>
              ) : (
                <>
                  <FaRegHeart /> Agregar a wishlist
                </>
              )}
            </button>
          </div>

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

        {/* Tabs */}
        <div className="border-t border-white/10 px-6">
          <div className="flex gap-6 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 whitespace-nowrap text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-400"
                    : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido de tabs */}
        <div className="px-6 py-6">
          {activeTab === "descripcion" && (
            <div className="max-w-3xl">
              <p className="text-gray-300 leading-relaxed">{game.description}</p>
              <h3 className="text-green-400 font-semibold mt-5 mb-3">
                Características:
              </h3>
              <ul className="space-y-2">
                {game.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-200">
                    <FaCheck className="text-green-500 mt-1 shrink-0" size={12} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "requisitos" && (
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                ["Requisitos mínimos", game.requisitos.minimos],
                ["Requisitos recomendados", game.requisitos.recomendados],
              ].map(([title, rows]) => (
                <div key={title} className="border border-white/10 rounded-xl p-4">
                  <h3 className="font-semibold mb-3 text-white">{title}</h3>
                  <dl className="space-y-2 text-sm">
                    {rows.map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4">
                        <dt className="text-gray-400">{label}</dt>
                        <dd className="text-gray-200 text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;