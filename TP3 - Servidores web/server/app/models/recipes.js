const recipes = require("./recipes.json");

const getRecipesByRating = (valoracion, limit) =>{

        const rating = parseInt(valoracion, 10);
        let results = recipes.filter(recipe => recipe.valoracion === rating);
        
        const amount = parseInt(limit, 10);
        results = results.slice(0, amount);
        return results;
}

const getPaginatedRecipes = (from, limit) =>{
       // Aseguramos que 'from' y 'limit' sean números
        const start = parseInt(from, 10);
        const count = parseInt(limit, 10);
        const results = recipes.slice(start, count + start);
         return results;
}

const getRecipeById = (id) => {
    return recipes.find(recipe => recipe.id === id);
}

module.exports = {

    getRecipesByRating,
    getPaginatedRecipes,
    getRecipeById

};
