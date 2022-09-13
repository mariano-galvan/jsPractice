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
