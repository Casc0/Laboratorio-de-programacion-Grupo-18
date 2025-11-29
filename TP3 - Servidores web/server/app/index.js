// TP3 - Servidores web/server.js

const express = require("express"); // Importa la librería express
const path = require("path"); // Importa el módulo path de Node.js
const app = express(); // La variable app es el servidor, una instancia de aplicación Express



app.use("/api/recetas", require("./routes/recipes"));
app.use(express.json());
app.use(express.static(path.join(__dirname, ".././public"))); // Para mas seguridad, se usa path join 

app.get("/", (req, res) => {
  // Lo redirigimos a la nueva URL
  res.send("./index.html");
});
// Alguien visita http://localhost:4000/cocinaitaliana
app.get("/cocinaItaliana", (req, res) => {
  // Redirige al archivo principal de la página
  
});

module.exports = app; // Exporta la app para usarla en server.js

