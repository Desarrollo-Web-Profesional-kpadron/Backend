import { createServer } from "node:http";
import { MongoClient, ObjectId } from "mongodb";

//  Configuración MongoDB
const url = "mongodb://localhost:27017/";
const dbName = "test";
const client = new MongoClient(url);

// Conexión a Mongo
try {
  await client.connect();
  console.log(" Conectado a MongoDB");
} catch (err) {
  console.error("Error de conexión:", err);
}

// Crear servidor
const server = createServer(async (req, res) => {
  const db = client.db(dbName);
  const proyectos = db.collection("proyectos");

  res.setHeader("Content-Type", "application/json");

  // CREAR DOCUMENTO
  if (req.method === "POST" && req.url === "/proyectos") {
    const nuevoProyecto = {
      nombre: "Sistema de Citas",
      materia: "Desarrollo Web",
      alumno: "Karen Padron",
      cuatrimestre: "8vo",
      estatus: "Activo",
      fecha: new Date()
    };

    const result = await proyectos.insertOne(nuevoProyecto);
    res.end(JSON.stringify({ mensaje: "Proyecto creado", id: result.insertedId }));
  }

  // LISTAR TODOS
  else if (req.method === "GET" && req.url === "/proyectos") {
    const lista = await proyectos.find().toArray();
    res.end(JSON.stringify(lista));
  }

  // LISTAR UNO POR ID
  else if (req.method === "GET" && req.url.startsWith("/proyectos/id/")) {
    const id = req.url.split("/")[3];
    const proyecto = await proyectos.findOne({ _id: new ObjectId(id) });
    res.end(JSON.stringify(proyecto));
  }

  //  LISTAR POR CONDICIÓN (estatus)
  else if (req.method === "GET" && req.url === "/proyectos/activos") {
    const activos = await proyectos.find({ estatus: "Activo" }).toArray();
    res.end(JSON.stringify(activos));
  }

  //  ORDENAR ASCENDENTE
  else if (req.method === "GET" && req.url === "/proyectos/orden/asc") {
    const ordenados = await proyectos.find().sort({ nombre: 1 }).toArray();
    res.end(JSON.stringify(ordenados));
  }

  //  ORDENAR DESCENDENTE
  else if (req.method === "GET" && req.url === "/proyectos/orden/desc") {
    const ordenados = await proyectos.find().sort({ nombre: -1 }).toArray();
    res.end(JSON.stringify(ordenados));
  }

  //  MODIFICAR DOCUMENTO
  else if (req.method === "PUT" && req.url.startsWith("/proyectos/")) {
    const id = req.url.split("/")[2];
    await proyectos.updateOne(
      { _id: new ObjectId(id) },
      { $set: { estatus: "Finalizado" } }
    );
    res.end(JSON.stringify({ mensaje: "Proyecto actualizado" }));
  }

  //  ELIMINAR DOCUMENTO
  else if (req.method === "DELETE" && req.url.startsWith("/proyectos/")) {
    const id = req.url.split("/")[2];
    await proyectos.deleteOne({ _id: new ObjectId(id) });
    res.end(JSON.stringify({ mensaje: "Proyecto eliminado" }));
  }

  //  RUTA NO EXISTE
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});

// Levantar servidor
server.listen(3000, () => {
  console.log("🚀 Servidor Mongo en http://localhost:3000");
});
