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
    <div class="receta-layout-grid">
      
      <div class="columna-lateral izquierda">
        <img src="img/italia2.avif" alt="Decoración de ingredientes" class="decoracion-img"/>
      </div>
      
      <div class="columna-central-receta">
        
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
                  ${recipe.ingredientes.map((ing) => `<li>${ing}</li>`).join("")}
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
        </article>
        
      </div>
      
      <div class="columna-lateral derecha">
        <img src="img/italia2.avif" alt="Decoración de utensilios" class="decoracion-img"/>
      </div>
      
    </div>
  `;

  mainContent.innerHTML = html;
  setRecipeRating(recipe.valoracion);
}

// Cargar recetas similares
function loadSimilarRecipes(allRecipes, currentRecipe) {
  const similarRecipes = allRecipes
    .filter(recipe =>  
      recipe.id !== currentRecipe.id &&
      recipe.identificadores.some((element => currentRecipe.identificadores.includes(element))))
    .slice(0, 7); // Mostrar solo 7 recetas similares

  const container = document.getElementById("recetas-similares");

  //mapear cada receta similar y crear su mini-card correspondiente
  const html = similarRecipes
    .map((recipe) => crearCard(recipe)).join("");
  container.innerHTML = html;
}
/*
// Función para navegar a una receta específica (opcional, ya se usa onclick en las cards)
function navigateToRecipe(recipeId) {
  window.location.href = `recipe.html?id=${recipeId}`;
}
  */

function crearCard(recipe){
  const html = ` <article class="mini-card" onclick="window.location.href='recipe.html?id=${recipe.id}'">
      <h3 class="mini-card-title">${recipe.nombre}</h3>
      <img class="mini-card-img" src="${recipe["imagen-principal"]}" alt="${recipe.alt}"/>
      <div class="mini-card-lista-categoria">${recipe.identificadores.map((tag) => `<p class="mini-card-categoria">${tag}</p>`).join("")}
      </div>
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
async function loadAllMiniCards() {
  try {
    const response = await fetch("./recipes.json");

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const allRecipes = await response.json();

    // Obtener el contenedor principal de la grilla
    const container = document.querySelector(".mini-card-grid");

    if (!container) {
      console.error("El contenedor .mini-card-grid no se encontró en el HTML.");
      return;
    }

    // Generar el HTML de todas las tarjetas
    const html = allRecipes
      .map(
        (recipe) => crearCard(recipe)).join("");

    // Insertar el HTML generado
    container.innerHTML = html;
  } catch (error) {
    console.error(
      "Error al cargar las mini-cards (¡Revisa la ruta del JSON!)",
      error
    );
    const container = document.querySelector(".mini-card-grid");
    if (container) {
      container.innerHTML =
        '<p style="color: red; text-align: center;">Error al cargar las recetas. Verifica la Consola (F12) y la ruta del JSON.</p>';
    }
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

