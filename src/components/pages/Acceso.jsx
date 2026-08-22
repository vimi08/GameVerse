import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppContext } from "../context/AppContext";

export default function Acceso() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const onSubmit = (data) => {
    if (
      data.email === import.meta.env.VITE_EMAIL &&
      data.password === import.meta.env.VITE_PASSWORD
    ) {
      Swal.fire({
        title: "Bienvenido Administrador",
        text: "Ingresando a GamerStore",
        icon: "success",
        background: "#171a21",
        color: "#fff",
        confirmButtonColor: "#76b82a",
        width: "300px",
        customClass: {
          popup: "rounded-xl text-lg",
          title: "text-2xl font-bold",
          confirmButton: "px-8 py-3 text-base",
        },
      });
      setUser({ email: data.email, rol: "admin" });
      navigate("/admin");
    } else {
      Swal.fire({
        title: "Error",
        text: "Las credenciales son incorrectas",
        icon: "error",
        background: "#171a21",
        color: "#fff",
        confirmButtonColor: "#ef4444",
        width: "300px",
        customClass: {
          title: "text-xl font-semibold",
          confirmButton: "px-6 py-2 text-sm",
        },
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-sm mx-auto mt-12 bg-tertiary p-6 rounded-xl shadow-lg border border-primary/30"
    >
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-primary tracking-wide">
          GamerStore
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Iniciá sesión para acceder a tu catálogo
        </p>
      </div>

      {/* Campos */}
      <div className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Usuario
          </label>
          <input
            id="email"
            type="text"
            placeholder="Ej: correo@gmail.com"
            className="mt-2 block w-full rounded-md bg-neutral px-4 py-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition"
            {...register("email", {
              required: "Tu correo es la llave de acceso",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Formato incorrecto, intenta otra vez",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-400 text-sm mt-2 font-mono animate-pulse">
              ⚡ {errors.email.message}
            </span>
          )}
        </div>
      </div>
      {/* Contraseña */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          className="mt-2 block w-full rounded-md bg-neutral px-4 py-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition"
          {...register("password", {
            required: "Tu contraseña es tu escudo",
            pattern: {
              value:
                /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
              message:
                "Tu contraseña debe ser más poderosa: 8-16 caracteres, mayúscula, minúscula, número y símbolo",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-400 text-sm mt-2 font-mono animate-pulse">
            ⚡ {errors.password.message}
          </span>
        )}
      </div>
      {/* Botones */}
      <div className="flex items-center justify-between mt-10">
        <button
          type="button"
          className="px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-md hover:bg-tertiary transition-colors duration-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-sm font-semibold text-white bg-accent-green rounded-md hover:bg-accent-green-hover transition-transform duration-300 hover:scale-105 shadow-lg"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
}
