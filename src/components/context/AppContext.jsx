import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { juegosIniciales } from "../../data/juegos";

export const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const navigate = useNavigate();

  const safeParse = (key, fallback) => {
    try {
      return JSON.parse(sessionStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const safeParseLocal = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };
  // USUARIO
  const [user, setUser] = useState(() => safeParse("usuarioKey", null));
  useEffect(() => {
    if (user !== null) {
      sessionStorage.setItem("usuarioKey", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("usuarioKey");
    }
  }, [user]);
  // WISHLIST
  const [wishlist, setWishlist] = useState(() => {
    const parseado = safeParseLocal("wishlistKey", []);
    return Array.isArray(parseado) ? parseado : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlistKey", JSON.stringify(wishlist));
  }, [wishlist]);

  // FUNCIONES DE WISHLIST
  const toggleWishlist = (juego) => {
    if (!juego || !juego.id) return;
    setWishlist((actuales) => {
      const listaSegura = Array.isArray(actuales) ? actuales : [];
      const existe = listaSegura.some(
        (item) => String(item.id) === String(juego.id),
      );
      if (existe) {
        return listaSegura.filter(
          (item) => String(item.id) !== String(juego.id),
        );
      } else {
        return [...listaSegura, juego];
      }
    });
  };

  const estaEnWishlist = (id) => {
    if (!id || !Array.isArray(wishlist)) return false;
    return wishlist.some((item) => String(item.id) === String(id));
  };
  // JUEGOS
  const [juegos, setJuegos] = useState(() => {
    const parseadoKey = safeParseLocal("juegosKey", null);
    const parseadoJuegos = safeParseLocal("juegos", null);

    if (Array.isArray(parseadoKey) && parseadoKey.length > 0) {
      return parseadoKey;
    }
    if (Array.isArray(parseadoJuegos) && parseadoJuegos.length > 0) {
      return parseadoJuegos;
    }
    return juegosIniciales;
  });

  useEffect(() => {
    localStorage.setItem("juegosKey", JSON.stringify(juegos));
    localStorage.setItem("juegos", JSON.stringify(juegos));
  }, [juegos]);
  // AGREGAR JUEGO
  const agregarJuego = (nuevoJuego) => {
    setJuegos((actuales) => [...actuales, nuevoJuego]);
  };
  // ACTUALIZAR JUEGO
  const actualizarJuego = (id, datosActualizados) => {
    setJuegos((actuales) =>
      actuales.map((juego) =>
        juego.id === id
          ? {
              ...juego,
              ...datosActualizados,
            }
          : juego,
      ),
    );
  };
  // ELIMINAR JUEGO
  const eliminarJuego = (id) => {
    setJuegos((actuales) => actuales.filter((juego) => juego.id !== id));
  };
  // CERRAR SESIÓN
  const logout = (redirect = "/") => {
    sessionStorage.removeItem("usuarioKey");
    setUser(null);
    navigate(redirect);
  };
  // CONTEXTO
  const value = {
    user,
    setUser,

    wishlist,
    setWishlist,
    toggleWishlist,
    estaEnWishlist,

    juegos,
    setJuegos,
    agregarJuego,
    actualizarJuego,
    eliminarJuego,

    logout,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
}
