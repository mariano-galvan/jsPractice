function calculadora(primerNumero, segundoNumero, operacion) {
    switch (operacion) {
        case '+':
            return primerNumero + segundoNumero;
        case '-':
            return primerNumero - segundoNumero;
        case '*':
            return primerNumero * segundoNumero;
        case '/':
            return primerNumero / segundoNumero;
        default:
            return 0;
    }
}


let numero1 = prompt('Ingrese el primer número:');
let numero2 = prompt('Ingrese el segundo número:');
let operacion = prompt('Ingrese la operación a realizar:');


let resultado = calculadora(numero1, numero2, operacion);
console.log(resultado);


const sumar = (a, b) => a + b;
const resta = (a, b) => a - b;

const iva = x => x * 0.21;

let precioProducto = 500;
let precioDescuento = 50;

let nuevoPrecio = resta(sumar(precioProducto, iva(precioProducto)), precioDescuento);

console.log(nuevoPrecio);


let notas1 = parseInt(prompt("Ingrese la primer nota del alumno"))
let notas2 = parseInt(prompt("Ingrese la segunda nota del alumno"))
let notas3 = parseInt(prompt("Ingrese la tercera nota del alumno"))

let listadoNotas1 = [notas1, notas2, notas3];

function calcNotas(listadoNotas) {
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

let palabrasList = [];
function palabras() {

    for (let i = 0; i <= 2; i++) {
        let palabra = prompt("Ingresa tu palabra: ");
        palabrasList.push(palabra);
    }
}

palabras();
console.log(palabrasList);