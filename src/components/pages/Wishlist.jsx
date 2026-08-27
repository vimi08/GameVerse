import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaGamepad, FaTrashAlt } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import CardGamer from "../services/CardGamer";
import BeneficiosBar from "../services/BeneficiosBar";

const Wishlist = () => {
  const { wishlist, setWishlist } = useAppContext();
  const listaWishlist = Array.isArray(wishlist) ? wishlist : [];

  const vaciarWishlist = () => {
    setWishlist([]);
  };

  return (
    <div className="min-h-screen text-white pb-12">
      {/* Encabezado Banner Wishlist */}
      <section className="bg-gradient-to-r from-[#171a21] via-[#1b2838] to-[#171a21] border border-secondary/40 rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-500/20 p-2.5 rounded-xl border border-red-500/40 text-red-500">
                <FaHeart className="text-2xl animate-pulse" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
                TU LISTA DE DESEOS
              </h1>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Aquí puedes ver todos los videojuegos que has guardado para comprar o revisar más tarde.
            </p>
          </div>

          {listaWishlist.length > 0 && (
            <div className="flex items-center gap-3 self-start md:self-auto">
              <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                {listaWishlist.length} {listaWishlist.length === 1 ? "Juego guardado" : "Juegos guardados"}
              </span>

              <button
                onClick={vaciarWishlist}
                className="flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-400 text-xs font-bold px-3.5 py-2 rounded-xl transition duration-200"
                title="Vaciar lista de deseos"
              >
                <FaTrashAlt />
                <span>Vaciar lista</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Grilla de Juegos en Wishlist */}
      {listaWishlist.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {listaWishlist.map((juego) => (
            <CardGamer key={juego.id} juego={juego} />
          ))}
        </section>
      ) : (
        <section className="bg-[#1b2838] border border-[#2a475e]/40 rounded-2xl p-12 text-center my-8 shadow-inner">
          <div className="w-16 h-16 bg-[#171a21] border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-400">
            <FaHeart className="text-3xl opacity-60" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Tu lista de deseos está vacía</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
            Aún no has guardado ningún juego. Explora nuestro catálogo y haz clic en el ícono de corazón para guardar tus títulos preferidos.
          </p>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 bg-accent-green hover:bg-accent-green-hover text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-lg shadow-accent-green/20"
          >
            <FaGamepad className="text-lg" />
            <span>Explorar el Catálogo</span>
          </Link>
        </section>
      )}

      {/* Barra de Beneficios */}
      <BeneficiosBar />
    </div>
  );
};

export default Wishlist;
