import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import fondoGamer from "../../assets/fondoGamer.png";

export default function Registro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (data) => {
    const regexPassword =
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

    if (!regexPassword.test(data.password)) {
      Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        text: "Debe tener 8-16 caracteres, mayúscula, minúscula, número y símbolo",
        background: "#171a21",
        color: "#fff",
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
        background: "#171a21",
        color: "#fff",
      });
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuariosKey")) || [];
    const existe = usuarios.find((u) => u.email === data.email);
    if (existe) {
      Swal.fire({
        icon: "warning",
        title: "Correo ya registrado",
        text: "Ese correo ya tiene una cuenta",
        background: "#171a21",
        color: "#fff",
      });
      return;
    }

    const nuevoUsuario = {
      nombre: data.nombre,
      apellido: data.apellido,
      edad: data.edad,
      direccion: data.direccion,
      provincia: data.provincia,
      email: data.email,
      password: data.password,
      rol: "invitado",
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuariosKey", JSON.stringify(usuarios));

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Te registraste con éxito!",
      text: "Ahora podés iniciar tu sesión",
      showConfirmButton: false,
      timer: 2500,
      background: "#171a21",
      color: "#fff",
    });

    navigate("/login");
  };

  return (
    <div
      className="relative w-full h-screen bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${fondoGamer})` }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-1 w-full max-w-md bg-tertiary/70 p-6 rounded-lg shadow-md border border-primary/30 mx-auto"
      >
        {/* Encabezado */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary">GamerStore</h2>
          <p className="mt-1 text-sm text-gray-400">
            Registrate para crear tu cuenta
          </p>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {/* Nombre */}
          <div>
            <input
              type="text"
              placeholder="Nombre"
              autoComplete="off"
              {...register("nombre", { required: "El nombre es obligatorio" })}
              className="rounded-md bg-neutral px-3 py-2 text-white w-full"
            />
            {errors.nombre && (
              <span className="text-red-400 text-xs mt-1">
                {errors.nombre.message}
              </span>
            )}
          </div>

          {/* Apellido */}
          <div>
            <input
              type="text"
              placeholder="Apellido"
              autoComplete="off"
              {...register("apellido", {
                required: "El apellido es obligatorio",
              })}
              className="rounded-md bg-neutral px-3 py-2 text-white w-full"
            />
            {errors.apellido && (
              <span className="text-red-400 text-xs mt-1">
                {errors.apellido.message}
              </span>
            )}
          </div>

          {/* Edad */}
          <div>
            <input
              type="number"
              placeholder="Edad"
              autoComplete="off"
              {...register("edad", { required: "La edad es obligatoria" })}
              className="rounded-md bg-neutral px-3 py-2 text-white w-full"
            />
            {errors.edad && (
              <span className="text-red-400 text-xs mt-1">
                {errors.edad.message}
              </span>
            )}
          </div>

          {/* Provincia */}
          <div>
            <select
              {...register("provincia", {
                required: "La provincia es obligatoria",
              })}
              className="rounded-md bg-neutral px-3 py-2 text-white w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Seleccioná tu provincia
              </option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Catamarca">Catamarca</option>
              <option value="Chaco">Chaco</option>
              <option value="Chubut">Chubut</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Corrientes">Corrientes</option>
              <option value="Entre Ríos">Entre Ríos</option>
              <option value="Formosa">Formosa</option>
              <option value="Jujuy">Jujuy</option>
              <option value="La Pampa">La Pampa</option>
              <option value="La Rioja">La Rioja</option>
              <option value="Mendoza">Mendoza</option>
              <option value="Misiones">Misiones</option>
              <option value="Neuquén">Neuquén</option>
              <option value="Río Negro">Río Negro</option>
              <option value="Salta">Salta</option>
              <option value="San Juan">San Juan</option>
              <option value="San Luis">San Luis</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="Santa Fe">Santa Fe</option>
              <option value="Santiago del Estero">Santiago del Estero</option>
              <option value="Tierra del Fuego">Tierra del Fuego</option>
              <option value="Tucumán">Tucumán</option>
            </select>
            {errors.provincia && (
              <span className="text-red-400 text-xs mt-1">
                {errors.provincia.message}
              </span>
            )}
          </div>

          {/* Dirección */}
          <div className="sm:col-span-2">
            <input
              type="text"
              placeholder="Dirección"
              autoComplete="off"
              {...register("direccion", {
                required: "La dirección es obligatoria",
              })}
              className="rounded-md bg-neutral px-3 py-2 text-white w-full"
            />
            {errors.direccion && (
              <span className="text-red-400 text-xs mt-1">
                {errors.direccion.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <input
              type="email"
              placeholder="Correo electrónico"
              autoComplete="off"
              {...register("email", { required: "El correo es obligatorio" })}
              className="rounded-md bg-neutral px-3 py-2 text-white w-full"
            />
            {errors.email && (
              <span className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Contraseña */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              autoComplete="new-password"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              className="rounded-md bg-neutral px-3 py-2 text-white w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors.password && (
              <span className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Repetir contraseña"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Debes repetir la contraseña",
              })}
              className="rounded-md bg-neutral px-3 py-2 text-white w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
            >
              {showConfirm ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors.confirmPassword && (
              <span className="text-red-400 text-xs mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-3 py-2 text-xs font-semibold text-white bg-secondary rounded-md hover:bg-tertiary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-accent-green rounded-md hover:bg-accent-green-hover"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}
