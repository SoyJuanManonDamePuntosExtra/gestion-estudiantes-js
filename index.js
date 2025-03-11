import { crearEstudiante, listarEstudiantes, actualizarEstudiante, eliminarEstudiante } from './estudiantes.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = () => {
  rl.question(`
  Bienvenido al Sistema de Gestión de Estudiantes
  1. Crear Estudiante
  2. Listar Estudiantes
  3. Actualizar Estudiante
  4. Eliminar Estudiante
  5. Salir
  Elige una opción: `, (opcion) => {
    switch(opcion) {
      case '1':
        rl.question('Ingresa el nombre del estudiante: ', (nombre) => {
          rl.question('Ingresa la edad del estudiante: ', (edad) => {
            rl.question('Ingresa el nivel del estudiante: ', (nivel) => {
              crearEstudiante(nombre, parseInt(edad), nivel);
              menu();
            });
          });
        });
        break;
      case '2':
        listarEstudiantes();
        menu();
        break;
      case '3':
        rl.question('Ingresa el ID del estudiante a actualizar: ', (id) => {
          rl.question('Ingresa el nuevo nombre (deja vacío para no cambiar): ', (nuevoNombre) => {
            rl.question('Ingresa la nueva edad (deja vacío para no cambiar): ', (nuevaEdad) => {
              rl.question('Ingresa el nuevo nivel (deja vacío para no cambiar): ', (nuevoNivel) => {
                actualizarEstudiante(parseInt(id), nuevoNombre, nuevaEdad ? parseInt(nuevaEdad) : undefined, nuevoNivel);
                menu();
              });
            });
          });
        });
        break;
      case '4':
        rl.question('Ingresa el ID del estudiante a eliminar: ', (id) => {
          eliminarEstudiante(parseInt(id));
          menu();
        });
        break;
      case '5':
        console.log("¡Hasta luego!");
        rl.close();
        break;
      default:
        console.log("Opción no válida.");
        menu();
    }
  });
};

menu();
