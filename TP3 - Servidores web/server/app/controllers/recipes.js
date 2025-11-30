const model = require("../models/recipes.js"); 

const getFeaturedRecipes = async (req, res) => {
 try {
const { limit } = req.query;

 // Conversión segura a entero
const parsedLimit = parseInt(limit) || 1; 

 // Llama al modelo corregido
 const results = await model.getRecipesByRating(5, parsedLimit);
 
 res.json({
          success: true,
          data: results
      });

 } catch (error) {
 console.error("Error en el controlador getFeaturedRecipes:", error);
 res.status(500).json({ message: "Error en el servidor al procesar las recetas destacadas." });
 }
};

const getRecipeById = async(req, res) =>  {
try {
 const { id } = req.params;

 const result = await model.getRecipeById(id);
    

    if (result) {
        res.json(result); 
    } else {
        res.status(404).json({ message: "Receta no encontrada." });
    }
    
 } catch (error) {
    // ✅ CORRECCIÓN: Manejo de error añadido.
 console.error("Error en el controlador getRecipeById:", error);
    res.status(500).json({ message: "Error en el servidor al buscar la receta." });
 }
};

const getRecipes = async (req, res) =>  {
 try {
// ✅ CORRECCIÓN: Conversión segura a enteros
 const from = parseInt(req.query.from) || 0; 
 const limit = parseInt(req.query.limit) || 10; 

 const results = await model.getPaginatedRecipes(from, limit);

 res.json(results);

 } catch (error) {
 console.error("Error en el controlador getRecipes (paginación):", error);
 res.status(500).json({ message: "Error en el servidor al procesar las recetas." });
 }
};

module.exports = {
 getRecipeById,
getFeaturedRecipes,
 getRecipes
};