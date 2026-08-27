import React from "react";
import { FaTruck, FaCreditCard, FaHeadset, FaLock } from "react-icons/fa";

const BENEFICIOS = [
  {
    id: 1,
    titulo: "ENVÍOS A TODO EL PAÍS",
    subtitulo: "Rápidos y seguros",
    icono: FaTruck,
  },
  {
    id: 2,
    titulo: "MEDIOS DE PAGO",
    subtitulo: "Tarjetas y transferencias",
    icono: FaCreditCard,
  },
  {
    id: 3,
    titulo: "ATENCIÓN 24/7",
    subtitulo: "Estamos para ayudarte",
    icono: FaHeadset,
  },
  {
    id: 4,
    titulo: "COMPRA SEGURA",
    subtitulo: "Tus datos protegidos",
    icono: FaLock,
  },
];

const BeneficiosBar = () => {
  return (
    <section className="bg-[#1b2838] border border-[#2a475e]/40 rounded-2xl p-6 sm:p-8 mt-12 mb-8 shadow-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 division-x divide-slate-800">
        {BENEFICIOS.map((b) => {
          const Icono = b.icono;
          return (
            <div key={b.id} className="flex items-center gap-4 px-2">
              <div className="bg-[#171a21] p-3.5 rounded-xl border border-[#2a475e]/50 text-[#76b82a] flex items-center justify-center shrink-0">
                <Icono className="text-2xl" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide">
                  {b.titulo}
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  {b.subtitulo}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BeneficiosBar;
