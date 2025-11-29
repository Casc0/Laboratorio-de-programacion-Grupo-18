export function renderRecipe(recipe) {
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
        
      </div>
      
      <div class="columna-lateral derecha">
        <img src="img/italia2.avif" alt="Decoración de utensilios" class="decoracion-img"/>
      </div>
      
    </div>
  `;

  mainContent.innerHTML = html;
  setRecipeRating(recipe.valoracion);
}