console.log("Hola desde el backend!");

const os = require('os');
const fs = require('fs');


function bytesAGB(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2);
}

console.log("=== Información del sistema ===");

// 1. Sistema operativo
console.log("Sistema Operativo:", os.platform());

// 2. Versión del sistema
console.log("Versión:", os.release());

// 3. Arquitectura
console.log("Arquitectura:", os.arch());

// 4. Nombre del equipo
console.log("Nombre del equipo:", os.hostname());

// 5. Memoria RAM total
console.log("Memoria RAM total:", bytesAGB(os.totalmem()), "GB");

// 6. Memoria RAM libre
console.log("Memoria RAM libre:", bytesAGB(os.freemem()), "GB");

// 7. Tiempo encendido del sistema
console.log("Tiempo encendido:", (os.uptime() / 60).toFixed(2), "minutos");

// 8. Espacio en disco (unidad principal)
try {
  const stats = fs.statSync("/");
  console.log("Disco detectado correctamente");
} catch (error) {
  console.log("No se pudo obtener información del disco directamente");
}

console.log("===============================");
