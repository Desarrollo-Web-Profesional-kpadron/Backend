import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const PORT = 3000;
const archivoUsuarios = "usuarios.json";

const server = createServer(async (req, res) => {

  //  Ruta de inicio
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hola a todos \n");

  // Ruta de usuarios
  } else if (req.url === "/users") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    // Verificar si el archivo existe
    if (existsSync(archivoUsuarios)) {
      const data = await readFile(archivoUsuarios, "utf-8");
      res.end(data);
    } else {
      res.end(JSON.stringify([]));
    }

  //  Ruta no encontrada
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Ruta no encontrada");
  }
});

// Levantar servidor
server.listen(PORT, () => {
  console.log(`Ejecutando servidor en http://localhost:${PORT}/`);
});
