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