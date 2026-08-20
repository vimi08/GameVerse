import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CardGamer = ({ juego, onAddToCart }) => {
  if (!juego) return null;

  return (
    <article className="bg-tertiary border border-secondary/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col justify-between group">
      {/* Enlace a la imagen de portada */}
      <Link to={`/detalle/${juego.id}`} className="relative block overflow-hidden aspect-[4/3] bg-neutral">
        <img
          src={juego.imagen}
          alt={juego.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tertiary via-transparent to-transparent opacity-60" />
      </Link>

      {/* Contenido de la Tarjeta */}
      <div className="p-4 flex flex-col grow justify-between">
        <div>
          <Link to={`/detalle/${juego.id}`}>
            <h3 className="text-white font-bold text-lg leading-snug mb-1 line-clamp-1 group-hover:text-primary transition duration-200">
              {juego.titulo}
            </h3>
          </Link>
          <span className="text-slate-400 text-xs font-medium block mb-4">
            {juego.categoria}
          </span>
        </div>

        {/* Pie de la tarjeta: Precio y Botón de Carrito verde */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
          <div className="text-white font-extrabold text-lg">
            $ {typeof juego.precio === "number" ? juego.precio.toLocaleString("es-AR") : juego.precio}
          </div>

          <button
            onClick={() => onAddToCart && onAddToCart(juego)}
            title="Añadir al carrito"
            className="bg-accent-green hover:bg-accent-green-hover text-white p-2.5 rounded-lg shadow-md transition duration-200 transform active:scale-95 flex items-center justify-center"
          >
            <FaShoppingCart className="text-base" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CardGamer;
