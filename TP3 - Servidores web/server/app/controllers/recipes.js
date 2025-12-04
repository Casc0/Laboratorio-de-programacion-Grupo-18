const model = require("../models/recipes.js");

const getFeaturedRecipes = async (req, res) => {
  try {
    const { limit } = req.query;

    const parsedLimit = parseInt(limit) || 1;

    const results = await model.getRecipesByRating(5, parsedLimit);

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Error en el controlador getFeaturedRecipes:", error);
    res.status(500).json({
      message: "Error en el servidor al procesar las recetas destacadas.",
    });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await model.getRecipeById(id);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Receta no encontrada." });
    }
  } catch (error) {
    console.error("Error en el controlador getRecipeById:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al buscar la receta." });
  }
};

const getRecipes = async (req, res) => {
  try {
    const from = parseInt(req.query.from) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const results = await model.getPaginatedRecipes(from, limit);

    res.json(results);
  } catch (error) {
    console.error("Error en el controlador getRecipes (paginación):", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al procesar las recetas." });
  }
};

const getSimilarRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await model.getSimilarRecipes(id, 5);
    
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Receta no encontrada." });
    }
  } catch (error) {
    console.error("Error en el controlador getRecipeById:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al buscar la receta." });
  }
};
/*
const searchRecipes = async (req, res) => {
  console.log("Búsqueda iniciada ");

  try {
    const { q } = req.query;
    console.log("Término de búsqueda (q):", q);

    if (!q || q.trim() === "") {
      return res.json({
        success: true,
        suggestions: [],
      });
    }

    const searchTerm = q.toLowerCase().trim();
    console.log("Buscando término:", searchTerm);

    console.log("Llamando a model.getAllRecipes()...");
    const allRecipes = await model.getAllRecipes();
    console.log("Recetas obtenidas:", allRecipes.length);

    // Filtrar usando las propiedades
    const results = allRecipes.filter((recipe) => {
      if (!recipe) return false;

      const nombre = (recipe.nombre || "").toLowerCase();

      const descripcion = (recipe.descripcion || "").toLowerCase();

      let categoriasStr = "";
      if (recipe.categorias && typeof recipe.categorias === "object") {
        categoriasStr = Object.values(recipe.categorias)
          .join(" ")
          .toLowerCase();
      }

      let identificadoresStr = "";
      if (Array.isArray(recipe.identificadores)) {
        identificadoresStr = recipe.identificadores.join(" ").toLowerCase();
      }

      // Buscar en TODAS las propiedades
      return (
        nombre.includes(searchTerm) ||
        descripcion.includes(searchTerm) ||
        categoriasStr.includes(searchTerm) ||
        identificadoresStr.includes(searchTerm)
      );
    });

    // Preparar sugerencias
    const suggestions = results.slice(0, 6).map((recipe) => ({
      id: recipe.id,
      title: recipe.nombre,
      category: recipe.categorias?.tiempo || "General", // Usar una propiedad del objeto categorias
      image: recipe["imagen-principal"] || "/img/default.jpg",
      rating: recipe.valoracion || 0,
    }));

    res.json({
      success: true,
      suggestions,
      total: results.length,
    });
  } catch (error) {
    console.error(" ERROR en searchRecipes ");
    console.error("Mensaje:", error.message);
    console.error("Stack:", error.stack);
  }
};
*/
module.exports = {
  getRecipeById,
  getFeaturedRecipes,
  getRecipes,
  //searchRecipes,
  getSimilarRecipes,
};
