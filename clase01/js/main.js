let notas1 = parseInt(prompt("Ingrese la primer nota del alumno"))
let notas2 = parseInt(prompt("Ingrese la segunda nota del alumno"))
let notas3 = parseInt(prompt("Ingrese la tercera nota del alumno"))

let listadoNotas1 = [notas1, notas2, notas3];

function calcNotas(listadoNotas){
    let sumadorDeNotas = 0;
    for (let i = 0; i < 3; i++) {
        sumadorDeNotas = sumadorDeNotas + listadoNotas[i];
        // sumadorDeNotas += listadoNotas[i]; es lo mismo que lo de arriba
    }
    const promedio = sumadorDeNotas / 3;
    console.log(promedio);
    
    if (promedio >= 7) {
        console.log("Aprobaste y aprobaste con un:" + promedio);
    } else {
        console.log("no aprobaste");
    }
}

calcNotas(listadoNotas1)