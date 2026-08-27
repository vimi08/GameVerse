import React, { useState, useEffect, useRef } from "react";
import { FaGamepad, FaSearch, FaTimes } from "react-icons/fa";
import { obtenerJuegosGuardados } from "../../data/juegos";
import BannerGames from "../services/BannerGames";
import CardGamer from "../services/CardGamer";
import CategoriasSection from "../services/CategoriasSection";
import BeneficiosBar from "../services/BeneficiosBar";

const Principal = () => {
  const [juegos, setJuegos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const catalogoRef = useRef(null);

  // Cargar juegos al montar la página
  useEffect(() => {
    const listaJuegos = obtenerJuegosGuardados();
    setJuegos(listaJuegos);
  }, []);

  const scrollToCatalogo = () => {
    catalogoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filtrar juegos según la búsqueda por nombre y la categoría seleccionada
  const juegosFiltrados = juegos.filter((juego) => {
    const coincideNombre = juego.titulo
      .toLowerCase()
      .includes(busqueda.toLowerCase().trim());
    const coincideCategoria = categoriaSeleccionada
      ? juego.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase()
      : true;

    return coincideNombre && coincideCategoria;
  });

  return (
    <div className="min-h-screen text-white pb-12">
      {/* 1. Hero Banner ("EL MUNDO GAMER TE ESPERA") */}
      <BannerGames onExplorarClick={scrollToCatalogo} />

      {/* 2. Sección del Catálogo de Juegos */}
      <section ref={catalogoRef} className="mb-12 scroll-mt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Título "JUEGOS DESTACADOS" idéntico al mockup */}
          <div className="flex items-center gap-3">
            <FaGamepad className="text-[#76b82a] text-2xl" />
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-wide">
              {categoriaSeleccionada ? `JUEGOS: ${categoriaSeleccionada.toUpperCase()}` : "JUEGOS DESTACADOS"}
            </h2>
          </div>

          {/* Barra de Búsqueda rápida por nombre */}
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-[#1b2838] border border-[#2a475e]/60 rounded-xl px-4 py-2 pl-10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#76b82a] transition duration-200"
            />
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Indicador de filtro activo si se seleccionó una categoría */}
        {categoriaSeleccionada && (
          <div className="flex items-center gap-2 mb-6 bg-[#1b2838] border border-[#76b82a]/50 w-fit px-4 py-1.5 rounded-full text-xs text-white">
            <span>Categoría: <strong>{categoriaSeleccionada}</strong></span>
            <button
              onClick={() => setCategoriaSeleccionada("")}
              className="ml-1 text-[#76b82a] hover:text-white font-bold"
            >
              ✕ Limpiar
            </button>
          </div>
        )}

        {/* Grilla de Tarjetas de Juegos */}
        {juegosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {juegosFiltrados.map((juego) => (
              <CardGamer key={juego.id} juego={juego} />
            ))}
          </div>
        ) : (
          <div className="bg-[#1b2838] border border-[#2a475e]/40 rounded-2xl p-10 text-center my-8">
            <p className="text-slate-300 text-lg font-medium mb-2">
              No se encontraron juegos que coincidan con tu búsqueda.
            </p>
            <button
              onClick={() => {
                setBusqueda("");
                setCategoriaSeleccionada("");
              }}
              className="mt-3 bg-[#76b82a] hover:bg-[#65a30d] text-white font-bold px-5 py-2 rounded-xl text-sm transition"
            >
              Ver todos los juegos
            </button>
          </div>
        )}
      </section>

      {/* 3. Sección "EXPLORÁ POR CATEGORÍAS" */}
      <CategoriasSection
        categoriaSeleccionada={categoriaSeleccionada}
        onSelectCategoria={(cat) => {
          setCategoriaSeleccionada(cat);
          scrollToCatalogo();
        }}
      />

      {/* 4. Barra de Beneficios del Pie */}
      <BeneficiosBar />
    </div>
  );
};

export default Principal;