// =======================================================
// FUNCIONES PARA MINI-CARDS 
// =======================================================

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

function makeMiniCards(recipes) {
  // Generar el HTML de todas las tarjetas
  const cards = recipes.map((recipe) => crearCard(recipe)).join("");
  const html = `<div class="mini-card-grid">${cards}</div>`;
  return html;
}

// Función principal para conseguir todas las mini-cards
export async function getAllMiniCards() {
  try {
    const url = "/api/recipes?from=0&limit=3";
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

  } catch (error) {
    console.error(
      "Error al cargar las mini-cards (¡Revisa la ruta del JSON!)",
      error
    );
    return '<p style="color: red; text-align: center;">Error al cargar las recetas. Verifica la Consola (F12) y la ruta del JSON.</p>';
  }
}

// =======================================================
// FUNCIONES PARA RECIPE-MINIMAL (TARJETAS BLANCAS EN GRID) 
// =======================================================

function createRecipeMinimal(item) {
  if (!item) return "";

  const id = item.id || "unknown";
  const nombre = item.nombre || "Sin nombre";
  const imagen = item["imagen-principal"] || "img/default.jpg";
  const descripcion = item.descripcion || "Descripción no disponible";
  const valoracion = item.valoracion || 0;

  const ingredientes = Array.isArray(item.ingredientes)
    ? item.ingredientes.slice(0, 4).join(", ")
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
        let recipesArray = [];

        if (result.success && Array.isArray(result.data)) {
            recipesArray = result.data;
        } else if (Array.isArray(result)) {
            recipesArray = result;
        } else {
            throw new Error("Formato de datos inválido");
        }

        const validItems = recipesArray.filter(item => item !== undefined && item !== null);
        
        const cardsHTML = validItems.map(createRecipeMinimal).join("");
        
        return `<div class="grid-recipes">${cardsHTML}</div>`;

    } catch (e) {
        console.error("Error en getExploreRecipes:", e);
        return "<p>Error al cargar los elementos.</p>";
    }
}

// =======================================================
// FUNCIÓN PARA TARJETA DESTACADA
// =======================================================

export function featuredCard(recipe) {
  console.log("Creating featured card for recipe:", recipe.nombre);

  const html = `<article class="Destacado-Flip-Card" >
            <section class="Destacado-Flip-Card-Inner">
                <section class="Destacado-Flip-Card-Front">
                    <img class="ImagenDestacada" src="${recipe["imagen-principal"]}" alt="${recipe.alt}" />
                    <div class="Destacado-Overlay">
                        <span class="Destacado-Tag">Destacado</span>
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