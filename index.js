import readline from 'readline';
import {
    crearEstudiante, listarEstudiantes, actualizarEstudiante, eliminarEstudiante
} from './estudiantes.js.js';

import {
    listarEstudiantesConArea, buscarEstudiante, promedioPorEstudiante, filtrarEstudiantesPorPromedio,
    estudiantesAprobadosReprobadosPorMateria, promedioGeneralGrupo, promedioPorAreaDeEstudio,
    distribucionEstudiantesPorArea, promedioDeCadaMateriaPorArea, mejoresYPeoresEstudiantesPorArea,
    rankingDeEstudiantesPorPromedio, cantidadAprobadosReprobados, reporteDeRendimientoAcademico
} from './reportes.js.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mostrarMenu = () => {
    rl.question(`
    📚 SISTEMA DE GESTIÓN DE ESTUDIANTES 📚
    1. Crear Estudiante
    2. Listar Estudiantes
    3. Actualizar Estudiante
    4. Eliminar Estudiante
    5. Listado de Estudiantes (map)
    6. Búsqueda de Estudiante por Nombre o ID (find)
    7. Promedio de Calificaciones por Estudiante (map)
    8. Listado de Estudiantes con Promedio Mayor a un Umbral (filter)
    9. Estudiantes Aprobados y Reprobados por Materia (filter)
    10. Promedio General del Grupo (reduce)
    11. Promedio General por Área de Estudio (reduce)
    12. Distribución de Estudiantes por Área (reduce)
    13. Promedio de Cada Materia por Área de Estudio (map + reduce)
    14. Mejores y Peores Estudiantes por Área (sort + slice)
    15. Ranking de Estudiantes por Promedio (sort)
    16. Cantidad de Aprobados y Reprobados en la Clase (reduce)
    17. Reporte de Rendimiento Académico
    18. Salir
    ➤ Selecciona una opción: `, (opcion) => {

        switch (opcion) {
            case '1':
                rl.question('Nombre: ', (nombre) => {
                    rl.question('Edad: ', (edad) => {
                        rl.question('Nivel: ', (nivel) => {
                            crearEstudiante(nombre, parseInt(edad), nivel);
                            mostrarMenu();
                        });
                    });
                });
                break;
            case '2':
                console.log(listarEstudiantes());
                mostrarMenu();
                break;
            case '3':
                rl.question('ID del estudiante: ', (id) => {
                    rl.question('Nuevo nombre: ', (nombre) => {
                        rl.question('Nueva edad: ', (edad) => {
                            rl.question('Nuevo nivel: ', (nivel) => {
                                actualizarEstudiante(parseInt(id), nombre, edad ? parseInt(edad) : undefined, nivel);
                                mostrarMenu();
                            });
                        });
                    });
                });
                break;
            case '4':
                rl.question('ID del estudiante: ', (id) => {
                    eliminarEstudiante(parseInt(id));
                    mostrarMenu();
                });
                break;
            case '5':
                console.log(listarEstudiantesConArea());
                mostrarMenu();
                break;
            case '6':
                rl.question('ID o Nombre del estudiante: ', (input) => {
                    console.log(buscarEstudiante(isNaN(input) ? input : parseInt(input)));
                    mostrarMenu();
                });
                break;
            case '7':
                console.log(promedioPorEstudiante());
                mostrarMenu();
                break;
            case '8':
                rl.question('Ingrese el umbral de promedio: ', (umbral) => {
                    console.log(filtrarEstudiantesPorPromedio(parseFloat(umbral)));
                    mostrarMenu();
                });
                break;
            case '9':
                rl.question('Ingrese la materia: ', (materia) => {
                    console.log(estudiantesAprobadosReprobadosPorMateria(materia));
                    mostrarMenu();
                });
                break;
            case '10':
                console.log(promedioGeneralGrupo());
                mostrarMenu();
                break;
            case '11':
                rl.question('Ingrese el área de estudio: ', (nivel) => {
                    console.log(promedioPorAreaDeEstudio(nivel));
                    mostrarMenu();
                });
                break;
            case '12':
                console.log(distribucionEstudiantesPorArea());
                mostrarMenu();
                break;
            case '13':
                console.log(promedioDeCadaMateriaPorArea());
                mostrarMenu();
                break;
            case '14':
                rl.question('Ingrese el área de estudio: ', (nivel) => {
                    console.log(mejoresYPeoresEstudiantesPorArea(nivel));
                    mostrarMenu();
                });
                break;
            case '15':
                console.log(rankingDeEstudiantesPorPromedio());
                mostrarMenu();
                break;
            case '16':
                console.log(cantidadAprobadosReprobados());
                mostrarMenu();
                break;
            case '17':
                console.log(reporteDeRendimientoAcademico());
                mostrarMenu();
                break;
            case '18':
                console.log("¡Hasta luego!");
                rl.close();
                break;
            default:
                console.log("Opción no válida.");
                mostrarMenu();
        }
    });
};

mostrarMenu();
