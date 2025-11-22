// TP3 - Servidores web/server.js

const express = require("express"); // Importa la librería express
const path = require("path"); // Importa el módulo path de Node.js
const app = express(); // La variable app es el servidor, una instancia de aplicación Express
const PORT = 4000; // Define el puerto en el que se ejecutará la app


const recipesData = require("../public/js/recipes.json");
// =======================================================
//  CONFIGURACIÓN DE RUTAS ESTÁTICAS
// =======================================================

app.use(express.json());
app.use(express.static("../public/"));

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
  res.redirect("./index.html");
});

// Endpoint para obtener recetas.
// Soporta filtrado por valoración y limitación de cantidad.
// Ejemplos:
//   /api/recipes?valoracion=5  -> Devuelve recetas con 5 estrellas
//   /api/recipes?limit=6       -> Devuelve las primeras 6 recetas
//   /api/recipes               -> Devuelve todas las recetas
app.get("/api/recipes", (req, res) => {
  try {
    let results = [...recipesData];
    const { valoracion, limit } = req.query;

    // Filtrar por valoración si el query param existe
    if (valoracion) {
      const rating = parseInt(valoracion, 10);
      results = results.find(recipe => recipe.valoracion === rating);
    }

    // Limitar la cantidad de resultados si el query param existe
    if (limit) {
      const amount = parseInt(limit, 10);
      results = results.slice(0, amount);
    }

    res.json(results);

  } catch (error) {
    res.status(500).json({ message: "Error en el servidor al procesar las recetas." });
  }
});


// =======================================================
// INICIO DEL SERVIDOR
// =======================================================

app.listen(PORT, () => {
  // Mensajes de confirmación
  console.log(`Servidor Express listo para el HTML.`);
  console.log(`\nURL Principal: http://localhost:${PORT}/cocinaItaliana`);
  console.log(`Presionar Ctrl + C para detener el servidor.`);
});
