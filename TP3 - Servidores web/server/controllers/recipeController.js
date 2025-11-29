import { recipesData } from "../server"; 

const recipeModel = new recipeModel(recipesData);

export function getRecipes(req, res) {
  try {
    let results = [...recipesData];
    const { valoracion, limit } = req.query;

    if(valoracion){
        results = recipeModel.getRecipesByRating(valoracion, limit);
    }
    

    res.json(results);

  } catch (error) {
    res.status(500).json({ message: "Error en el servidor al procesar las recetas." });
  }
};