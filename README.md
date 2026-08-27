🎮 GameStore
E-commerce Gamer — Proyecto Integrador
GameStore es una plataforma web de comercio electrónico orientada a la venta y exploración de videojuegos. El proyecto fue desarrollado utilizando React y está enfocado en la gestión de productos, navegación entre páginas, autenticación simulada y persistencia de información mediante LocalStorage.
El proyecto forma parte de un trabajo integrador en el que se aplican conceptos de desarrollo frontend moderno, gestión de estados, componentes reutilizables, rutas protegidas y diseño responsive.
________________________________________
📌 Características principales
🛒 Catálogo de videojuegos
•	Visualización de videojuegos disponibles.
•	Búsqueda de juegos por nombre.
•	Información detallada de cada videojuego.
•	Visualización de:
o	Nombre.
o	Precio.
o	Categoría.
o	Imagen.
o	Descripción.
o	Requisitos del sistema.
o	Desarrollador.
🔎 Detalle de videojuegos
Cada videojuego cuenta con una página individual donde el usuario puede consultar toda la información relacionada con el producto.
Ruta:
/detalle/:id
🔐 Sistema de autenticación
GameStore cuenta con un sistema de autenticación simulado que permite diferenciar entre:
•	Usuario visitante.
•	Usuario registrado.
•	Usuario administrador.
El acceso al panel de administración se encuentra restringido para usuarios que no tengan permisos de administrador.
👨‍💻 Panel de administración
El administrador dispone de un panel desde el cual puede gestionar el catálogo de videojuegos mediante operaciones CRUD:
•	Crear nuevos videojuegos.
•	Leer y consultar videojuegos existentes.
•	Editar información de videojuegos.
•	Eliminar videojuegos.
•	Para Ingresar colocar admin@gameverse.com y de contraseña “Admin123!”
Ruta:
/admin
💾 Persistencia con LocalStorage
La información de la aplicación utiliza LocalStorage para conservar datos en el navegador.
Esto permite mantener información como:
•	Catálogo de videojuegos.
•	Usuarios registrados.
•	Sesión del usuario.
•	Lista de deseos.
•	Cambios realizados desde el panel de administración.
Los cambios importantes se sincronizan automáticamente utilizando React y useEffect.
❤️ Lista de deseos
Los usuarios autenticados pueden guardar videojuegos en una lista de deseos para acceder posteriormente a sus productos favoritos.
Esta funcionalidad depende de la implementación disponible en la versión actual del proyecto.
⭐ Sistema de reseñas
El proyecto contempla un sistema de reseñas para que los usuarios autenticados puedan valorar los videojuegos.
Las reseñas pueden incluir:
•	Comentario.
•	Voto positivo o negativo.
También se puede calcular dinámicamente la cantidad de valoraciones positivas y negativas.
Funcionalidad opcional contemplada dentro de los requerimientos del proyecto.
________________________________________
🗺️ Rutas
Ruta	Descripción	Acceso
/	Página principal y catálogo	Público
/detalle/:id	Detalle de un videojuego	Público
/admin	Panel de administración	Administrador
/about	Información del equipo	Público
/404	Página de error personalizada	Público
________________________________________
🛠️ Tecnologías utilizadas
Frontend
•	React 19
•	React DOM 19
•	Vite
•	Tailwind CSS 4
•	React Router DOM
•	React Hook Form
Librerías adicionales
•	Heroicons — Iconos para la interfaz.
•	React Icons — Biblioteca adicional de iconos.
•	SweetAlert2 — Alertas y ventanas de confirmación.
•	ESLint — Análisis y calidad del código.
Persistencia
•	LocalStorage
No se utiliza una base de datos externa. La persistencia de datos se realiza directamente en el navegador.
________________________________________
📦 Dependencias principales
@heroicons/react
@tailwindcss/vite
react
react-dom
react-hook-form
react-icons
react-router
react-router-dom
sweetalert2
tailwindcss
Dependencias de desarrollo
@eslint/js
@types/react
@types/react-dom
@vitejs/plugin-react
eslint
eslint-plugin-react-hooks
eslint-plugin-react-refresh
globals
vite
________________________________________
🚀 Instalación
Para ejecutar GameStore de manera local es necesario tener instalado Node.js.
1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
2. Acceder a la carpeta del proyecto
cd GameStore
3. Instalar las dependencias
Si utilizás npm:
npm install
También se encuentra disponible un archivo pnpm-lock.yaml, por lo que el proyecto puede instalarse utilizando pnpm:
pnpm install
4. Ejecutar el proyecto
npm run dev
Luego de ejecutar el comando, Vite proporcionará una dirección local para acceder a la aplicación.
________________________________________
📜 Scripts disponibles
El proyecto cuenta con los siguientes scripts:
Desarrollo
npm run dev
Inicia el servidor de desarrollo de Vite.
Compilación
npm run build
Genera la versión optimizada del proyecto para producción.
Vista previa
npm run preview
Permite visualizar localmente la versión compilada del proyecto.
Linter
npm run lint
Ejecuta ESLint para detectar posibles errores y problemas relacionados con la calidad del código.
________________________________________
📁 Estructura general del proyecto
La estructura principal del proyecto se organiza de la siguiente manera:
GameStore/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   ├── assets/
│   ├── data/
│   └── ...
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── vite.config.js
└── README.md
La estructura interna puede variar según la organización final de los componentes y funcionalidades del proyecto.
________________________________________
💾 Gestión de datos
GameStore utiliza LocalStorage como mecanismo de persistencia.
Esto permite que determinada información permanezca almacenada incluso después de cerrar o actualizar el navegador.
La aplicación utiliza React Hooks, principalmente useEffect, para sincronizar los cambios realizados en los datos con el almacenamiento local.
Ejemplo conceptual:
useEffect(() => {
  localStorage.setItem("games", JSON.stringify(games));
}, [games]);
De esta manera, cada modificación realizada sobre la información almacenada puede sincronizarse automáticamente.
________________________________________
🔑 Roles de usuario
👤 Usuario visitante
Un visitante puede:
•	Explorar el catálogo.
•	Buscar videojuegos.
•	Consultar los detalles de los productos.
•	Acceder a la sección “About”.
•	Iniciar sesión o registrarse, según las funcionalidades disponibles.
👨‍💻 Administrador
El administrador cuenta con permisos adicionales para:
•	Acceder al panel /admin.
•	Crear videojuegos.
•	Modificar videojuegos.
•	Eliminar videojuegos.
•	Consultar el catálogo.
•	Gestionar usuarios registrados, en caso de que el registro se encuentre habilitado.
El acceso al panel administrativo se controla mediante lógica de rutas dentro de React.
________________________________________
📱 Diseño Responsive
GameStore fue desarrollado buscando una correcta visualización en diferentes tamaños de pantalla:
•	🖥️ Computadoras de escritorio.
•	💻 Notebooks.
•	📱 Dispositivos móviles.
•	📲 Tablets.
Para la construcción de la interfaz se utiliza Tailwind CSS, permitiendo crear diseños adaptables mediante clases utilitarias.
________________________________________
🧩 Conceptos aplicados
Durante el desarrollo del proyecto se aplicaron diferentes conceptos fundamentales de React:
•	Componentes funcionales.
•	React Hooks.
•	useState.
•	useEffect.
•	Manejo de formularios.
•	React Router.
•	Rutas dinámicas.
•	Rutas protegidas.
•	Renderizado condicional.
•	Props.
•	Gestión de estado.
•	Persistencia con LocalStorage.
•	CRUD.
•	Diseño responsive.
•	Componentes reutilizables.
•	Validación de formularios.
________________________________________
👥 Equipo de desarrollo
Proyecto desarrollado por:
Integrante
Victoria Micaela Ponce
Samuel Gallardo
Agustin Matas
Agustin Ismael Beltran
________________________________________
📋 Metodología de trabajo
Para la organización y seguimiento del desarrollo se utiliza una metodología basada en Scrum / Agile, utilizando un tablero de trabajo para dividir las tareas del proyecto.
Las tareas pueden organizarse en diferentes estados:
Backlog → Por hacer → En progreso → Revisión → Finalizado
Esto permite distribuir las responsabilidades entre los integrantes y realizar un seguimiento del progreso del proyecto.
________________________________________
🎯 Objetivos del proyecto
Los principales objetivos de GameStore son:
1.	Desarrollar una aplicación web utilizando React.
2.	Crear una experiencia de usuario intuitiva y responsive.
3.	Implementar navegación mediante React Router.
4.	Crear un catálogo dinámico de videojuegos.
5.	Implementar un sistema CRUD para la administración de productos.
6.	Simular un sistema de autenticación y roles.
7.	Utilizar LocalStorage para la persistencia de datos.
8.	Aplicar buenas prácticas de desarrollo frontend.
9.	Trabajar mediante componentes reutilizables.
10.	Publicar la aplicación en una plataforma de hosting.
________________________________________
🌐 Deploy
La aplicación puede ser publicada utilizando plataformas de hosting para aplicaciones frontend como:
•	Vercel
•	Netlify
Para generar la versión de producción:
npm run build
El resultado será generado en la carpeta:
dist/
Esta carpeta contiene los archivos necesarios para desplegar la aplicación.
________________________________________
⚠️ Consideraciones
GameStore es un proyecto académico y utiliza LocalStorage para simular la persistencia de datos y la autenticación.
Por este motivo:
•	Los datos se almacenan localmente en el navegador.
•	No existe una base de datos externa.
•	La autenticación es una simulación para fines educativos.
•	No debe utilizarse como sistema de autenticación real en un entorno de producción.
•	Los datos pueden perderse si el usuario limpia el almacenamiento del navegador.
________________________________________
📚 Proyecto Integrador
Este proyecto fue desarrollado como parte de un Proyecto Integrador de Desarrollo Web, aplicando conocimientos de:
React + JavaScript + Tailwind CSS + React Router + LocalStorage
El objetivo final es demostrar la capacidad de construir una aplicación frontend completa, organizada y funcional, incorporando navegación, persistencia de datos, gestión de usuarios y administración de productos.
________________________________________
🎮 GameStore
Tu próxima partida comienza acá. 🎮
Proyecto Integrador — E-commerce Gamer
