// TP3 - Servidores web/server.js

const express = require("express"); // Importa la librería express
const path = require("path"); // Importa el módulo path de Node.js
const app = express(); // La variable app es el servidor, una instancia de aplicación Express
const PORT = 4000; // Define el puerto en el que se ejecutará la app

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

app.get("/cocinaItaliana/recipes/:id", (req, res) => {
})

app.get("cocinaItaliana/recipes/:valoracion", (req, res) => {
  try {
    //VER COMO GENERALIZARLO Y SACAR AFUERA LA CARGA DEL JSON
    const recipesData = require("../public/js/recipes.json");
    console.log("Recipes loaded");

    // HASTA ACA

    console.log("Fetching featured recipe"); // Usa la variable 'recipesData' que ya está en memoria
    const featuredRecipe = recipesData.find(
      (recipe) => recipe.valoracion === 5
    );

    //Si no encontro alguna, tira error 404
    if (featuredRecipe) {
      console.log("Featured recipe found:", featuredRecipe);
      res.json(featuredRecipe);
    } else {
      console.log("No featured recipe found");
      res.status(404).json({ message: "No se encontró una receta destacada." });
    }
  } catch (error) {
    console.error("Error fetching featured recipe:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al buscar la receta." });
  }
});

app.get("/cocinaItaliana/recipes/:amount", (req, res) => {
  try {
    const recipesData = require("../public/js/recipes.json");
    const someRecipes = recipesData.slice(0, 6); // Devuelve las primeras 6 recetas
    res.json(someRecipes);
  } catch (error) {
    console.error("Error fetching some recipes:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al buscar la receta." });
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
