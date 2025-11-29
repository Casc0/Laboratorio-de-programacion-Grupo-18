const model = require("../models/recipes.js"); 

const getFeaturedRecipes = async (req, res) =>  {
  try {
      const { limit } = req.query;

      results = await model.getRecipesByRating(5, limit);
      
      res.json(results);

    } catch (error) {
      console.error("Error en el controlador getFeaturedRecipes:", error);
      res.status(500).json({ message: "Error en el servidor al procesar las recetas." });
    }
};

const getRecipeById = async(req, res) =>  {
  try {
    const { id } = req.params;

    const results = await model.getRecipeById(id);
  } catch (error) {
    
  }
};

const getRecipes = async (req, res) =>  {
  try {
      const { from, limit } = req.query;

      if (from !== undefined && limit !== undefined) {
        results = await model.getPaginatedRecipes((from), (limit));
      }else {
        results = await model.getPaginatedRecipes(0, 10); // Valores por defecto
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