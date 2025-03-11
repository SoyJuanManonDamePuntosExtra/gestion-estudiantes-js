import { estudiantes } from "./estudiantes.js";

const listarEstudiantesConArea = () => {
  return estudiantes.map(est => ({ nombre: est.nombre, área: est.nivel }));
};

const buscarEstudiante = (idONombre) => {
  return estudiantes.find(est => est.id === idONombre || est.nombre.toLowerCase() === idONombre.toLowerCase()) || "Estudiante no encontrado";
};

const promedioPorEstudiante = () => {
  return estudiantes.map(est => {
    const calificaciones = Object.values(est.calificaciones);
    const promedio = calificaciones.length ? calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length : 0;
    return { nombre: est.nombre, promedio: promedio.toFixed(2), área: est.nivel };
  });
};

export { listarEstudiantesConArea, buscarEstudiante, promedioPorEstudiante };
