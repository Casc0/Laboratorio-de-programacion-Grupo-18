const app = require("./app"); // Importa la app de Express desde index.js
const PORT = 4000; // Define el puerto en el que se ejecutará la app

// Para desarrollo local
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor Express listo para el HTML.`);
    console.log(`\nURL Principal: http://localhost:${PORT}/cocinaItaliana`);
    console.log(`Presionar Ctrl + C para detener el servidor.`);
  });
}

// Exportar para Vercel Serverless Functions
module.exports = app;
