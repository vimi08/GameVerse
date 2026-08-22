import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const safeParse = (key, fallback) => {
    try {
      return JSON.parse(sessionStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  };
  const safeParseLocal = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  };
  const [user, setUser] = useState(() => safeParse("usuarioKey", null));

  useEffect(() => {
    if (user !== null) {
      sessionStorage.setItem("usuarioKey", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("usuarioKey");
    }
  }, [user]);
  const [wishlist, setWishlist] = useState(() =>
    safeParseLocal("wishlistKey", []),
  );

  useEffect(() => {
    localStorage.setItem("wishlistKey", JSON.stringify(wishlist));
  }, [wishlist]);
  const logout = (redirect = "/") => {
    sessionStorage.removeItem("usuarioKey");
    setUser(null);
    navigate(redirect);
  };
  const value = {
    user,
    setUser,
    wishlist,
    setWishlist,
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
