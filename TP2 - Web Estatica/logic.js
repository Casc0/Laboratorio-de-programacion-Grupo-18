const recetaHtml = (id) => {
    const recetasJson = awaitfetch(recipes.json);
    const recetas = await (recetasJson => recetasJson.json());
    const receta = recetas.find((receta) => receta.id === id);
    let ingredientes;
    let preparacion;

    receta.ingredientes.forEach((ingrediente) => {
        ingredientes += `<li>${ingrediente}</li>`;
    });
    receta.preparacion.forEach((paso) => {
        preparacion += `<li>${paso}</li>`;
    });
    const html = `    
        <article class="header-receta">
            <section class="categoria-receta"></section>
    
            <section class="titulo-receta">
              <h1>${receta.nombre}</h1>
            </section>
          </article>
    
          <article class="main-receta">
            <section class="foto-receta">
              <img
                src="${receta.imagen-principal}"
                alt="${receta.alt}"
                class="imagen-principal"
              />
            </section>
    
            <section class="descripcion-receta">
              <p>
                <strong
                  >${receta.descripcion}</strong
                >
              </p>
            </section>
    
            <section class="grid-items">
              <article class="grid-item">
                <h4>⏱️ Tiempo de Preparación</h4>
                <p>${receta.categoria.tiempo}</p>
              </article>
    
              <article class="grid-item">
                <h4> Dificultad</h4>
                <p>${receta.categoria.dificultad}</p>
              </article>
    
              <article class="grid-item">
                <h4> Porciones</h4>
                <p>${receta.categoria.porciones}</p>
              </article>
    
            </section>"

        <article class ="cuerpo-receta">
            <div class="resumen-receta">
                <section class="seccion-receta-2">

                    <h2>Ingredientes</h2>
                    <ul>
                        ${ingredientes}
                    </ul>
                </section>

                <section class="seccion-receta-2">
                    <h2>Preparación</h2>
                    <ul>
                        ${preparacion}
                    </ul>

                </section>
            </div>

            <section class="seccion-receta-2">
                <h2>Descripción Detallada de la Preparación</h2>
                <p>
                    ${receta.detallado}
                </p>
            </section>
        </article>

    </article>
    `;
    appendChild(html, document.querySelector('main'));
}