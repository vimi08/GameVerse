export const juegosIniciales = [
  {
    id: "1",
    titulo: "Cyberpunk 2077: Phantom Liberty",
    categoria: "RPG",
    precio: 29.99,
    destacado: true,
    imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    descripcion: "Una aventura de espionaje y suspenso ambientada en el peligroso distrito de Dogtown en Night City.",
    desarrollador: "CD Projekt Red",
    requisitos: "Intel Core i7-8700K, 16 GB RAM, NVIDIA RTX 2060, SSD 70 GB"
  },
  {
    id: "2",
    titulo: "Elden Ring: Shadow of the Erdtree",
    categoria: "Acción",
    precio: 39.99,
    destacado: true,
    imagen: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
    descripcion: "Explora la Tierra de las Sombras, descubre secretos oscuros y enfrenta temibles jefes legendarios.",
    desarrollador: "FromSoftware",
    requisitos: "Intel Core i7-8700K, 16 GB RAM, NVIDIA GTX 1070 8GB, 60 GB espacio"
  },
  {
    id: "3",
    titulo: "EA SPORTS FC 25",
    categoria: "Deportes",
    precio: 59.99,
    destacado: false,
    imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    descripcion: "Siente la experiencia del deporte rey con tácticas mejoradas con IA y más de 19,000 jugadores con licencia.",
    desarrollador: "EA Sports",
    requisitos: "Intel Core i5-6600k, 8 GB RAM, NVIDIA GTX 1050 Ti, 100 GB espacio"
  },
  {
    id: "4",
    titulo: "Red Dead Redemption 2",
    categoria: "Aventura",
    precio: 49.99,
    destacado: true,
    imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    descripcion: "Arthur Morgan y la banda de Van der Linde luchan por sobrevivir en las despiadadas tierras de Norteamérica.",
    desarrollador: "Rockstar Games",
    requisitos: "Intel Core i7-4770K, 12 GB RAM, NVIDIA GTX 1060 6GB, 150 GB espacio"
  },
  {
    id: "5",
    titulo: "Grand Theft Auto V",
    categoria: "Acción",
    precio: 29.99,
    destacado: false,
    imagen: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1200&q=80",
    descripcion: "Tres criminales muy diferentes lo arriesgan todo en una serie de audaces atracos en Los Santos.",
    desarrollador: "Rockstar North",
    requisitos: "Intel Core i5 3470, 8 GB RAM, NVIDIA GTX 660 2GB, 90 GB espacio"
  },
  {
    id: "6",
    titulo: "Civilization VI",
    categoria: "Estrategia",
    precio: 19.99,
    destacado: false,
    imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    descripcion: "Construye un imperio que resista el paso del tiempo desde la Edad de Piedra hasta la Era de la Información.",
    desarrollador: "Firaxis Games",
    requisitos: "Intel Core i5 2.5 GHz, 8 GB RAM, NVIDIA GTX 770, 15 GB espacio"
  }
];

export const CLAVE_LOCALSTORAGE_JUEGOS = "juegos";

export function obtenerJuegosGuardados() {
  const guardados = localStorage.getItem(CLAVE_LOCALSTORAGE_JUEGOS);
  if (!guardados) {
    localStorage.setItem(CLAVE_LOCALSTORAGE_JUEGOS, JSON.stringify(juegosIniciales));
    return juegosIniciales;
  }
  try {
    return JSON.parse(guardados);
  } catch (error) {
    console.error("Error al leer juegos de LocalStorage", error);
    return juegosIniciales;
  }
}
