const fs = require('fs').promises;
const path = require('path');

// Ruta al archivo JSON
//const dataPath = path.join(__dirname, 'recipes.json');

const recipes = require('./recipes.json');
console.log(`${recipes.length} recetas cargadas en el modelo.`);


//console.log('Modelo cargado. Ruta del archivo:', dataPath);

// Leer todas las recetas
const getAllRecipes = async () => {
  try {
    console.log('Leyendo archivo:', dataPath);
    
    //const data = await fs.readFile(dataPath, 'utf8');
    //const recipes = JSON.parse(data);
    
    console.log(` ${recipes.length} recetas cargadas`);
    
    // Ordenar por VALORACION 
    return recipes.sort((a, b) => (b.valoracion || 0) - (a.valoracion || 0));
    
  } catch (error) {
    console.error('Error en getAllRecipes:', error.message);
    throw error;
  }
};

const getRecipeById = async (id) => {
  try {
    //const data = await fs.readFile(dataPath, 'utf8');
    //const recipes = JSON.parse(data);
    return recipes.find(recipe => recipe.id === id);
  } catch (error) {
    console.error("Error en getRecipeById:", error);
    throw error;
  }
};

const getRecipesByRating = async (minRating, limit) => {
  try {
    //const data = await fs.readFile(dataPath, 'utf8');
    //const recipes = JSON.parse(data);
    
    return recipes
      .filter(recipe => recipe.valoracion >= minRating) 
      .sort((a, b) => b.valoracion - a.valoracion) 
      .slice(0, limit);
  } catch (error) {
    console.error("Error en getRecipesByRating:", error);
    throw error;
  }
};

// Obtener recetas paginadas
const getPaginatedRecipes = async (from, limit) => {
  try {
    //const data = await fs.readFile(dataPath, 'utf8');
    //const recipes = JSON.parse(data);
    return recipes.slice(from, from + limit);
  } catch (error) {
    console.error("Error en getPaginatedRecipes:", error);
    throw error;
  }
};

const getSimilarRecipes = async (id, limit) => {
  try {
    const targetRecipe = await getRecipeById(id);
    if (!targetRecipe) {  
      throw new Error('Receta no encontrada');
    }

    const similarRecipes = recipes.filter( recipe => {
      !(recipe.id === id) && recipe.identificadores.some( element => 
        targetRecipe.identificadores.includes(element)
      );
    });

    if(similarRecipes.length === 0) {
      return recipes.slice(0, limit);
    }else{
      return similarRecipes.slice(0, limit);
    }

  } catch (error) {
    console.error("Error en getSimilarRecipes:", error);
    throw error;
  }
};

// Exportar todas las funciones
module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipesByRating,
  getPaginatedRecipes,
  getSimilarRecipes
};