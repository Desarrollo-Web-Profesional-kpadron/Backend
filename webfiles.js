import { createServer } from "node:http";
import { readFile, appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const PORT = 3000;
const USERS_FILE = "usuarios.json";
const LOG_FILE = "access.log";

const server = createServer(async (req, res) => {

  // LOGGER DE PETICIONES
  const fecha = new Date().toISOString().split("T")[0];
  const log = `[${fecha}] Alguien visitó ${req.url}\n`;

  try {
    await appendFile(LOG_FILE, log);
  } catch (err) {
    console.error("Error escribiendo log:", err);
  }

  // LÓGICA DE RUTAS Y MÉTODOS
  if (req.url === "/users") {

    // GET → devolver usuarios
    if (req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      try {
        if (existsSync(USERS_FILE)) {
          const data = await readFile(USERS_FILE, "utf-8");
          res.end(data);
        } else {
          res.end(JSON.stringify([]));
        }
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Error leyendo usuarios" }));
      }

    // POST → no permitido
    } else if (req.method === "POST") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "text/plain");
      res.end("Todavía no aceptamos datos, solo lectura");

    // Otros métodos
    } else {
      res.statusCode = 405;
      res.setHeader("Content-Type", "text/plain");
      res.end("Método no permitido");
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
  console.log("Servidor Pro en el puerto 3000");
});
