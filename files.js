import { writeFileSync, readFileSync } from "node:fs";


// Crea un arreglo con datos de usuarios
const usuarios = [
    { nombre: "Adam Ondra", email: "adam.ondra@climb.ing" }
];


// Convierte el arreglo de usuarios a formato JSON
const usersJson = JSON.stringify(usuarios)


// Escribe el archivo users.json con los datos de usuarios
writeFileSync('usuarios.json', usersJson)


// Lee el archivo users.json y lo parsea a un objeto JavaScript
const readUsersJson = readFileSync('usuarios.json')
const readUsers = JSON.parse(readUsersJson)


// Muestra los datos leídos en la consola
console.log(readUsers)


