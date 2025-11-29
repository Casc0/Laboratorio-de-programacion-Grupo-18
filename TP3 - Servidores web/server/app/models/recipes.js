const recipes = require("./recipes.json");

module.exports = {

    getRecipesByRating: (valoracion, limit) =>{

        const rating = parseInt(valoracion, 10);
        results = results.filter(recipe => recipe.valoracion === rating);
            

        // Limitar la cantidad de resultados si el query param existe
        if (limit) {
        const amount = parseInt(limit, 10);
        results = results.slice(0, amount);
        }

        return results;
            
        }

};
