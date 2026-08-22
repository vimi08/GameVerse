import { Navigate, Outlet , useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectorRutas = () => {
  const { user } = useAppContext();
   const location = useLocation();
  //si no hay un usuario logueado
  if (!user) {
    return <Navigate to="/registro" replace />;
  }
  // usuario logueado y es admin
  if (user.rol === "admin") {
    return <Outlet />;
  }
  //usuario logueado pero no es admin
  return <Navigate to="/catalogo" replace />;
};
export default ProtectorRutas;