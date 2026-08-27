import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  FaChartBar,
  FaEdit,
  FaGamepad,
  FaPlus,
  FaTrash,
  FaUsers,
  FaTimes,
  FaSave,
  FaStar,
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const CATEGORIAS = [
  "Acción",
  "Aventura",
  "Deportes",
  "Estrategia",
  "RPG",
  "Simulación",
];

const normalizarUrlImagen = (rawUrl) => {
  if (!rawUrl) return "";
  let url = rawUrl.trim();

  if (url.includes("drive.google.com") && url.includes("/file/d/")) {
    const match = url.match(/\/file\/d\/([^\/]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  if (url.includes("google.com/imgres") || url.includes("google.com/url")) {
    try {
      const parsed = new URL(url);
      const imgurl =
        parsed.searchParams.get("imgurl") || parsed.searchParams.get("url");
      if (imgurl) return imgurl;
    } catch {}
  }

  if (url.includes("dropbox.com")) {
    return url.replace("dl=0", "raw=1");
  }

  if (
    url.includes("imgur.com") &&
    !url.includes("i.imgur.com") &&
    !url.includes("data:image")
  ) {
    const parts = url.split("/");
    const id = parts[parts.length - 1].split("?")[0].split(".")[0];
    if (id) return `https://i.imgur.com/${id}.png`;
  }

  return url;
};

const juegoInicial = {
  titulo: "",
  categoria: "",
  precio: "",
  imagen: "",
  descripcion: "",
  desarrollador: "",
  requisitos: "",
  destacado: false,
};

const Admin = () => {
  const { juegos, agregarJuego, actualizarJuego, eliminarJuego } =
    useAppContext();

  const [seccion, setSeccion] = useState("dashboard");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [formulario, setFormulario] = useState(juegoInicial);
  const [busqueda, setBusqueda] = useState("");

  const [usuarios, setUsuarios] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("usuariosKey")) || [];
    } catch {
      return [];
    }
  });

  const juegosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    if (!termino) return juegos;

    return juegos.filter(
      (juego) =>
        String(juego.titulo ?? "")
          .toLowerCase()
          .includes(termino) ||
        String(juego.categoria ?? "")
          .toLowerCase()
          .includes(termino) ||
        String(juego.desarrollador ?? "")
          .toLowerCase()
          .includes(termino),
    );
  }, [juegos, busqueda]);

  const categorias = useMemo(() => {
    const existentes = juegos.map((juego) => juego.categoria).filter(Boolean);

    return [...new Set([...CATEGORIAS, ...existentes])].sort((a, b) =>
      a.localeCompare(b),
    );
  }, [juegos]);

  const destacados = juegos.filter((juego) => juego.destacado).length;

  const abrirCrear = () => {
    setJuegoEditando(null);
    setFormulario({ ...juegoInicial });
    setMostrarFormulario(true);
    setSeccion("juegos");
  };

  const abrirEditar = (juego) => {
    setJuegoEditando(juego.id);

    setFormulario({
      titulo: juego.titulo ?? "",
      categoria: juego.categoria ?? "",
      precio: juego.precio ?? "",
      imagen: juego.imagen ?? "",
      descripcion: juego.descripcion ?? "",
      desarrollador: juego.desarrollador ?? "",
      requisitos: juego.requisitos ?? "",
      destacado: Boolean(juego.destacado),
    });

    setMostrarFormulario(true);
    setSeccion("juegos");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cerrarFormulario = () => {
    setFormulario({ ...juegoInicial });
    setJuegoEditando(null);
    setMostrarFormulario(false);
  };

  const manejarCambio = (event) => {
    const { name, value, type, checked } = event.target;
    let valorFinal = type === "checkbox" ? checked : value;

    if (name === "imagen" && typeof valorFinal === "string") {
      valorFinal = normalizarUrlImagen(valorFinal);
    }

    setFormulario((actual) => ({
      ...actual,
      [name]: valorFinal,
    }));
  };

  const manejarSubidaArchivoImagen = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "warning",
        title: "Archivo muy grande",
        text: "La imagen no debe superar los 5MB.",
        background: "#171a21",
        color: "#fff",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target.result;
      setFormulario((actual) => ({
        ...actual,
        imagen: base64Url,
      }));
    };
    reader.readAsDataURL(file);
  };

  const guardarJuego = (event) => {
    event.preventDefault();

    const camposObligatorios = [
      "titulo",
      "categoria",
      "precio",
      "imagen",
      "descripcion",
      "desarrollador",
      "requisitos",
    ];

    const hayCamposVacios = camposObligatorios.some(
      (campo) => String(formulario[campo] ?? "").trim() === "",
    );

    if (hayCamposVacios) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Completá todos los campos del juego.",
        background: "#171a21",
        color: "#fff",
        confirmButtonColor: "#76b82a",
      });

      return;
    }
    const precio = Number(formulario.precio);

    if (!Number.isFinite(precio) || precio < 0) {
      Swal.fire({
        icon: "warning",
        title: "Precio inválido",
        text: "Ingresá un precio válido mayor o igual a 0.",
        background: "#171a21",
        color: "#fff",
        confirmButtonColor: "#76b82a",
      });

      return;
    }
    const juego = {
      ...formulario,
      titulo: formulario.titulo.trim(),
      categoria: formulario.categoria.trim(),
      imagen: formulario.imagen.trim(),
      descripcion: formulario.descripcion.trim(),
      desarrollador: formulario.desarrollador.trim(),
      requisitos: formulario.requisitos.trim(),
      precio,
      destacado: Boolean(formulario.destacado),
    };
    if (juegoEditando !== null) {
      actualizarJuego(juegoEditando, juego);

      Swal.fire({
        icon: "success",
        title: "Juego actualizado",
        text: "Los cambios fueron guardados correctamente.",
        timer: 1600,
        showConfirmButton: false,
        background: "#171a21",
        color: "#fff",
      });
    } else {
      agregarJuego({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        ...juego,
      });

      Swal.fire({
        icon: "success",
        title: "Juego agregado",
        text: "El juego fue agregado al catálogo.",
        timer: 1600,
        showConfirmButton: false,
        background: "#171a21",
        color: "#fff",
      });
    }

    cerrarFormulario();
  };
  const confirmarEliminarJuego = async (juego) => {
    const resultado = await Swal.fire({
      title: "¿Eliminar juego?",
      html: `Vas a eliminar <strong>${juego.titulo}</strong> del catálogo.`,
      icon: "warning",
      background: "#171a21",
      color: "#fff",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2a475e",
    });
    if (!resultado.isConfirmed) return;
    eliminarJuego(juego.id);
    Swal.fire({
      icon: "success",
      title: "Juego eliminado",
      timer: 1400,
      showConfirmButton: false,
      background: "#171a21",
      color: "#fff",
    });
  };
  const eliminarUsuario = async (usuario) => {
    const resultado = await Swal.fire({
      title: "¿Eliminar usuario?",
      html: `Se eliminará la cuenta de <strong>${usuario.nombre} ${usuario.apellido}</strong>.`,
      icon: "warning",
      background: "#171a21",
      color: "#fff",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2a475e",
    });
    if (!resultado.isConfirmed) return;
    try {
      const actuales = JSON.parse(localStorage.getItem("usuariosKey")) || [];

      const actualizados = actuales.filter(
        (item) => item.email !== usuario.email,
      );

      localStorage.setItem("usuariosKey", JSON.stringify(actualizados));
      setUsuarios(actualizados);
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado",
        timer: 1400,
        showConfirmButton: false,
        background: "#171a21",
        color: "#fff",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar",
        text: "Ocurrió un error al actualizar los usuarios.",
        background: "#171a21",
        color: "#fff",
      });
    }
  };
  const cambiarSeccion = (nuevaSeccion) => {
    setSeccion(nuevaSeccion);

    if (nuevaSeccion !== "juegos") {
      cerrarFormulario();
    }
  };
  const renderMenu = () => (
    <aside className="w-full shrink-0 rounded-2xl border border-secondary/50 bg-tertiary p-3 md:w-64">
      <div className="mb-4 px-3 pt-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          Administración
        </p>
        <h2 className="mt-1 text-lg font-black text-white">GameVerse</h2>
      </div>
      <nav className="space-y-1">
        <button
          type="button"
          onClick={() => cambiarSeccion("dashboard")}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
            seccion === "dashboard"
              ? "bg-accent-green text-white"
              : "text-slate-300 hover:bg-secondary/60 hover:text-white"
          }`}
        >
          <FaChartBar />
          Dashboard
        </button>

        <button
          type="button"
          onClick={() => cambiarSeccion("juegos")}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
            seccion === "juegos"
              ? "bg-accent-green text-white"
              : "text-slate-300 hover:bg-secondary/60 hover:text-white"
          }`}
        >
          <FaGamepad />
          Juegos
        </button>
        <button
          type="button"
          onClick={() => cambiarSeccion("usuarios")}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
            seccion === "usuarios"
              ? "bg-accent-green text-white"
              : "text-slate-300 hover:bg-secondary/60 hover:text-white"
          }`}
        >
          <FaUsers />
          Usuarios
        </button>
      </nav>
    </aside>
  );
  const renderDashboard = () => (
    <section>
      <div className="mb-7 flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-green">
          Administración
        </p>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          Dashboard
        </h1>
        <p className="text-sm text-slate-400">
          Resumen general de tu tienda GameVerse.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<FaGamepad />} label="Juegos" value={juegos.length} />
        <StatCard icon={<FaUsers />} label="Usuarios" value={usuarios.length} />
        <StatCard icon={<FaStar />} label="Destacados" value={destacados} />
        <StatCard
          icon={<FaChartBar />}
          label="Categorías"
          value={
            new Set(juegos.map((juego) => juego.categoria).filter(Boolean)).size
          }
        />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-secondary/50 bg-tertiary p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Catálogo reciente</h2>
              <p className="text-sm text-slate-400">
                Últimos juegos disponibles.
              </p>
            </div>
            <button
              type="button"
              onClick={() => cambiarSeccion("juegos")}
              className="text-sm font-bold text-accent-green hover:text-accent-green-hover"
            >
              Ver todos
            </button>
          </div>
          <div className="space-y-3">
            {juegos
              .slice(-5)
              .reverse()
              .map((juego) => (
                <div
                  key={juego.id}
                  className="flex items-center gap-3 rounded-xl border border-secondary/40 bg-neutral/60 p-3"
                >
                  <img
                    src={juego.imagen}
                    alt={juego.titulo}
                    className="h-12 w-16 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-white">
                      {juego.titulo}
                    </p>

                    <p className="text-xs text-slate-400">{juego.categoria}</p>
                  </div>
                  <span className="font-bold text-accent-green">
                    $ {Number(juego.precio).toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="rounded-2xl border border-secondary/50 bg-tertiary p-6">
          <h2 className="text-lg font-bold">Acciones rápidas</h2>
          <p className="mt-1 text-sm text-slate-400">
            Administrá el contenido de la tienda.
          </p>
          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={abrirCrear}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-green px-4 py-3 text-sm font-bold text-white transition hover:bg-accent-green-hover"
            >
              <FaPlus />
              Agregar juego
            </button>
            <button
              type="button"
              onClick={() => cambiarSeccion("juegos")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-secondary bg-secondary/40 px-4 py-3 text-sm font-bold text-white transition hover:bg-secondary"
            >
              <FaGamepad />
              Administrar juegos
            </button>
            <button
              type="button"
              onClick={() => cambiarSeccion("usuarios")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-secondary bg-secondary/40 px-4 py-3 text-sm font-bold text-white transition hover:bg-secondary"
            >
              <FaUsers />
              Administrar usuarios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
  const renderFormulario = () => (
    <form
      onSubmit={guardarJuego}
      className="mb-6 rounded-2xl border border-secondary/50 bg-tertiary p-5 sm:p-6"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-green">
            {juegoEditando !== null ? "Edición" : "Nuevo registro"}
          </p>

          <h2 className="mt-1 text-xl font-black text-white">
            {juegoEditando !== null ? "Editar juego" : "Agregar juego"}
          </h2>
        </div>
        <button
          type="button"
          onClick={cerrarFormulario}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-secondary/50 hover:text-white"
          aria-label="Cerrar formulario"
        >
          <FaTimes />
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <AdminInput
          label="Título"
          name="titulo"
          value={formulario.titulo}
          onChange={manejarCambio}
          placeholder="Ej: Elden Ring"
          required
        />
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Categoría
          </label>
          <select
            name="categoria"
            value={formulario.categoria}
            onChange={manejarCambio}
            required
            className="w-full rounded-xl border border-secondary bg-neutral px-4 py-3 text-sm text-white outline-none transition focus:border-accent-green"
          >
            <option value="">Seleccioná una categoría</option>

            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
        <AdminInput
          label="Precio"
          name="precio"
          type="number"
          min="0"
          step="0.01"
          value={formulario.precio}
          onChange={manejarCambio}
          placeholder="29.99"
          required
        />
        <AdminInput
          label="Desarrollador"
          name="desarrollador"
          value={formulario.desarrollador}
          onChange={manejarCambio}
          placeholder="Ej: CD Projekt Red"
          required
        />
        <div className="md:col-span-2 space-y-3 bg-neutral/40 p-4 rounded-xl border border-secondary/40">
          <label className="block text-sm font-semibold text-slate-200">
            Imagen del juego (URL o archivo local) *
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Opción A: Pegar enlace/URL</span>
              <input
                name="imagen"
                type="text"
                value={formulario.imagen}
                onChange={manejarCambio}
                placeholder="Pegá cualquier enlace de imagen (http, https, Drive, etc.)"
                required={!formulario.imagen}
                className="w-full rounded-xl border border-secondary bg-neutral px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent-green"
              />
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Opción B: Subir desde tu equipo</span>
              <input
                type="file"
                accept="image/*"
                onChange={manejarSubidaArchivoImagen}
                className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-accent-green file:text-white hover:file:bg-accent-green-hover cursor-pointer"
              />
            </div>
          </div>

          {/* VISTA PREVIA EN TIEMPO REAL */}
          {formulario.imagen && (
            <div className="mt-3 flex items-center gap-4 bg-tertiary p-3 rounded-xl border border-secondary/50">
              <img
                src={formulario.imagen}
                alt="Vista previa del juego"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80";
                }}
                className="h-20 w-32 object-cover rounded-lg border border-secondary shadow shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-accent-green">✓ Vista previa de la imagen cargada</p>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">{formulario.imagen}</p>
                <button
                  type="button"
                  onClick={() => setFormulario((prev) => ({ ...prev, imagen: "" }))}
                  className="text-xs text-red-400 hover:underline mt-1 block font-semibold"
                >
                  Quitar imagen
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formulario.descripcion}
            onChange={manejarCambio}
            rows="4"
            required
            placeholder="Descripción del juego..."
            className="w-full resize-y rounded-xl border border-secondary bg-neutral px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent-green"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Requisitos del sistema
          </label>
          <textarea
            name="requisitos"
            value={formulario.requisitos}
            onChange={manejarCambio}
            rows="3"
            required
            placeholder="Procesador, RAM, GPU, almacenamiento..."
            className="w-full resize-y rounded-xl border border-secondary bg-neutral px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent-green"
          />
        </div>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-secondary/60 bg-neutral/50 p-4 md:col-span-2">
          <input
            type="checkbox"
            name="destacado"
            checked={formulario.destacado}
            onChange={manejarCambio}
            className="h-4 w-4 accent-[var(--accent-green)]"
          />
          <span>
            <span className="block text-sm font-bold text-white">
              Juego destacado
            </span>
            <span className="block text-xs text-slate-500">
              El juego podrá aparecer dentro de la sección de destacados.
            </span>
          </span>
        </label>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={cerrarFormulario}
          className="rounded-xl border border-secondary bg-secondary/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-secondary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-accent-green px-5 py-3 text-sm font-bold text-white transition hover:bg-accent-green-hover"
        >
          <FaSave />
          {juegoEditando !== null ? "Guardar cambios" : "Agregar juego"}
        </button>
      </div>
    </form>
  );
  const renderJuegos = () => (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-green">
            Catálogo
          </p>
          <h1 className="mt-1 text-3xl font-black text-white">Juegos</h1>
          <p className="mt-1 text-sm text-slate-400">
            Agregá, editá y eliminá juegos del catálogo.
          </p>
        </div>
        <button
          type="button"
          onClick={abrirCrear}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent-green px-5 py-3 text-sm font-bold text-white transition hover:bg-accent-green-hover"
        >
          <FaPlus />
          Agregar juego
        </button>
      </div>
      {mostrarFormulario && renderFormulario()}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-400">
          Mostrando{" "}
          <span className="font-bold text-white">{juegosFiltrados.length}</span>{" "}
          de {juegos.length} juegos
        </div>
        <input
          type="search"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          placeholder="Buscar juego, categoría o desarrollador..."
          className="w-full rounded-xl border border-secondary bg-tertiary px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-accent-green sm:max-w-sm"
        />
      </div>
      <div className="overflow-hidden rounded-2xl border border-secondary/50 bg-tertiary">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-secondary/60 bg-neutral/60 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-4">Juego</th>
                <th className="px-4 py-4">Categoría</th>
                <th className="px-4 py-4">Precio</th>
                <th className="px-4 py-4">Destacado</th>
                <th className="px-4 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {juegosFiltrados.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-12 text-center text-slate-400"
                  >
                    {juegos.length === 0
                      ? "No hay juegos registrados. Agregá el primero."
                      : "No encontramos juegos con esa búsqueda."}
                  </td>
                </tr>
              ) : (
                juegosFiltrados.map((juego) => (
                  <tr
                    key={juego.id}
                    className="border-b border-secondary/40 last:border-0 hover:bg-secondary/10"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={juego.imagen}
                          alt={juego.titulo}
                          className="h-12 w-16 shrink-0 rounded-lg object-cover"
                        />

                        <div className="min-w-0">
                          <p className="max-w-[330px] truncate font-bold text-white">
                            {juego.titulo}
                          </p>

                          <p className="max-w-[330px] truncate text-xs text-slate-500">
                            {juego.desarrollador}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-300">
                      {juego.categoria}
                    </td>
                    <td className="px-4 py-4 font-bold text-white">
                      $ {Number(juego.precio).toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      {juego.destacado ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent-green/15 px-3 py-1 text-xs font-bold text-accent-green">
                          <FaStar />
                          Sí
                        </span>
                      ) : (
                        <span className="rounded-full bg-secondary/50 px-3 py-1 text-xs font-bold text-slate-400">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => abrirEditar(juego)}
                          className="inline-flex items-center gap-2 rounded-lg bg-primary/15 px-3 py-2 text-xs font-bold text-primary transition hover:bg-primary/25"
                        >
                          <FaEdit />
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => confirmarEliminarJuego(juego)}
                          className="inline-flex items-center gap-2 rounded-lg bg-red-500/15 px-3 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/25"
                        >
                          <FaTrash />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
  const renderUsuarios = () => (
    <section>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-green">
          Cuentas
        </p>
        <h1 className="mt-1 text-3xl font-black text-white">Usuarios</h1>
        <p className="mt-1 text-sm text-slate-400">
          Consultá y eliminá los usuarios registrados en GameVerse.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-secondary/50 bg-tertiary">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-secondary/60 bg-neutral/60 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-4">Nombre</th>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Edad</th>
                <th className="px-4 py-4">Provincia</th>
                <th className="px-4 py-4">Rol</th>
                <th className="px-4 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-12 text-center text-slate-400"
                  >
                    No hay usuarios registrados.
                  </td>
                </tr>
              ) : (
                usuarios.map((usuario) => (
                  <tr
                    key={usuario.email}
                    className="border-b border-secondary/40 last:border-0 hover:bg-secondary/10"
                  >
                    <td className="px-4 py-4 font-semibold text-white">
                      {usuario.nombre} {usuario.apellido}
                    </td>

                    <td className="px-4 py-4 text-slate-300">
                      {usuario.email}
                    </td>

                    <td className="px-4 py-4 text-slate-300">{usuario.edad}</td>

                    <td className="px-4 py-4 text-slate-300">
                      {usuario.provincia}
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
                        {usuario.rol || "invitado"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => eliminarUsuario(usuario)}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-500/15 px-3 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/25"
                      >
                        <FaTrash />
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
  return (
    <div className="w-full py-4 text-white sm:py-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 rounded-2xl border border-secondary/50 bg-neutral/80 px-5 py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-green">
                Acceso autorizado
              </p>
              <p className="text-sm text-slate-400">
                Panel exclusivo para administración del catálogo.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <span className="h-2 w-2 rounded-full bg-accent-green" />
              ADMIN
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          {renderMenu()}
          <main className="min-w-0 flex-1 rounded-2xl border border-secondary/40 bg-neutral/20 p-1">
            <div className="rounded-xl p-4 sm:p-6 lg:p-7">
              {seccion === "dashboard" && renderDashboard()}
              {seccion === "juegos" && renderJuegos()}
              {seccion === "usuarios" && renderUsuarios()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
const AdminInput = ({ label, name, ...props }) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-200">
      {label}
    </label>
    <input
      name={name}
      {...props}
      className="w-full rounded-xl border border-secondary bg-neutral px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-accent-green"
    />
  </div>
);
const StatCard = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-secondary/50 bg-tertiary p-5">
    <div className="flex items-center justify-between">
      <div className="rounded-xl bg-accent-green/15 p-3 text-accent-green">
        {icon}
      </div>

      <span className="text-3xl font-black text-white">{value}</span>
    </div>
    <p className="mt-4 text-sm font-bold text-slate-400">{label}</p>
  </div>
);
export default Admin;
