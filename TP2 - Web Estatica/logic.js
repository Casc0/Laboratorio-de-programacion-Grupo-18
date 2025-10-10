const recetaHtml = (id) => {
    const receta = fetch();
    const html = `    
    <article class="header-receta">
        <section class="categoria-receta"></section>

        <section class="titulo-receta">
          <h1>Pesto alla Genovese</h1>
        </section>
      </article>

      <article class="main-receta">
        <section class="foto-receta">
          <img
            src="Images/pesto.jpg"
            alt="Pappardelle con Salchicha"
            class="imagen-principal"
          />
        </section>

        <section class="descripcion-receta">
          <p>
            <strong
              >El Pesto alla Genovese es un clásico de la región de Liguria,
              Italia, famoso por su frescura y aroma gracias a la albahaca y el
              aceite de oliva extra virgen.</strong
            >
          </p>
        </section>

        <section class="grid-items">
          <article class="grid-item">
            <h4>⏱️ Tiempo de Preparación</h4>
            <p>30 minutos</p>
          </article>

          <article class="grid-item">
            <h4> Dificultad</h4>
            <p>${receta.categoria.dificultad}</p>
          </article>

          <article class="grid-item">
            <h4> Porciones</h4>
            <p>4 personas</p>
          </article>

          <article class="grid-item">
            <h4> Categoría</h4>
            <p>Plato Principal</p>
          </article>
        </section>"
    `
}