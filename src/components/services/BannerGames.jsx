import React from "react";

const BannerGames = ({ onExplorarClick }) => {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden shadow-2xl mb-12 border border-slate-800 bg-[#171a21]">
      {/* Contenedor de la imagen de fondo con degradados oscuros */}
      <div className="relative min-h-[380px] sm:min-h-[460px] w-full flex items-center">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80"
          alt="Banner Hero Gamer"
          className="absolute inset-0 w-full h-full object-cover object-right sm:object-center brightness-75 scale-105"
        />

        {/* Degradado oscuro lateral y de fondo idéntico al mockup */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#171a21] via-[#171a21]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171a21] via-transparent to-transparent" />

        {/* Contenido textual del Hero Banner */}
        <div className="relative z-10 px-6 sm:px-12 py-10 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight mb-3">
            EL MUNDO GAMER <br />
            <span className="text-[#76b82a]">TE ESPERA</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl font-medium mb-8 max-w-md">
            Explorá, descubrí y comprá tus juegos favoritos
          </p>

          <button
            onClick={onExplorarClick}
            className="inline-block bg-[#76b82a] hover:bg-[#65a30d] text-white font-bold uppercase text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg shadow-[#76b82a]/30 transition duration-300 transform hover:-translate-y-0.5"
          >
            EXPLORAR CATÁLOGO
          </button>
        </div>
      </div>
    </section>
  );
};

export default BannerGames;
