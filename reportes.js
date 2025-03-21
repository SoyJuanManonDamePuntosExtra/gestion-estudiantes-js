import { estudiantes } from './estudiantes.js';

export const listarEstudiantesConArea = () => {
    return estudiantes.map(est => ({ nombre: est.nombre, área: est.nivel }));
};

export const buscarEstudiante = (idONombre) => {
    return estudiantes.find(est => est.id === idONombre || est.nombre.toLowerCase() === idONombre.toLowerCase());
};

export const promedioPorEstudiante = () => {
    return estudiantes.map(est => {
        const calificaciones = Object.values(est.calificaciones);
        const promedio = calificaciones.reduce((acc, nota) => acc + nota, 0) / calificaciones.length;
        return { nombre: est.nombre, promedio, área: est.nivel };
    });
};

export const filtrarEstudiantesPorPromedio = (umbral) => {
    return promedioPorEstudiante().filter(est => est.promedio > umbral);
};

export const estudiantesAprobadosReprobadosPorMateria = (materia) => {
    const aprobados = estudiantes.filter(est => est.calificaciones[materia] >= 60)
        .map(est => ({ nombre: est.nombre, calificación: est.calificaciones[materia], área: est.nivel }));
    
    const reprobados = estudiantes.filter(est => est.calificaciones[materia] < 60)
        .map(est => ({ nombre: est.nombre, calificación: est.calificaciones[materia], área: est.nivel }));
    
    return { aprobados, reprobados };
};

export const promedioGeneralGrupo = () => {
    const promedios = promedioPorEstudiante().map(est => est.promedio);
    const promedioGeneral = promedios.reduce((acc, nota) => acc + nota, 0) / promedios.length;
    return { promedioGeneral };
};

export const promedioPorAreaDeEstudio = (nivel) => {
    const estudiantesDelArea = estudiantes.filter(est => est.nivel === nivel);
    if (estudiantesDelArea.length === 0) return { [nivel]: 0 };

    const promedio = estudiantesDelArea
        .map(est => Object.values(est.calificaciones).reduce((acc, nota) => acc + nota, 0) / Object.keys(est.calificaciones).length)
        .reduce((acc, prom) => acc + prom, 0) / estudiantesDelArea.length;

    return { [nivel]: promedio };
};

export const distribucionEstudiantesPorArea = () => {
    return estudiantes.reduce((acc, est) => {
        acc[est.nivel] = (acc[est.nivel] || 0) + 1;
        return acc;
    }, {});
};

export const promedioDeCadaMateriaPorArea = () => {
    const materiasPorArea = {};

    estudiantes.forEach(est => {
        if (!materiasPorArea[est.nivel]) {
            materiasPorArea[est.nivel] = {};
        }

        Object.keys(est.calificaciones).forEach(materia => {
            if (!materiasPorArea[est.nivel][materia]) {
                materiasPorArea[est.nivel][materia] = [];
            }
            materiasPorArea[est.nivel][materia].push(est.calificaciones[materia]);
        });
    });

    Object.keys(materiasPorArea).forEach(area => {
        Object.keys(materiasPorArea[area]).forEach(materia => {
            const calificaciones = materiasPorArea[area][materia];
            materiasPorArea[area][materia] = calificaciones.reduce((acc, nota) => acc + nota, 0) / calificaciones.length;
        });
    });

    return materiasPorArea;
};

export const mejoresYPeoresEstudiantesPorArea = (nivel) => {
    const estudiantesDelArea = promedioPorEstudiante().filter(est => est.área === nivel);
    if (estudiantesDelArea.length === 0) return { mejores: [], peores: [] };

    estudiantesDelArea.sort((a, b) => b.promedio - a.promedio);
    return {
        mejores: estudiantesDelArea.slice(0, 2),
        peores: estudiantesDelArea.slice(-2)
    };
};

export const rankingDeEstudiantesPorPromedio = () => {
    return promedioPorEstudiante().sort((a, b) => b.promedio - a.promedio);
};

export const cantidadAprobadosReprobados = () => {
    return estudiantes.reduce((acc, est) => {
        const promedio = Object.values(est.calificaciones).reduce((sum, nota) => sum + nota, 0) / Object.keys(est.calificaciones).length;
        if (promedio >= 60) {
            acc.aprobados += 1;
        } else {
            acc.reprobados += 1;
        }
        return acc;
    }, { aprobados: 0, reprobados: 0 });
};

export const reporteDeRendimientoAcademico = () => {
    const totalEstudiantes = estudiantes.length;
    const promedioGeneralGrupo = promedioGeneralGrupo().promedioGeneral;
    const mejoresEstudiantes = filtrarEstudiantesPorPromedio(85);
    const peoresEstudiantes = promedioPorEstudiante().filter(est => est.promedio < 60);

    return {
        totalEstudiantes,
        promedioGeneralGrupo,
        mejoresEstudiantes,
        peoresEstudiantes
    };
};
