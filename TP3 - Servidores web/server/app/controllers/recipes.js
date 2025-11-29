const {getRecipesByRating} = require("../models/recipes.js"); 

module.exports = () => {
  getRecipes: async (req, res) => {
    try {
      const { valoracion, limit } = req.query;

      if(valoracion){
          results = await getRecipesByRating(valoracion, limit);
      }
      res.json(results);

    } catch (error) {
      res.status(500).json({ message: "Error en el servidor al procesar las recetas." });
    }
  };
}

