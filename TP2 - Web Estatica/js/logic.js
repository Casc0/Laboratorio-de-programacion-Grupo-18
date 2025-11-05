// Función principal para cargar una receta
async function loadRecipe(recipeId) {
try{
showLoading(true);

// Cargar datos de recetas
const response = await fetch('./recipes.json'); // '../js/recipes.json'
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
setRecipeRating(recipe.valoracion);
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

/**
 * Establece el estado de las estrellas de valoración de la receta según el valor proporcionado.
 * Esto se hace marcando el input de radio (r1 a r5) que corresponde al 'rating' del JSON.
 * * @param {number} rating El valor de la valoración (ej: 3, 4, 5).
 */
function setRecipeRating(rating) {
    // Construye el ID del input de radio basado en la valoración (ej: rating=3 -> 'r3')
    const inputId = `r${rating}`;
    
    // Busca el elemento en el DOM
    const ratingInput = document.getElementById(inputId);
    
    if (ratingInput) {
        // Si se encuentra, lo marca como 'checked' para mostrar las estrellas
        ratingInput.checked = true;
    }

    /**
 * Carga todas las recetas y genera las mini-cards para la página principal.
 */
async function loadAllMiniCards() {
    try {
        // ATENCIÓN: VERIFICA QUE ESTA RUTA ('../js/recipes.json') SEA CORRECTA
        const response = await fetch('../js/recipes.json'); 
        
        // Verifica si la respuesta es exitosa (código 200)
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const allRecipes = await response.json();
        
        // Obtener el contenedor
        const container = document.querySelector('.mini-card-grid');
        
        if (!container) {
            console.error('El contenedor .mini-card-grid no se encontró en el HTML.');
            return;
        }

        // Generar el HTML de todas las tarjetas
        const html = allRecipes.map(recipe => `
            <article 
                class="mini-card" 
                onclick="window.location.href = 'recipe.html?id=${recipe.id}'"
            >
                <h3 class="mini-card-title">${recipe.nombre}</h3>
                <img class="mini-card-img" src="${recipe['imagen-principal']}" alt="${recipe.alt}" />
                <div class="mini-card-lista-categoria">
                    ${recipe.identificadores.map(tag =>
                        `<p class="mini-card-categoria">${tag}</p>`
                    ).join('')}
                </div>
            </article>
        `).join(''); // Usamos .join('') para que el resultado sea un solo string HTML

        // Insertar el HTML generado
        container.innerHTML = html;

    } catch (error) {
        console.error('Error al cargar las mini-cards (revisa la ruta del JSON):', error);
        // Opcional: muestra un mensaje de error si no se cargan
        const container = document.querySelector('.mini-card-grid');
        if (container) {
            container.innerHTML = '<p style="color: red; text-align: center;">Error al cargar las recetas. Verifica la Consola (F12) y la ruta del JSON.</p>';
        }
    }
}
}