import React, { useState, useMemo } from "react";
import { FaGamepad, FaSearch, FaTimes, FaFilter, FaSortAmountDown } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import CardGamer from "../services/CardGamer";
import CategoriasSection from "../services/CategoriasSection";
import BeneficiosBar from "../services/BeneficiosBar";

const CATEGORIAS_LISTA = [
  "Todas",
  "Acción",
  "Aventura",
  "Deportes",
  "Estrategia",
  "RPG",
  "Simulación",
];

const Catalogo = () => {
  const { juegos } = useAppContext();
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [orden, setOrden] = useState("defecto");

  // Filtrado y ordenamiento dinámico de juegos
  const juegosFiltrados = useMemo(() => {
    let lista = juegos.filter((juego) => {
      const coincideNombre = String(juego.titulo ?? "")
        .toLowerCase()
        .includes(busqueda.toLowerCase().trim());
      const coincideCategoria =
        categoriaSeleccionada === "Todas" ||
        String(juego.categoria ?? "").toLowerCase() ===
          categoriaSeleccionada.toLowerCase();

      return coincideNombre && coincideCategoria;
    });

    if (orden === "precio-asc") {
      lista.sort((a, b) => Number(a.precio) - Number(b.precio));
    } else if (orden === "precio-desc") {
      lista.sort((a, b) => Number(b.precio) - Number(a.precio));
    } else if (orden === "nombre") {
      lista.sort((a, b) => String(a.titulo).localeCompare(String(b.titulo)));
    }

    return lista;
  }, [juegos, busqueda, categoriaSeleccionada, orden]);

  return (
    <div className="min-h-screen text-white pb-12">
      {/* Encabezado del Catálogo */}
      <section className="bg-gradient-to-r from-[#171a21] via-[#1b2838] to-[#171a21] border border-secondary/40 rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-accent-green/20 p-2.5 rounded-xl border border-accent-green/40 text-accent-green">
                <FaGamepad className="text-2xl" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
                CATÁLOGO COMPLETO
              </h1>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Explora todos los videojuegos disponibles en nuestra plataforma. Encuentra tus títulos favoritos agregados por la comunidad y administradores.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
              {juegosFiltrados.length} {juegosFiltrados.length === 1 ? "Juego" : "Juegos"} disponibles
            </span>
          </div>
        </div>
      </section>

      {/* Barra de Filtros y Búsqueda */}
      <section className="bg-[#1b2838] border border-[#2a475e]/50 rounded-xl p-4 md:p-6 mb-8 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Búsqueda por nombre */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar juego por título..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-[#171a21] border border-[#2a475e]/70 text-white placeholder-slate-400 text-sm rounded-xl pl-10 pr-9 py-2.5 focus:outline-none focus:border-accent-green transition duration-200"
            />
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Selector de ordenamiento */}
          <div className="flex items-center gap-2">
            <FaSortAmountDown className="text-accent-green text-sm" />
            <span className="text-xs uppercase font-bold text-slate-400">Ordenar por:</span>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="bg-[#171a21] border border-[#2a475e]/70 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-accent-green cursor-pointer"
            >
              <option value="defecto">Predeterminado</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="nombre">Nombre (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Chips de Categorías */}
        <div className="mt-5 pt-4 border-t border-[#2a475e]/40 flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mr-2">
            <FaFilter className="text-accent-green text-xs" />
            <span>Categorías:</span>
          </div>
          {CATEGORIAS_LISTA.map((cat) => {
            const activa = categoriaSeleccionada.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition duration-200 uppercase ${
                  activa
                    ? "bg-accent-green text-white shadow-md shadow-accent-green/20"
                    : "bg-[#171a21] text-slate-300 hover:text-white border border-[#2a475e]/40 hover:border-slate-500"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grilla de Juegos */}
      {juegosFiltrados.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {juegosFiltrados.map((juego) => (
            <CardGamer key={juego.id} juego={juego} />
          ))}
        </section>
      ) : (
        <section className="bg-[#1b2838] border border-[#2a475e]/40 rounded-2xl p-12 text-center my-8 shadow-inner">
          <div className="w-16 h-16 bg-[#171a21] border border-accent-green/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent-green">
            <FaGamepad className="text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No se encontraron juegos</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            No hay ningún juego que coincida con los filtros seleccionados. Intenta borrar los filtros de búsqueda.
          </p>
          <button
            onClick={() => {
              setBusqueda("");
              setCategoriaSeleccionada("Todas");
              setOrden("defecto");
            }}
            className="bg-accent-green hover:bg-accent-green-hover text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-lg shadow-accent-green/20"
          >
            Limpiar filtros de catálogo
          </button>
        </section>
      )}

      {/* Sección "EXPLORÁ POR CATEGORÍAS" */}
      <CategoriasSection
        categoriaSeleccionada={categoriaSeleccionada === "Todas" ? "" : categoriaSeleccionada}
        onSelectCategoria={(cat) => setCategoriaSeleccionada(cat)}
      />

      {/* Beneficios */}
      <BeneficiosBar />
    </div>
  );
};

export default Catalogo;
