import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica de autenticación
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Usuario
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ej: correo@gmail.com"
            required
            className="mt-2 block w-full rounded-md bg-neutral px-4 py-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="mt-2 block w-full rounded-md bg-neutral px-4 py-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:outline-none transition"
          />
        </div>
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
