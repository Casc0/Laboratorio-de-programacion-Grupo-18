export function renderHeader() {
    console.log("Rendering header...");

  const mainContent = document.getElementById("header");

  const html = `
  <a href="index.html" style="text-decoration: none;">
    <h1 class="TituloPrincipal" >
            <span class="textoTitulo" style="color: #008c45">Cocin</span>
            <span class="textoTitulo" style="color: #f4f9ff">a Ita</span>
            <span class="textoTitulo" style="color: #cd212a">liana</span>
        </h1>
    </a>

    <div class="Herramientas">
        

        <search>
            <input id="barraBusqueda" type="text" placeholder="Buscar..."/>
            <div id="suggestionsContainer" class="suggestions-container"></div>
        </search>
    </div>
    `;

  mainContent.innerHTML = html;
}

/* Eliminados pro el momento:
<nav>
            <ul class="navList">
                <li class="NavElement"><a href="index.html">Inicio</a></li>
                <li class="NavElement"><a href="recetas.html">Recetas</a></li>
                <li class="NavElement">
                    <a href="ingredientes.html">Ingredientes</a>
                </li>
                <li class="NavElement"><a href="tecnicas.html">Tecnicas</a></li>
            </ul>
        </nav>

                */