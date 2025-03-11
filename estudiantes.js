let estudiantes = [];
let idCounter = 1;

class Estudiante {
  constructor(nombre, edad, nivel) {
    this.id = idCounter++;
    this.nombre = nombre;
    this.edad = edad;
    this.nivel = nivel;
  }
}

const crearEstudiante = (nombre, edad, nivel) => {
  const estudiante = new Estudiante(nombre, edad, nivel);
  estudiantes.push(estudiante);
  console.log("Estudiante creado:", estudiante);
};

const listarEstudiantes = () => {
  if (estudiantes.length === 0) {
    console.log("No hay estudiantes registrados.");
  } else {
    console.log("Lista de Estudiantes:");
    estudiantes.forEach(estudiante => {
      console.log(`ID: ${estudiante.id} | Nombre: ${estudiante.nombre} | Edad: ${estudiante.edad} | Nivel: ${estudiante.nivel}`);
    });
  }
};

const actualizarEstudiante = (id, nuevoNombre, nuevaEdad, nuevoNivel) => {
  const estudiante = estudiantes.find(est => est.id === id);
  if (estudiante) {
    estudiante.nombre = nuevoNombre || estudiante.nombre;
    estudiante.edad = nuevaEdad || estudiante.edad;
    estudiante.nivel = nuevoNivel || estudiante.nivel;
    console.log("Estudiante actualizado:", estudiante);
  } else {
    console.log("Estudiante no encontrado.");
  }
};

const eliminarEstudiante = (id) => {
  const index = estudiantes.findIndex(est => est.id === id);
  if (index !== -1) {
    const eliminado = estudiantes.splice(index, 1);
    console.log("Estudiante eliminado:", eliminado[0]);
  } else {
    console.log("Estudiante no encontrado.");
  }
};

export { crearEstudiante, listarEstudiantes, actualizarEstudiante, eliminarEstudiante };