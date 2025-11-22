async function getFeaturedRecipe(){

  const url = '/api/featured-recipe';
    try {
      const recipe = await fetch(url, {
        method: "GET",
        // …
      });
      if (!recipe.ok) {
        throw new Error(`Response status: ${recipe.status}`);
      }
      const recipeData = await recipe.json();
      console.log(recipeData);
    
    } catch (error) {
      console.error(error.message);
    }
}

async function getIndex(){
  const main = document.getElementById("main_index");
  const featuredRecipeHTML = await getFeaturedRecipe();
  main.appendChild(featuredRecipeHTML);
}



document.addEventListener("DOMContentLoaded", function () {
  // 1. Lógica para la página principal (index.html)
  if (document.getElementById("main_index")) {
    getIndex();
  }

  // 2. Lógica para la página de receta individual (recipe.html)
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  // Solo carga una receta si el parámetro 'id' está en la URL
  if (recipeId) {
    loadRecipe(recipeId);
  }
});