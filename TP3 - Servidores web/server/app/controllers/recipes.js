const { get } = require("../index.js");
const model = require("../models/recipes.js"); 

const getFeaturedRecipes =  (req, res) =>  {
  try {
      const { limit } = req.query;

      results =  model.getRecipesByRating(5, limit);
      
      res.json(results);

    } catch (error) {
      console.error("Error en el controlador getFeaturedRecipes:", error);
      res.status(500).json({ message: "Error en el servidor al procesar las recetas." });
    }
};

const getRecipeById = (req, res) =>  {
  try {
    const { id } = req.params;

    const results = model.getRecipeById(id);
  } catch (error) {
    
  }
};

const getRecipes = (req, res) =>  {
  try {
      const { from, limit } = req.query;

      if (from !== undefined && limit !== undefined) {
        results = model.getPaginatedRecipes((from), (limit));
      }else {
        results = model.getPaginatedRecipes(0, 10); // Valores por defecto
      }

      res.json(results);

    } catch (error) {
      console.error("Error en el controlador getPaginatedRecipes:", error);
      res.status(500).json({ message: "Error en el servidor al procesar las recetas." });
    }
};

module.exports = {
    getRecipeById,
    getFeaturedRecipes,
    getRecipes
};