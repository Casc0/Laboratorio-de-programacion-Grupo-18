import { getAllMiniCards, getExploreItems } from "./logic.js";
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
  const exploreHTML = await getExploreRecipes(0, 10); 
  
  //Insertar el contenido dinámico DENTRO de la columna central
  const contentHtml = featuredRecipeHTML + exploreHTML;
  
  if (contentHtml.trim()) {
    mainContentArea.innerHTML = contentHtml;
  } else {
    // Manejo de caso donde no hay recetas destacadas ni ítems de exploración
    mainContentArea.innerHTML = '<p>No se pudieron cargar las recetas destacadas ni los ítems de exploración.</p>';
  }
}

function featuredCard(recipe) {
  console.log("Creating featured card for recipe:", recipe.nombre);

  const html = `<article class="Destacado-Flip-Card" >
            <section class="Destacado-Flip-Card-Inner">
                <section class="Destacado-Flip-Card-Front">
                    <img class="ImagenDestacada" src="${recipe["imagen-principal"]}" alt="${recipe.alt}" />
                    <div class="Destacado-Overlay">
                        <span class="Destacado-Tag">Destacado-</span>
                        <h2 class="Destacado-Titulo">${recipe.nombre}</h2>
                    </div>
                </section>
                <section class="Destacado-Flip-Card-Back">
                    <div class="Destacado-Overlay">
                        <h2 class="Destacado-Titulo">${recipe.nombre}</h2>
                        <!-- Descripción breve/subtítulo -->
                        <p class="Destacado-Subtitulo">${recipe.descripcion}</p>
                    </div>
                </section>
            </section>
        </article>`;

  return html;
}

function createExploreRecipes(item) {
  if (!item) return "";

  // Valores default por si falta algo 
  const id = item.id || "unknown";
  const nombre = item.nombre || "Sin nombre";
  const imagen = item["imagen-principal"] || "img/default.jpg";
  const descripcion = item.descripcion || "Descripción no disponible";
  const valoracion = item.valoracion || 0;

  const ingredientes = Array.isArray(item.ingredientes)
    ? item.ingredientes.slice(0, 4).join(", ") // solo 4 para no explotar la card
    : "Ingredientes no disponibles";

  const stars = "★".repeat(valoracion) + "☆".repeat(5 - valoracion);

  return `
    <article class="recipe-minimal" data-id="${id}">

      <figure>
        <img src="${imagen}" alt="${nombre}" loading="lazy">
      </figure>

      <header>
        <h2>${nombre}</h2>
      </header>

      <section>
        <p>${descripcion.substring(0, 120)}...</p>
      </section>

      <section class="facts">
        <span>${ingredientes}</span>
      </section>

      <footer>
        <span class="rating">${stars}</span>
        <button onclick="window.location.href='recipe.html?id=${id}'">Ver receta</button>
      </footer>

    </article>
  `;
}

export async function getExploreRecipes(x, y) {
    try {
        const response = await fetch(`/api/recipes?from=${x}&limit=${y}`);
        if (!response.ok) throw new Error("Error al cargar explore items");

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
            throw new Error("Formato de datos inválido");
        }

        const validItems = result.data.filter(item => item !== undefined && item !== null);
        
        const cardsHTML = validItems.map(createExploreRecipes).join("");
        
        // Retorna el HTML ya en el contenedor del grid de recetas del index
        return `<div class="grid-recipes">${cardsHTML}</div>`;

    } catch (e) {
        console.error("Error en getExploreRecipes:", e);
        return "<p>Error al cargar los elementos.</p>";
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
