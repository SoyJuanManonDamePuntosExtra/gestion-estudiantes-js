import { crearEstudiante, listarEstudiantes, actualizarEstudiante, eliminarEstudiante } from './estudiantes.js.js';
import { listarEstudiantesConArea, buscarEstudiante, promedioPorEstudiante } from './reportes.js.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = () => {
  rl.question(`\n  Bienvenido al Sistema de Gestión de Estudiantes\n  1. Crear Estudiante\n  2. Listar Estudiantes\n  3. Actualizar Estudiante\n  4. Eliminar Estudiante\n  5. Listar Estudiantes con Área\n  6. Buscar Estudiante por ID o Nombre\n  7. Calcular Promedio de Cada Estudiante\n  8. Salir\n  Elige una opción: `, (opcion) => {
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
        console.log("Listado de estudiantes con área:", listarEstudiantesConArea());
        menu();
        break;
      case '6':
        rl.question('Ingresa el ID o nombre del estudiante: ', (idONombre) => {
          console.log("Resultado de la búsqueda:", buscarEstudiante(isNaN(idONombre) ? idONombre : parseInt(idONombre)));
          menu();
        });
        break;
      case '7':
        console.log("Promedio de cada estudiante:", promedioPorEstudiante());
        menu();
        break;
      case '8':
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
