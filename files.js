import { writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

// Nuevo usuario a agregar
const nuevoUsuario = {
  nombre: "Janja Garnbret",
  email: "janja@climb.ing"
};

const archivo = "usuarios.json";

async function manejarUsuarios() {
  let usuarios = [];

  // Verificar si el archivo existe
  if (existsSync(archivo)) {
    // Leer el archivo existente
    const data = await readFile(archivo, "utf-8");
    usuarios = JSON.parse(data);
  }

  // Añadir el nuevo usuario sin borrar los anteriores
  usuarios.push(nuevoUsuario);

  //  Guardar el arreglo completo en el archivo
  await writeFile(archivo, JSON.stringify(usuarios, null, 2));

  // Mostrar los usuarios en consola
  console.log("Usuarios guardados:");
  console.log(usuarios);
}

// Ejecutar la función
manejarUsuarios().catch(console.error);
