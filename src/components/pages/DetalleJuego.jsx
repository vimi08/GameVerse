import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaCheck,
  FaThumbsUp,
  FaRegCommentAlt,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import Error404 from "./Error404";
import gow1 from "../../assets/god_of_war_1.avif";
import gow2 from "../../assets/god_of_war_2.jpg";
import gow3 from "../../assets/god_of_war_3.jpg";

// Datos de ejemplo para God of War
const gameData = {
  id: "god-of-war",
  title: "God of War Ragnarök",
  category: "Aventura",
  developer: "Santa Monica Studio",
  releaseDate: "09 Nov, 2022",
  price: 27999,
  images: [gow1, gow2, gow3],
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

const initialDistribution = { 5: 1125, 4: 75, 3: 25, 2: 12, 1: 13 };

const initialReviews = [
  {
    id: 1,
    name: "LucasFer",
    avatarColor: "#3b82f6",
    rating: 5,
    date: "Hace 2 días",
    comment: "Un juegazo! Gráficos impresionantes y una historia increíble.",
    likes: 12,
    comments: 3,
  },
];

const currency = (n) => n.toLocaleString("es-AR", { minimumFractionDigits: 0 });

const StarRating = ({ value, size = 16 }) => {
  const safeValue = Math.max(0, Math.min(5, value || 0));
  return (
    <div className="flex gap-0.5" style={{ fontSize: size, lineHeight: 0 }}>
      {[...Array(5)].map((_, i) => {
        const fill = Math.max(0, Math.min(1, safeValue - i)) * 100;
        return (
          <span key={i} className="relative inline-block shrink-0">
            <FaStar className="text-gray-700" />
            <span
              className="absolute inset-0 overflow-hidden text-[#f5b301]"
              style={{ width: `${fill}%` }}
            >
              <FaStar />
            </span>
          </span>
        );
      })}
    </div>
  );
};

const StarInput = ({ value, onChange }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="text-xl transition-colors"
          style={{ color: n <= (hover || value) ? "#f5b301" : "#4b5563" }}
          aria-label={`${n} estrellas`}
        >
          <FaStar />
        </button>
      ))}
    </div>
  );
};

const TABS = [
  { id: "descripcion", label: "Descripción" },
  { id: "requisitos", label: "Requisitos del sistema" },
  { id: "resenas", label: "Reseñas" },
];

const DetalleJuego = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { juegos, toggleWishlist, estaEnWishlist } = useAppContext();

  // Buscar el juego en los datos almacenados
  const juegoActual = useMemo(() => {
    if (!id) return null;
    return juegos.find((j) => String(j.id) === String(id));
  }, [juegos, id]);

  // REGLA: Todos los juegos excepto God of War llevan al Error 404
  const esGodOfWar = useMemo(() => {
    if (!id) return false;
    if (String(id).toLowerCase().includes("god-of-war") || id === "gow") return true;
    if (!juegoActual) return false;
    return String(juegoActual.titulo || "").toLowerCase().includes("god of war");
  }, [juegoActual, id]);

  // Si no es God of War, renderizamos la vista de Error 404
  if (!esGodOfWar) {
    return <Error404 />;
  }

  const game = juegoActual
    ? {
        ...gameData,
        id: juegoActual.id,
        title: juegoActual.titulo || gameData.title,
        price: juegoActual.precio || gameData.price,
        category: juegoActual.categoria || gameData.category,
        description: juegoActual.descripcion || gameData.description,
        developer: juegoActual.desarrollador || gameData.developer,
        images: juegoActual.imagen ? [juegoActual.imagen, gow2, gow3] : gameData.images,
      }
    : gameData;

  const [activeTab, setActiveTab] = useState("descripcion");
  const [mainImage, setMainImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartStatus, setCartStatus] = useState("idle"); // idle | added

  const [distribution, setDistribution] = useState(initialDistribution);
  const [reviews, setReviews] = useState(initialReviews);
  const [likedReviews, setLikedReviews] = useState(new Set());

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  const totalReviews = useMemo(
    () => Object.values(distribution).reduce((a, b) => a + b, 0),
    [distribution]
  );

  const average = useMemo(() => {
    const sum = Object.entries(distribution).reduce(
      (acc, [stars, count]) => acc + Number(stars) * count,
      0
    );
    return totalReviews ? sum / totalReviews : 0;
  }, [distribution, totalReviews]);

  const handleAddToCart = () => {
    setCartStatus("added");
    setTimeout(() => setCartStatus("idle"), 1800);
  };

  const toggleLike = (id) => {
    setLikedReviews((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, likes: r.likes + (likedReviews.has(id) ? -1 : 1) }
          : r
      )
    );
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const review = {
      id: Date.now(),
      name: "Tú",
      avatarColor: "#22c55e",
      rating: newRating,
      date: "Ahora",
      comment: newComment.trim(),
      likes: 0,
      comments: 0,
    };

    setReviews((prev) => [review, ...prev]);
    setDistribution((prev) => ({
      ...prev,
      [newRating]: prev[newRating] + 1,
    }));
    setNewComment("");
    setNewRating(5);
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-gray-100 py-6 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1800px] mx-auto bg-[#111114] border border-white/10 rounded-2xl overflow-hidden">
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

        {/* Imagen + info principal */}
        <div className="grid md:grid-cols-2 gap-8 px-6 py-6">
          <div>
            <div className="w-full h-[300px] md:h-[420px] rounded-xl mb-3 overflow-hidden bg-black/40">
              <img
                src={game.images[mainImage]}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {game.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(i)}
                  className={`h-20 rounded-lg border-2 overflow-hidden transition-colors ${
                    mainImage === i
                      ? "border-green-500"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Ver imagen ${i + 1}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{game.title}</h1>

            <div className="flex items-center gap-2">
              <StarRating value={average} />
              <span className="text-gray-400 text-sm">
                {average.toFixed(1)} ({totalReviews.toLocaleString("es-AR")}{" "}
                reseñas)
              </span>
            </div>

            <p className="text-3xl font-bold">$ {currency(game.price)}</p>

            <div className="flex flex-col gap-3 max-w-xs">
              <button
                onClick={handleAddToCart}
                disabled={cartStatus === "added"}
                className={`flex items-center justify-center gap-2 rounded-lg py-3 font-semibold uppercase text-sm tracking-wide text-white transition-all shadow-[0_4px_16px_rgba(34,197,94,0.35)] ${
                  cartStatus === "added"
                    ? "bg-gradient-to-b from-[#15803d] to-[#0f6b30]"
                    : "bg-gradient-to-b from-[#4ade80] to-[#16a34a] hover:from-[#5eeb92] hover:to-[#1bb84f] hover:shadow-[0_4px_20px_rgba(34,197,94,0.55)]"
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
                onClick={() => toggleWishlist(game)}
                className="flex items-center justify-center gap-2 rounded-lg py-3 font-semibold uppercase text-sm tracking-wide border border-white/25 hover:bg-white/5 transition-colors"
              >
                {estaEnWishlist(game.id) ? (
                  <>
                    <FaHeart className="text-red-500" /> En tu wishlist
                  </>
                ) : (
                  <>
                    <FaRegHeart /> Agregar a wishlist
                  </>
                )}
              </button>
            </div>

            <div className="mt-2 space-y-1 text-sm">
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
                {tab.id === "resenas" && ` (${totalReviews.toLocaleString("es-AR")})`}
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

          {activeTab === "resenas" && (
            <div>
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <h3 className="text-lg font-semibold">Reseñas de usuarios</h3>
                <button
                  onClick={() => setShowReviewForm((v) => !v)}
                  className="border border-white/25 hover:bg-white/5 transition-colors rounded-lg px-4 py-2 text-sm font-semibold uppercase"
                >
                  Escribir reseña
                </button>
              </div>

              <div className="grid sm:grid-cols-[auto_1fr] gap-6 mb-6">
                <div className="text-center sm:text-left">
                  <p className="text-4xl font-bold">{average.toFixed(1)}</p>
                  <StarRating value={average} size={16} />
                  <p className="text-gray-400 text-sm mt-1">
                    {totalReviews.toLocaleString("es-AR")} reseñas
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-1.5">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = distribution[stars];
                    const pct = totalReviews
                      ? Math.round((count / totalReviews) * 100)
                      : 0;
                    return (
                      <div key={stars} className="flex items-center gap-2 text-sm">
                        <span className="w-3 text-gray-400">{stars}</span>
                        <FaStar className="text-[#f5b301]" size={11} />
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-9 text-gray-400 text-right">{pct}%</span>
                        <span className="w-12 text-gray-500 text-right">
                          ({count})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {showReviewForm && (
                <form
                  onSubmit={handleSubmitReview}
                  className="border border-white/10 rounded-xl p-4 mb-6 space-y-3"
                >
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Tu puntuación</p>
                    <StarInput value={newRating} onChange={setNewRating} />
                  </div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Contanos qué te pareció el juego..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-green-500 transition-colors resize-none"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-500 transition-colors px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      Publicar
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-5">
                {reviews.map((r) => (
                  <div key={r.id} className="border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                        style={{ background: r.avatarColor }}
                      >
                        {r.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{r.name}</p>
                        <StarRating value={r.rating} size={12} />
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{r.comment}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{r.date}</span>
                      <button
                        onClick={() => toggleLike(r.id)}
                        className={`flex items-center gap-1 hover:text-gray-300 transition-colors ${
                          likedReviews.has(r.id) ? "text-green-400" : ""
                        }`}
                      >
                        <FaThumbsUp size={11} /> {r.likes}
                      </button>
                      <span className="flex items-center gap-1">
                        <FaRegCommentAlt size={11} /> {r.comments}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;