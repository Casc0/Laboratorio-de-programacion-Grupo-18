const recipes = require("./recipes.json");

const getRecipesByRating = (valoracion, limit) =>{

        const rating = parseInt(valoracion, 10);
        results = results.filter(recipe => recipe.valoracion === rating);
        const amount = parseInt(limit, 10);
        results = results.slice(0, amount);
        return results;
}

const getPaginatedRecipes = (from, limit) =>{
        results = recipes.slice(from, limit + from);
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
