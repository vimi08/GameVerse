import React from "react";
import { 
  FaGamepad, 
  FaCompass, 
  FaDragon, 
  FaCrosshairs, 
  FaCube, 
  FaTrophy, 
  FaChessKnight 
} from "react-icons/fa";

const LISTA_CATEGORIAS = [
  { id: "Aventura", nombre: "Aventura", icono: FaCompass },
  { id: "RPG", nombre: "RPG", icono: FaDragon },
  { id: "Acción", nombre: "Acción", icono: FaCrosshairs },
  { id: "Simulación", nombre: "Simulación", icono: FaCube },
  { id: "Deportes", nombre: "Deportes", icono: FaTrophy },
  { id: "Estrategia", nombre: "Estrategia", icono: FaChessKnight },
];

const CategoriasSection = ({ categoriaSeleccionada, onSelectCategoria }) => {
  return (
    <section className="mb-12">
      {/* Título de la Sección idéntico al mockup */}
      <div className="flex items-center gap-3 mb-6">
        <FaGamepad className="text-[#76b82a] text-2xl" />
        <h2 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-wide">
          EXPLORÁ POR CATEGORÍAS
        </h2>
      </div>

      {/* Grilla de Categorías */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {LISTA_CATEGORIAS.map((cat) => {
          const Icono = cat.icono;
          const estaSeleccionada = categoriaSeleccionada === cat.nombre;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategoria(estaSeleccionada ? "" : cat.nombre)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition duration-300 transform hover:-translate-y-1 ${
                estaSeleccionada
                  ? "bg-[#2a475e] border-[#76b82a] text-white shadow-lg shadow-[#76b82a]/20"
                  : "bg-[#1b2838] border-[#2a475e]/40 hover:border-[#66c0f4]/50 text-slate-300 hover:text-white"
              }`}
            >
              <Icono className={`text-3xl mb-3 ${estaSeleccionada ? "text-[#76b82a]" : "text-slate-300"}`} />
              <span className="text-sm font-semibold tracking-wide">
                {cat.nombre}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriasSection;
