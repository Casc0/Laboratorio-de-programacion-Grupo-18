// TP3 - Servidores web/server.js

const express = require('express'); // Importa la librería express
const path = require('path'); // Importa el módulo path de Node.js
const app = express(); // La variable app es el servidor, una instancia de aplicación Express
const PORT = 4000; // Define el puerto en el que se ejecutará la app

// =======================================================
//  CONFIGURACIÓN DE RUTAS ESTÁTICAS
// =======================================================

const tp2Path = path.join(__dirname, '../', 'TP2 - Web Estatica'); // Define la ubicación del proyecto HTML

// Registra la carpeta TP2 y sus subcarpetas para que el contenido sea público
app.use(express.static(tp2Path));
app.use(express.static(path.join(tp2Path, 'html')));
app.use(express.static(path.join(tp2Path, 'js')));
app.use(express.static(path.join(tp2Path, 'img')));


// =======================================================
// ENDPOINTS (LA LÓGICA DE LAS URLS)
// =======================================================

// RUTA : /cocinaitaliana
// Alguien visita http://localhost:4000/cocinaitaliana
app.get('/cocinaItaliana', (req, res) => {
    // Redirige al archivo principal de la página
    res.redirect('/index.html'); 
});

// RUTA RAÍZ: /
app.get('/', (req, res) => {
    // Lo redirigimos a la nueva URL 
    res.redirect('/cocinaItaliana');
});

app.get('/cocinaItaliana/recetas', async (req, res) =>{
    const list = await fetch("./recipes.json");
    console.log(list.json)
})

app.get('/cocinaItaliana/recetas/${id}', async (req, res) =>{
    const list = await fetch("./recipes.json");
    console.log(list.json)
})

// =======================================================
// INICIO DEL SERVIDOR
// =======================================================

app.listen(PORT, () => {
    // Mensajes de confirmación
    console.log(`Servidor Express listo para el HTML.`);
    console.log(`\nURL Principal: http://localhost:${PORT}/cocinaItaliana`);
    console.log(`Presionar Ctrl + C para detener el servidor.`);
});