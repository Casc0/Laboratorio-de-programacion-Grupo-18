async function getFeaturedRecipe(){

  const url = '/api/featured-recipe';
    try {
      const recipe = await fetch(url, {
        method: "GET",
        // …
      });
      if (!recipe.ok) {
        throw new Error(`Response status: ${recipe.status}`);
      }
      const recipeData = await recipe.json();
      console.log(recipeData);
    } catch (error) {
      console.error(error.message);
    }

    const html = `<article class="Destacado-Flip-Card" >
            <section class="Destacado-Flip-Card-Inner">
                <section class="Destacado-Flip-Card-Front">
                    <img class="ImagenDestacada" src="${recipeData.imagen-principal}" alt="${recipeData.alt}" />
                    <div class="Destacado-Overlay">
                        <span class="Destacado-Tag">Destacado-</span>
                        <h2 class="Destacado-Titulo">${recipeData.nombre}</h2>
                    </div>
                </section>
                <section class="Destacado-Flip-Card-Back">
                    <div class="Destacado-Overlay">
                        <h2 class="Destacado-Titulo">${recipeData.nombre}</h2>
                        <!-- Descripción breve/subtítulo -->
                        <p class="Destacado-Subtitulo">${recipeData.descripcion}</p>
                    </div>
                </section>
            </section>
        </article>`;

    return html;
}

async function getIndex(){
  const main = document.getElementById("main_index");
  const featuredRecipeHTML = await getFeaturedRecipe();
  main.appendChild(featuredRecipeHTML);
}