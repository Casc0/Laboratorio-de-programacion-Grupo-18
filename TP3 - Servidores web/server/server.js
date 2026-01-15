const app = require("./app"); // Importa la app de Express desde index.js
const PORT = 4000; // Define el puerto en el que se ejecutará la app

app.listen(PORT, () => {
  // Mensajes de confirmación
  console.log(`Servidor Express listo para el HTML.`);
  console.log(`\nURL Principal: http://localhost:${PORT}/cocinaItaliana`);
  console.log(`Presionar Ctrl + C para detener el servidor.`);
});
