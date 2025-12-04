
const express = require("express");
const controller = require('../controllers/recipes.js');
const router = express.Router();

router.get("/", controller.getRecipes);
router.get("/featured", controller.getFeaturedRecipes);
router.get("/:id", controller.getRecipeById);
router.get("/:id/similar", controller.getSimilarRecipes);
//router.get("/search/suggestions", controller.searchRecipes);
module.exports = router;


/*
//Modificar/Quitar
router.get("/explore-items", (req, res) => {
  try {
    // Devuelve directamente todas las recetas del JSON para el metodo de las getExploreItems
    res.json({
      success: true,
      data: recipesData,
      count: recipesData.length,
      message: "Items obtenidos exitosamente"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en el servidor al procesar los items de exploración."
    });
  }
});
*/

