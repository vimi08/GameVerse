// Páginas
import Acceso from "./components/pages/Acceso";
import Registro from "./components/pages/Registro";
import Admin from "./components/pages/Admin";
import DetalleJuego from "./components/pages/DetalleJuego";
import Equipo from "./components/pages/Equipo";
import Error404 from "./components/pages/Error404";
import Principal from "./components/pages/Principal";
// Componentes compartidos
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
// Contexto
import { AppProvider } from "./components/context/AppContext";
// Rutas
import ProtectorRutas from "./components/routes/ProtectorRutas";
// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// React Hooks
import React, { useState, useEffect } from "react";
function App() {
  const getUsuario = () =>
    JSON.parse(sessionStorage.getItem("usuarioKey")) || false;
  const getServicios = () =>
    JSON.parse(localStorage.getItem("serviciosKey")) || [];

  const [usuarioLogueado, setUsuarioLogueado] = useState(getUsuario);
  const [servicios, setServicios] = useState(getServicios);

  useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);

  useEffect(() => {
    localStorage.setItem("serviciosKey", JSON.stringify(servicios));
  }, [servicios]);

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Principal />} />
              <Route path="/login" element={<Acceso />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/detalle/:id" element={<DetalleJuego />} />
              <Route
                path="/admin"
                element={
                  <ProtectorRutas>
                    <Admin />
                  </ProtectorRutas>
                }
              />
              <Route path="/equipo" element={<Equipo />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
