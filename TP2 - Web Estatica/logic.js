const recetaHtml = (id) => {
    const receta = fetch();
    const html = `    
    <article class="header-receta">
        <section class="categoria-receta"></section>

        <section class="titulo-receta">
          <h1>${receta.nombre}/h1>
        </section>
      </article>

      <article class="main-receta">
        <section class="foto-receta">
          <img
            src="${receta.imagenPrincipal}"
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
            <p>4${receta.categoria.porciones}</p>
          </article>

          <article class="grid-item">
            <h4> Categoría</h4>
            <p>${receta.categoria.categoria}</p>
          </article>
        </section>"
    `
}