// =======================================================
// FUNCIONES DE CARGA Y RENDERIZADO DE RECETAS INDIVIDUALES
// =======================================================

// Función principal para cargar una receta individual
async function loadRecipe(recipeId) {
  try {
    showLoading(true);

    //CAMBIAR A FETCH DEL ENDPOINT recipes/${recipeId}
    const response = await fetch("./recipes.json");

    if (!response.ok) {
      throw new Error(
        `Error HTTP: ${response.status} - Verifica la ruta del JSON`
      );
    }

    const recipes = await response.json();
    const recipe = recipes.find((r) => r.id === recipeId);

    if (!recipe) {
      showError("Receta no encontrada");
      return;
    }

    //Titulo de la pestaña
    document.getElementById("page-title").textContent = recipe.nombre;

    //Carga la info de la receta
    renderRecipe(recipe);

    //Carga una lista de recetas similares
    loadSimilarRecipes(recipes, recipe);
  } catch (error) {
    console.error("Error al cargar la receta:", error);
    showError("Error al cargar la receta");
  } finally {
    showLoading(false);
  }
}

function renderRecipe(recipe) {
  const mainContent = document.getElementById("main");

  const html = `        
    <article class="header-receta">
      <section class="titulo-receta">
        <h1>${recipe.nombre}</h1>
      </section>
    </article>
    
    <article class="main-receta">
      <section class="foto-receta">
        <img
          src="${recipe["imagen-principal"]}"
          alt="${recipe.alt}"
          class="imagen-principal"
        />
      </section>
      <section class="descripcion-receta">
        <p><strong>${recipe.descripcion}</strong></p>
      </section>
      <section class="grid-items">
        <article class="grid-item">
          <h4>⏱️ Tiempo de Preparación</h4>
          <p>${recipe.categorias.tiempo}</p>
        </article>
        <article class="grid-item">
          <h4>🎯 Dificultad</h4>
          <p>${recipe.categorias.dificultad}</p>
        </article>
        <article class="grid-item">
          <h4>👥 Porciones</h4>
          <p>${recipe.categorias.porciones}</p>
        </article>
      </section>
      
      <article class="cuerpo-receta">
        <div class="resumen-receta">
          <section class="seccion-receta-2">
            <h2>Ingredientes</h2>
            <ul>
              ${recipe.ingredientes
                .map((ing) => `<li>${ing}</li>`)
                .join("")}
            </ul>
          </section>
          <section class="seccion-receta-2">
            <h2>Preparación</h2>
            <ul>
              ${recipe.resumen.map((paso) => `<li>${paso}</li>`).join("")}
            </ul>
          </section>
        </div>
    
        <section class="seccion-receta-2">
          <h2>Descripción Detallada de la Preparación</h2>
          <p>${recipe.detallado}</p>
        </section>
      </article>
    </article>`;

  mainContent.innerHTML = html;
  setRecipeRating(recipe.valoracion);
}

// Cargar recetas similares
function loadSimilarRecipes(allRecipes, currentRecipe) {
  const similarRecipes = allRecipes
    .filter(
      (recipe) =>
        recipe.id !== currentRecipe.id &&
        recipe.identificadores.some((element) =>
          currentRecipe.identificadores.includes(element)
        )
    )
    .slice(0, 7); // Mostrar solo 7 recetas similares

  const container = document.getElementById("recetas-similares");

  //mapear cada receta similar y crear su mini-card correspondiente
  const html = similarRecipes.map((recipe) => crearCard(recipe)).join("");
  container.innerHTML = html;
}
/*
// Función para navegar a una receta específica (opcional, ya se usa onclick en las cards)
function navigateToRecipe(recipeId) {
  window.location.href = `recipe.html?id=${recipeId}`;
}
  */

export function crearCard(recipe) {
  console.log("Creating card for recipe:", recipe.nombre);
  const html = ` <article class="mini-card" onclick="window.location.href='recipe.html?id=${
    recipe.id
  }'">
      <h3 class="mini-card-title">${recipe.nombre}</h3>
      <img class="mini-card-img" src="${recipe["imagen-principal"]}" alt="${
    recipe.alt
  }"/>
      <div class="mini-card-lista-categoria">${recipe.identificadores
        .map((tag) => `<p class="mini-card-categoria">${tag}</p>`)
        .join("")}
      </div>
    </article>`;

  return html;
}

export function featuredCard(recipe) {
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

// Mostrar/ocultar loading
function showLoading(show) {
  const loading = document.getElementById("loading");
  if (loading) {
    loading.style.display = show ? "block" : "none";
  }
}

// Mostrar error
function showError(message) {
  const mainContent = document.getElementById("main");
  mainContent.innerHTML = `
<div class="error-message">
 <h2>Error</h2>
 <p>${message}</p>
<button onclick="window.location.href='index.html'">Volver al inicio</button>
</div>
`;
}

/**
 * Establece el estado de las estrellas de valoración de la receta.
 * (Esta función no hace el fetch, solo manipula el DOM).
 */
function setRecipeRating(rating) {
  const inputId = `r${rating}`;
  const ratingInput = document.getElementById(inputId);

  if (ratingInput) {
    ratingInput.checked = true;
  }
}

// =======================================================
// FUNCIÓN PARA CARGAR TODAS LAS MINI-CARDS EN INDEX.HTML
// =======================================================

/**
 * Carga todas las recetas y genera las mini-cards para la página principal.
 */

function makeMiniCards(recipes) {
  // Generar el HTML de todas las tarjetas
  const cards = recipes.map((recipe) => crearCard(recipe)).join("");
  const html = `<div class="mini-card-grid">${cards}</div>`;
  return html;
}

// Función principal para conseguir todas las mini-cards
export async function getAllMiniCards() {
  try {
    const url = "/api/recipes?limit=3";
    const recipe = await fetch(url, {
      method: "GET",
      // …
    });

    if (!recipe.ok) {
      throw new Error(`Response status: ${recipe.status}`);
    }

    const allRecipes = await recipe.json();

    //Verificar que sea arreglo 
    const recipesArray = Array.isArray(allRecipes) ? allRecipes : [allRecipes];

    const html = makeMiniCards(recipesArray);
    return html;
    /*
    
    // Insertar el HTML generado
    container.innerHTML = html;
    */
  } catch (error) {
    console.error(
      "Error al cargar las mini-cards (¡Revisa la ruta del JSON!)",
      error
    );
    /*
    const container = document.querySelector(".mini-card-grid");
    if (container) {
      container.innerHTML =
        '<p style="color: red; text-align: center;">Error al cargar las recetas. Verifica la Consola (F12) y la ruta del JSON.</p>';
    }
        */
  }
}
// =======================================================
// LÓGICA DE INICIO (EJECUCIÓN AL CARGAR EL DOCUMENTO)
// =======================================================

/**
 * Este bloque detecta qué página se está cargando (index.html o recipe.html)
 * y llama a la función correspondiente.
 */
/*
document.addEventListener("DOMContentLoaded", function () {
  // 1. Lógica para la página principal (index.html o recetas.html)
  // Se ejecuta si existe la grilla principal y no la sección de recetas similares.
  if (
    document.querySelector(".mini-card-grid") &&
    !document.getElementById("recetas-similares")
  ) {
    loadAllMiniCards();
  }

  // 2. Lógica para la página de receta individual (recipe.html)
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  // Solo carga una receta si el parámetro 'id' está en la URL
  if (recipeId) {
    loadRecipe(recipeId);
  }
});
*/

// =======================================================
// FUNCIÓN PARA CARGAR TODAS LAS CARDS DEL INICIO EN INDEX.HTML
// =======================================================

function createExploreItem(item) {
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

export async function getExploreItems() {
    try {
        const response = await fetch("/api/explore-items");
        if (!response.ok) throw new Error("Error al cargar explore items");

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
            throw new Error("Formato de datos inválido");
        }

        const validItems = result.data.filter(item => item !== undefined && item !== null);
        
        const cardsHTML = validItems.map(createExploreItem).join("");
        
        // Retorna el HTML ya en el contenedor del grid de recetas del index
        return `<div class="grid-recipes">${cardsHTML}</div>`;

    } catch (e) {
        console.error("Error en getExploreItems:", e);
        return "<p>Error al cargar los elementos.</p>";
    }
}