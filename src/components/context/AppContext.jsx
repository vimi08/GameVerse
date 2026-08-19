import { createContext, useContext, useState } from "react";

export const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  // Estado global para compartir
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const value = {
    user,
    setUser,
    wishlist,
    setWishlist,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
}
