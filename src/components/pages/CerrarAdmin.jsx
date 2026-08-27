import { useAppContext } from "../context/AppContext";

export default function LogoutButton() {
  const { logout } = useAppContext(); 
  return (
    <button
      onClick={() => logout("/")} 
      className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300"
    >
      Cerrar sesión
    </button>
  );
}
