//este es el ejercicio de la primer entrega
// const listadoNotas = [5, 7, 3];

// const posicion = 1;

/* listadoNotas[2];    //3
listadoNotas[0];    //5
listadoNotas[posicion]; //7 */ 

let notas1 = parseInt(prompt("Ingrese la primer nota del alumno"))
let notas2 = parseInt(prompt("Ingrese la segunda nota del alumno"))
let notas3 = parseInt(prompt("Ingrese la tercera nota del alumno"))

let listadoNotas = [notas1, notas2, notas3];

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
//hasta acá llegó ejercicio


/* const listadoDeProductos = ['zapatillas', 'remeras', 'chanclas'];

let acumuladorDeTexto = "";

for (let i = 0; i < 3; i++) {
    acumuladorDeTexto += "<div>" + listadoDeProductos[i] + "</div>";
}

console.log(acumuladorDeTexto);
document.write(acumuladorDeTexto);

let totalCarrito = 0;

function agregarAlCarrito(producto, stock) {
    const tenemosStock = validarStock(stock);

    if (tenemosStock === "Tenemos stock") {
        console.log("Agregas el producto al carrito: " + producto);
        totalCarrito++;
    } else {
        console.log("Lo siento subió mucho el dolar");
    }

}

function validarStock(stockDelProducto) {
    if (stockDelProducto > 0) {
        return "tenemos stock";
    } else {
        return "no tenemos stock";
    }
}


agregarAlCarrito("Zapatillas de toto", 0); */



/* function Producto(tituloParametro, stockParametro, precioParametro) { //Funcion constructora
    this.titulo = tituloParametro;
    this.stock = stockParametro;
    this.precio = precioParametro;
}

const producto1 = new Producto("remera Nike", 10, 500);
const producto2 = new Producto("Zapatillas adidas", 2, 1500);
const producto3 = new Producto("Zapas Jagguar", 90, 9000);
const producto4 = new Producto("chanclas locas", 1, 100000);

/* ******************************************************************************************** */

/*function Auto(objetoDelAuto) { //Funcion constructora
    this.marca = objetoDelAuto.marca;
    this.modelo = objetoDelAuto.modelo;
    this.color = objetoDelAuto.color;
}

const auto = {
    marca: "soy un titulo",
    modelo: 900,
    color: "Rojo"
}; //objeto literal

const miPrimerAuto = new Auto(auto); */