import { featuredCard, getAllMiniCards} from "./logic.js";
import { renderHeader } from "./header.js";

async function getFeaturedRecipe(){

  const url = 'api/recipes?valoracion=5';
    try {
      const recipe = await fetch(url, {
        method: "GET",
        // …
      });
      if (!recipe.ok) {
        throw new Error(`Response status: ${recipe.status}`);
      }else{
        const recipeData = await recipe.json();
        console.log(recipeData.nombre + " loaded from server");
        return featuredCard(recipeData);
        
      }
    } catch (error) {
      console.error(error.message);
    }
}

async function getBody(){
}

async function getIndex(){
  const main = document.getElementById("main_index");
  const featuredRecipeHTML = await getFeaturedRecipe();
  const miniCardsHTML = await getAllMiniCards();
  //const body = await getBody();
  const mainHtml = featuredRecipeHTML+ miniCardsHTML;
  main.innerHTML = mainHtml;
}


document.addEventListener("DOMContentLoaded", function () {

  renderHeader();
  // 1. Lógica para la página principal (index.html)
  if (document.getElementById("main_index")) {
    getIndex();
  }

  // 2. Lógica para la página de receta individual (recipe.html)
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  // Solo carga una receta si el parámetro 'id' está en la URL
  if (recipeId) {
    //loadRecipe(recipeId);
  }
});