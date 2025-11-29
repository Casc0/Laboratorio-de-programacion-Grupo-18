import { featuredCard, getAllMiniCards, getExploreItems } from "./logic.js";
import { renderHeader } from "./header.js";

async function getFeaturedRecipe() {
  const url = "/api/recipes/featured?limit=1"; // Endpoint para obtener recetas con valoración 5, limitando a 1 resultado
  try {
    const recipe = await fetch(url, {
      method: "GET",
      // …
    });
    if (!recipe.ok) {
      throw new Error(`Response status: ${recipe.status}`);
    } else {
      const recipeData = await recipe.json();

      if (Array.isArray(recipeData)) {
        if (recipeData.length > 0) {
          console.log(recipeData[0].nombre + " loaded from server");
          return featuredCard(recipeData[0]);
        } else {
          throw new Error("No se encontraron recetas con valoración 5");
        }
      } else {
        // Si es un unico objeto directamente, lo tratamos asi: 
        console.log(recipeData.nombre + " loaded from server");
        return featuredCard(recipeData);
      }
    }
  } catch (error) {
    console.error(error.message);
    return "Error cargando recetas"; 
  }
}

async function getBody() {
  //  establece la estructura de 3 columnas
  return `
    <div class="receta-layout-grid">
      
      <div class="columna-lateral izquierda">
        <img src="img/italia2.avif" alt="Decoración de ingredientes" class="decoracion-img"/>
      </div>
      
      <div class="columna-central-receta" id="main_content_area">
        </div>
      
      <div class="columna-lateral derecha">
        <img src="img/italia2.avif" alt="Decoración de utensilios" class="decoracion-img"/>
      </div>
      
    </div>
  `;
}

async function getIndex() {
  const mainWrapper = document.getElementById("main_index");
  
  if (!mainWrapper) {
      console.error("El contenedor principal 'main_index' no se encontró en el DOM.");
      return;
  }
  
  //Cargamos el layout de 3 columnas en el main_index
  mainWrapper.innerHTML = await getBody();
  
  //Obtener la referencia al div de la COLUMNA CENTRAL
  const mainContentArea = document.getElementById("main_content_area");

  if (!mainContentArea) {
      console.error("El contenedor de la columna central 'main_content_area' no se encontró en el DOM.");
      return;
  }
  
  //Cargar el contenido dinámico
  const featuredRecipeHTML = await getFeaturedRecipe();
  const exploreHTML = await getExploreItems(); 
  
  //Insertar el contenido dinámico DENTRO de la columna central
  const contentHtml = featuredRecipeHTML + exploreHTML;
  
  if (contentHtml.trim()) {
    mainContentArea.innerHTML = contentHtml;
  } else {
    // Manejo de caso donde no hay recetas destacadas ni ítems de exploración
    mainContentArea.innerHTML = '<p>No se pudieron cargar las recetas destacadas ni los ítems de exploración.</p>';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderHeader();
  //Lógica para la página principal (index.html)
  if (document.getElementById("main_index")) {
    getIndex();
  }

  //Lógica para la página de receta individual (recipe.html)
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  // Solo carga una receta si el parámetro 'id' está en la URL
  if (recipeId) {
    //loadRecipe(recipeId);
  }
});
