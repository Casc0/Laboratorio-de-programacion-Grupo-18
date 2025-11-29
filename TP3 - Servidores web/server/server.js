// TP3 - Servidores web/server.js

const express = require("express"); // Importa la librería express
const path = require("path"); // Importa el módulo path de Node.js
const app = express(); // La variable app es el servidor, una instancia de aplicación Express
const PORT = 4000; // Define el puerto en el que se ejecutará la app

//Se carga una vez el archivo JSON con las recetas
export const recipesData = require("../public/js/recipes.json");
const userController=require('../controllers/');

// =======================================================
//  CONFIGURACIÓN DE RUTAS ESTÁTICAS
// =======================================================

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public"))); // Para mas seguridad, se usa path join 


// =======================================================
// ENDPOINTS (LA LÓGICA DE LAS URLS)
// =======================================================

// RUTA RAÍZ: /
app.get("/", (req, res) => {
  // Lo redirigimos a la nueva URL
  res.redirect("/cocinaItaliana");
});

// RUTA : /cocinaitaliana
// Alguien visita http://localhost:4000/cocinaitaliana
app.get("/cocinaItaliana", (req, res) => {
  // Redirige al archivo principal de la página
  res.send("./index.html");
});

app.use("/api/recetas", require("../routers/routerRecetas"));


// =======================================================
// INICIO DEL SERVIDOR
// =======================================================

app.listen(PORT, () => {
  // Mensajes de confirmación
  console.log(`Servidor Express listo para el HTML.`);
  console.log(`\nURL Principal: http://localhost:${PORT}/cocinaItaliana`);
  console.log(`Presionar Ctrl + C para detener el servidor.`);
});
