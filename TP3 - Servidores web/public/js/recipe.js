<<<<<<< HEAD
 import { crearCard } from "./cards.js";
 import { renderHeader } from "./header.js";
 
 function renderRecipe(recipe) {
  const mainContent = document.getElementById("main");

  const html = `
      <div class="receta-layout-grid">
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
        </article>

        <article class="valoracion-receta" aria-label="Valoración de la receta">
          <h3 class="valoracion-titulo">Valoración de la receta</h3>

          <form class="rating" role="radiogroup" aria-label="Valoración con estrellas">
              <input type="radio" id="r5" name="rating" value="5"/>
              <label for="r5" title="5 estrellas" aria-label="5 estrellas">★</label>

              <input type="radio" id="r4" name="rating" value="4"/>
              <label for="r4" title="4 estrellas" aria-label="4 estrellas">★</label>

              <input type="radio" id="r3" name="rating" value="3"/>
              <label for="r3" title="3 estrellas" aria-label="3 estrellas">★</label>

              <input type="radio" id="r2" name="rating" value="2"/>
              <label for="r2" title="2 estrellas" aria-label="2 estrellas">★</label>

              <input type="radio" id="r1" name="rating" value="1"/>
              <label for="r1" title="1 estrella" aria-label="1 estrella">★</label>
          </form>

        </article>

        <article>
          <h2 class="titulo-similares">Recetas Similares</h2>
          <div class="mini-card-grid" id="recetas-similares">
          </div>
        </article>
        
      </div>
      </div>
  `;

  mainContent.innerHTML = html;
  //setRecipeRating(recipe.valoracion);
}

// Función principal para cargar una receta individual
async function loadRecipe(recipeId) {
  try {

    const response = await fetch(`/api/recipes/${recipeId}`);

    if (!response.ok) {
      throw new Error(
        `Error HTTP: ${response.status}`
      );
    }

    const recipe = await response.json();

    //Titulo de la pestaña
    document.getElementById("page-title").textContent = recipe.nombre;

    //Carga la info de la receta
    renderRecipe(recipe);

    //Carga una lista de recetas similares
    loadSimilarRecipes(recipeId);

  } catch (error) {
    console.error("Error al cargar la receta:", error);
  }
}

// Cargar recetas similares
async function loadSimilarRecipes(recipeId) {
  const response = await fetch(`/api/recipes/${recipeId}/similar`);


  if (!response.ok) {
      throw new Error(`Error al cargar recetas similares: ${response.status}`);
    }

    // 2. Se extrae el array de recetas del cuerpo de la respuesta.
    const similarRecipes = await response.json();

  const container = document.getElementById("recetas-similares");

  //mapear cada receta similar y crear su mini-card correspondiente
  const html = similarRecipes.map((recipe) => crearCard(recipe)).join("");
  container.innerHTML = html;
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

document.addEventListener("DOMContentLoaded", function () {
  renderHeader();

  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");
  if (recipeId) {
    loadRecipe(recipeId);
  }
});




/*ORIGINAL

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
        </article>

        <article class="valoracion-receta" aria-label="Valoración de la receta">
          <h3 class="valoracion-titulo">Valoración de la receta</h3>

          <form class="rating" role="radiogroup" aria-label="Valoración con estrellas">
              <input type="radio" id="r5" name="rating" value="5"/>
              <label for="r5" title="5 estrellas" aria-label="5 estrellas">★</label>

              <input type="radio" id="r4" name="rating" value="4"/>
              <label for="r4" title="4 estrellas" aria-label="4 estrellas">★</label>

              <input type="radio" id="r3" name="rating" value="3"/>
              <label for="r3" title="3 estrellas" aria-label="3 estrellas">★</label>

              <input type="radio" id="r2" name="rating" value="2"/>
              <label for="r2" title="2 estrellas" aria-label="2 estrellas">★</label>

              <input type="radio" id="r1" name="rating" value="1"/>
              <label for="r1" title="1 estrella" aria-label="1 estrella">★</label>
          </form>

        </article>

        <article>
          <h2 class="titulo-similares">Recetas Similares</h2>
          <div class="mini-card-grid" id="recetas-similares">
          </div>
        </article>
        
      </div>
      
      <div class="columna-lateral derecha">
        <img src="img/italia2.avif" alt="Decoración de utensilios" class="decoracion-img"/>
      </div>
      
    </div>
  `;
*/
=======

import { renderHeader } from "./header.js";  // Importa renderHeader desde header.js
import { crearCard } from "./cards.js";


// Función para obtener el ID de la receta de la URL
function getRecipeIdFromURL() {
    // Verificar si hay parámetros en la URL (?id=pesto)
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    
    if (idFromUrl) {
        return idFromUrl;
    }
    
    // Si no hay parámetros, intentar obtener del nombre del archivo
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    if (filename.includes('.html')) {
        return filename.replace('.html', '');
    }
    
    return null;
}

// Función para cargar una receta desde la API
async function fetchRecipe(recipeId) {
    try {
        
        const response = await fetch(`/api/recipes/${recipeId}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipe:', error);
        throw error;
    }
}

// Función para cargar TODAS las recetas
async function fetchAllRecipes() {
    try {
        const response = await fetch('/api/recipes');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching all recipes:', error);
        throw error;
    }
}

// Función para renderizar la receta en la página
function renderRecipeContent(recipe, similarRecipes = []) {
    const main = document.getElementById("main");
    
    const html = `
        <!-- Loading inicial -->
        <div id="loading" class="loading">
            <p>Cargando receta...</p>
        </div>
        
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
                            alt="${recipe.alt || recipe.nombre}"
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
                            ${recipe.detallado}
                        </section>
                    </article>
                </article>
                
                <!-- Valoración -->
                <section class="valoracion-receta" aria-label="Valoración de la receta">
                    <h3 class="valoracion-titulo">Valoración de la receta</h3>
                    <form class="rating" role="radiogroup" aria-label="Valoración con estrellas">
                        <input type="radio" id="r5" name="rating" value="5"/>
                        <label for="r5" title="5 estrellas" aria-label="5 estrellas">★</label>
                        <input type="radio" id="r4" name="rating" value="4"/>
                        <label for="r4" title="4 estrellas" aria-label="4 estrellas">★</label>
                        <input type="radio" id="r3" name="rating" value="3"/>
                        <label for="r3" title="3 estrellas" aria-label="3 estrellas">★</label>
                        <input type="radio" id="r2" name="rating" value="2"/>
                        <label for="r2" title="2 estrellas" aria-label="2 estrellas">★</label>
                        <input type="radio" id="r1" name="rating" value="1"/>
                        <label for="r1" title="1 estrella" aria-label="1 estrella">★</label>
                    </form>
                </section>
                
                <!-- Recetas similares -->
                <h2 class="titulo-similares">Recetas Similares</h2>
                <div class="mini-card-grid" id="recetas-similares">
                    ${similarRecipes.length > 0 
                        ? similarRecipes.map(receta => crearCard(receta)).join("") 
                        : '<p>No hay recetas similares disponibles.</p>'}
                </div>
            </div>
            
            <div class="columna-lateral derecha">
                <img src="img/italia2.avif" alt="Decoración de utensilios" class="decoracion-img"/>
            </div>
        </div>
    `;
    
    main.innerHTML = html;
    
    // Establecer la valoración
    if (recipe.valoracion) {
        const ratingInput = document.getElementById(`r${recipe.valoracion}`);
        if (ratingInput) {
            ratingInput.checked = true;
        }
    }
    
    // Ocultar el loading
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
        loadingElement.style.display = "none";
    }
}

// Función principal para cargar toda la página
async function loadRecipePage() {
    try {
        //Renderizar el header primero
        renderHeader();
        
        //Mostrar loading en el main
        const main = document.getElementById("main");
        main.innerHTML = '<div id="loading" class="loading" style="display:block;"><p>Cargando receta...</p></div>';
        
        //Obtener ID de la receta
        const recipeId = getRecipeIdFromURL();
        
        if (!recipeId) {
            throw new Error("No se encontró el ID de la receta en la URL");
        }
        
        //Cargar la receta principal
        const recipe = await fetchRecipe(recipeId);
        
        //Actualizar título de la página
        document.title = recipe.nombre;
        
        //Cargar todas las recetas para encontrar similares
        const allRecipes = await fetchAllRecipes();
        
        //Encontrar recetas similares
        const similarRecipes = allRecipes
            .filter(r => {
                // Excluir la receta actual
                if (r.id === recipe.id) return false;
                
                // Verificar si tienen identificadores en común
                if (!r.identificadores || !recipe.identificadores) return false;
                
                return r.identificadores.some(id => 
                    recipe.identificadores.includes(id)
                );
            })
            .slice(0, 7);
        
        //Renderizar todo el contenido
        renderRecipeContent(recipe, similarRecipes);
        
    } catch (error) {
        console.error("Error al cargar la receta:", error);
        
        const main = document.getElementById("main");
        main.innerHTML = `
            <div class="error-message">
                <h2>Error al cargar la receta</h2>
                <p>${error.message}</p>
                <a href="index.html" class="btn-volver">← Volver al inicio</a>
            </div>
        `;
    }
}

// Iniciar cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    loadRecipePage();
});
>>>>>>> 464c6bdcc23cfd1b331af73c6bdb00cdd657af0b
