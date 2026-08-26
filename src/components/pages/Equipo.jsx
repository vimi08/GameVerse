import { useState } from "react";
import victoriaImg from "../../assets/victoria.jpeg";
import samuelImg from "../../assets/samuel.jpeg";
import agustinmatasImg from "../../assets/agustinmatas.jpeg";
import agustibeltranImg from "../../assets/agustinbeltran.jpeg";
import fondoVerde from "../../assets/Fondoverde.png";
import {
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaGamepad,
  FaLightbulb,
  FaUsers,
  FaCode,
  FaPaintBrush,
  FaServer,
  FaBug,
  FaHeadset,
  FaEnvelope,
  FaBox,
  FaShoppingCart,
  FaHandshake,
} from "react-icons/fa";
export default function AboutPage() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [openChat, setOpenChat] = useState(false);
  const team = [
    {
      name: "VictoriaPonce",
      role: "Frontend Developer",
      description: "Apasionada por React y la experiencia de usuario.",
      img: victoriaImg,
      github: "https://github.com/vimi08",
    },
    {
      name: "AgustinMatas",
      role: "Backend Developer",
      description: "Fan de Node.js y bases de datos.",
      img: agustinmatasImg,
      github: "https://github.com/agusmatas004",
    },
    {
      name: "SamuelGallardo",
      role: "UI/UX Designer",
      description: "Diseña interfaces intuitivas y visualmente atractivas.",
      img: samuelImg,
      github: "https://github.com/samuelgallardo873-lgtm",
    },
    {
      name: "AgustinBeltran",
      role: "QA Tester",
      description: "Garantiza la calidad y estabilidad del sistema.",
      img: agustibeltranImg,
      github: "https://github.com/Ismaelbeltran-12",
    },
  ];
  const values = [
    {
      icon: <FaGamepad />,
      title: "Pasión por los videojuegos",
      quote: "“Ser gamer es levantarse después de cada Game Over.”",
      text: "Amamos los videojuegos tanto como nuestros usuarios.",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovación",
      quote:
        "“El mundo teme la caída en el abismo… solo cuando caes aprendes si puedes volar.” – Dragon Age: Origins",
      text: "Siempre en busca de lo último en tecnología y tendencias gamer.",
    },
    {
      icon: <FaUsers />,
      title: "Trabajo en equipo / Comunidad",
      quote:
        "“No hay nada más valioso que la lealtad.” – Call of Duty: Modern Warfare 3",
      text: "Colaboramos para alcanzar grandes logros y experiencias únicas.",
    },
  ];
  const items = [
    {
      id: 1,
      icon: <FaEnvelope className="text-black text-lg" />,
      title: "Contáctanos para conocer más sobre nuestras oportunidades",
      detail:
        "Nuestro equipo responderá en menos de 24 horas con toda la info que necesites.",
    },
    {
      id: 2,
      icon: <FaShoppingCart className="text-black text-lg" />,
      title: "Vende en nuestra plataforma y llega a miles de gamers",
      detail:
        "Podrás publicar tus productos y acceder a una comunidad gamer activa.",
    },
    {
      id: 3,
      icon: <FaHandshake className="text-black text-lg" />,
      title: "Conviértete en afiliado y genera ingresos ilimitados",
      detail:
        "Obtén comisiones por recomendar nuestra tienda a otros jugadores.",
    },
    {
      id: 4,
      icon: <FaHeadset className="text-black text-lg" />,
      title: "Únete a nuestro equipo y crece con nosotros",
      detail:
        "Formarás parte de un grupo apasionado por el gaming y la innovación.",
    },
  ];
  const support = [
    {
      icon: <FaHeadset />,
      title: "Soporte Técnico",
      text: "Respuesta inmediata de nuestro equipo. Ayuda con instalación de juegos y consultas técnicas.",
    },
    {
      icon: <FaEnvelope />,
      title: "Atención al Cliente",
      text: "Comunicate con nosotros por cualquier consulta sobre tus pedidos o catálogo.",
    },
    {
      icon: <FaBox />,
      title: "Seguimiento de Pedidos",
      text: "Controla el estado de tus compras y recibe asistencia personalizada.",
    },
  ];
  return (
    <main className="font-sans bg-gray-900 text-white">
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-800 py-16 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">Sobre Nosotros</h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-300">
          Bienvenido a{" "}
          <span className="text-green-400 font-semibold">Ecommerce Gamer</span>,
          tu tienda dedicada a todo lo relacionado con los videojuegos. Creada
          por un equipo de apasionados del gaming y la tecnología, nació con la
          visión de ofrecer una plataforma confiable y moderna para todos los
          jugadores. Nuestro catálogo reúne títulos, accesorios y experiencias
          digitales, respaldados por innovación constante y un compromiso con la
          calidad. La comunidad es el corazón de lo que hacemos: cada gamer
          cuenta, cada partida importa.
        </p>
      </section>
      {/* SECCIÓN EQUIPO */}
      <section
        className="relative bg-gray-900/50 backdrop-blur-lg py-20 px-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${fondoVerde})` }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Nuestro Equipo</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-12">
            Somos un grupo dinámico de gamers y desarrolladores que compartimos
            la misma pasión: crear experiencias épicas para nuestra comunidad.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:scale-105 transition-transform hover:shadow-green-500/50"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-green-500 mb-4"
              />
              <h3 className="text-lg font-bold text-white">{member.name}</h3>
              <p className="text-green-400 font-medium text-sm">
                {member.role}
              </p>
              <p className="text-gray-400 mt-2 text-center text-xs">
                {member.description}
              </p>

              {/* Enlaces dinámicos */}
              <div className="flex gap-3 mt-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 text-sm"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* SECCIÓN OPORTUNIDADES */}
      <section className="py-16 px-6 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-center text-white">
        <h2 className="text-4xl font-bold text-center mb-6">
          ¿Quieres formar parte de nuestro equipo?
        </h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-6">
          Oportunidades de carrera flexibles, híbridas y remotas para impulsar
          tu crecimiento personal y profesional.
        </p>
        <div className="max-w-3xl mx-auto bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-6">
          {/* Botón principal con flechas verdes */}
          <button
            onClick={() => setOpen(!open)}
            className="flex justify-between items-center w-full text-left text-lg font-semibold text-green-400 hover:text-green-300 transition-colors"
          >
            Más información
            {open ? (
              <FaChevronUp className="text-green-400" />
            ) : (
              <FaChevronDown className="text-green-400" />
            )}
          </button>

          {/* Contenido animado */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              open ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="text-gray-300 space-y-3 text-sm bg-gray-900/60 rounded-lg p-4 shadow-inner">
              {items.map((item) => (
                <div key={item.id} className="border-b border-gray-700 pb-2">
                  <button
                    onClick={() =>
                      setActiveItem(activeItem === item.id ? null : item.id)
                    }
                    className="flex items-center gap-2 w-full text-left hover:text-green-400 transition-colors"
                  >
                    {/* Ícono dinámico */}
                    {activeItem === item.id ? (
                      <FaChevronUp className="text-green-400" />
                    ) : (
                      <FaChevronDown className="text-green-400" />
                    )}
                    {item.icon}
                    <span>{item.title}</span>
                  </button>
                  {activeItem === item.id && (
                    <p className="mt-2 text-sm text-gray-400 italic">
                      {item.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* SECCIÓN SOPORTE */}
      <section className="py-16 px-6 bg-gray-800 relative">
        <h2 className="text-4xl font-bold text-center mb-10">
          Centro de Soporte
        </h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Estamos para ayudarte. Comunicate con nuestro equipo por cualquier
          consulta sobre tus juegos y pedidos.
        </p>

        {/* Bloques compactos */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/70 rounded-lg p-4 shadow-md flex items-center gap-3 hover:shadow-green-500/50 transition">
            <FaEnvelope className="text-green-400 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Atención al Cliente</h3>
              <p className="text-gray-300 text-sm">
                Comunicate con nosotros por cualquier consulta sobre tus pedidos
                o catálogo.
              </p>
            </div>
          </div>
          <div className="bg-gray-900/70 rounded-lg p-4 shadow-md flex items-center gap-3 hover:shadow-green-500/50 transition">
            <FaBox className="text-green-400 text-2xl" />
            <div>
              <h3 className="text-lg font-semibold">Seguimiento de Pedidos</h3>
              <p className="text-gray-300 text-sm">
                Controla el estado de tus compras y recibe asistencia
                personalizada.
              </p>
            </div>
          </div>
        </div>
        {/* Botón sticky lateral */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => setOpenChat(true)}
            className="bg-green-500 text-black p-4 rounded-full shadow-lg hover:bg-green-600 transition border-2 border-black"
          >
            <FaHeadset className="text-2xl" />
          </button>
        </div>
        {/* Modal de chat */}
        {openChat && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl shadow-lg w-96 p-6 relative">
              <h3 className="text-xl font-bold text-green-400 mb-4">
                Soporte Técnico IA
              </h3>
              <div className="bg-gray-800 rounded-lg p-4 h-40 overflow-y-auto text-sm text-gray-300 mb-4">
                <p>👾 Hola gamer, soy tu asistente virtual.</p>
                <p>¿En qué puedo ayudarte hoy?</p>
              </div>
              <input
                type="text"
                placeholder="Escribe tu consulta..."
                className="w-full p-2 rounded-lg bg-gray-700 text-white text-sm focus:outline-none"
              />
              <button
                onClick={() => setOpenChat(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
