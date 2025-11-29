
/*
// Función para navegar a una receta específica (opcional, ya se usa onclick en las cards)
function navigateToRecipe(recipeId) {
  window.location.href = `recipe.html?id=${recipeId}`;
}
  */




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



// =======================================================
// FUNCIÓN PARA CARGAR TODAS LAS MINI-CARDS EN INDEX.HTML
// =======================================================

/**
 * Carga todas las recetas y genera las mini-cards para la página principal.
 */

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

