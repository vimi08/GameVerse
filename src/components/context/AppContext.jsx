import { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext(undefined);
export function AppProvider({ children }) {
  const getUsuario = () =>
    JSON.parse(sessionStorage.getItem("usuarioKey")) || null;
  const [user, setUser] = useState(getUsuario);

  useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(user));
  }, [user]);

  const getWishlist = () =>
    JSON.parse(localStorage.getItem("wishlistKey")) || [];
  const [wishlist, setWishlist] = useState(getWishlist);

  useEffect(() => {
    localStorage.setItem("wishlistKey", JSON.stringify(wishlist));
  }, [wishlist]);

  const value = {
    user,
    setUser,
    wishlist,
    setWishlist,
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
