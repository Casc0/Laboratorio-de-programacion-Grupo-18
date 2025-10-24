// Función principal para cargar una receta
async function loadRecipe(recipeId) {
try{
showLoading(true);

// Cargar datos de recetas
const response = await fetch('../js/recipes.json');
const recipes = await response.json();

// Buscar la receta específica
const recipe = recipes.find(r => r.id === recipeId);

if (!recipe) {
showError('Receta no encontrada');
return;
}

// Renderizar la receta
renderRecipe(recipe);

// Cargar recetas similares
loadSimilarRecipes(recipes, recipeId);

// Actualizar título de la página
document.getElementById('page-title').textContent = recipe.nombre;

} catch (error) {
console.error('Error al cargar la receta:', error);
showError('Error al cargar la receta');
} finally {
showLoading(false);
}
}

// Renderizar el HTML de la receta
function renderRecipe(recipe) {
const mainContent = document.getElementById('main');

const html = `
<article class="header-receta">
    <section class="categoria-receta">
        <span class="categoria-tag">${recipe.identificadores.join(', ')}</span>
    </section>
    <section class="titulo-receta">
        <h1>${recipe.nombre}</h1>
    </section>
</article>

<article class="main-receta">
    <section class="foto-receta">
        <img
                src="${recipe['imagen-principal']}"
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
                    ${recipe.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </section>

            <section class="seccion-receta-2">
                <h2>Preparación</h2>
                <ul>
                    ${recipe.resumen.map(paso => `<li>${paso}</li>`).join('')}
                </ul>
            </section>
        </div>

        <section class="seccion-receta-2">
            <h2>Descripción Detallada de la Preparación</h2>
            <p>${recipe.detallado}</p>
        </section>
    </article>
</article>
`;

mainContent.innerHTML = html;
}

// Cargar recetas similares
function loadSimilarRecipes(allRecipes, currentRecipeId) {
const similarRecipes = allRecipes
.filter(recipe => recipe.id !== currentRecipeId)
.slice(0, 4); // Mostrar solo 4 recetas similares

const container = document.getElementById('recetas-similares');

const html = similarRecipes.map(recipe => `
<article class="mini-card" onclick="window.location.href='recipe.html?id=${recipe.id}'">
    <h3 class="mini-card-title">${recipe.nombre}</h3>
    <img class="mini-card-img" src="${recipe['imagen-principal']}" alt="${recipe.alt}"/>
    <div class="mini-card-lista-categoria">
        ${recipe.identificadores.map(tag =>
        `<p class="mini-card-categoria">${tag}</p>`
        ).join('')}
    </div>
</article>
`).join('');

container.innerHTML = html;
}

// Función para navegar a una receta específica
function navigateToRecipe(recipeId) {
window.location.href = `recipe.html?id=${recipeId}`;
}

// Mostrar/ocultar loading
function showLoading(show) {
const loading = document.getElementById('loading');
if (loading) {
loading.style.display = show ? 'block' : 'none';
}
}

// Mostrar error
function showError(message) {
const mainContent = document.getElementById('main');
mainContent.innerHTML = `
<div class="error-message">
    <h2>Error</h2>
    <p>${message}</p>
    <button onclick="window.location.href='index.html'">Volver al inicio</button>
</div>
`;
}