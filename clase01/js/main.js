
const carrito = [];

class Producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

let producto1 = new Producto(12, "Ojotas", 5000);
let producto2 = new Producto(15, "Pantuflas", 6000);
let producto3 = new Producto(16, "Remera manga larga", 5000);
let producto4 = new Producto(17, "Buzo Adidas", 8000);


const inventario = [producto1, producto2, producto3, producto4]


function agregarAlCarrito(producto) {
    // agregar validar stock
    // agregar validar colores

    carrito.push(producto);
    console.log(carrito);
}


function borrarProducto(idDelProducto) {
    const index = carrito.findIndex((producto) => producto.id === idDelProducto); //=> es una funcion flecha, ver funciones flecha (findIndex busca en objetos)
    if (index != -1) {
        carrito.splice(index, 1);
    }

    console.log(index);
    carrito.splice(index, 1); 
    console.log(carrito);
}


function operacion(){
    let opcion = parseInt(prompt("ingrese su operación :\n1)Agregar un producto\n2)Ver un producto\n3)Salir"));
    while (opcion !==3){
        console.log(opcion)
        switch (opcion){
            case 1:
                agregarProducto();
                break;
            case 2:
                verProductos();
                break;        
        }
        opcion =parseInt(prompt("ingrese su operación :\n1)Agregar un producto\n2)Ver un producto\n3)Salir"));
    }
}

function agregarProducto(){
    let id = parseInt(prompt("Ingrese Id del producto: "));
    let nombre = prompt("Nombre del producto: ");
        if (nombre.length == 0){
            alert("ingrese un nombre valido ");
            return false;
        }
    let precio = parseInt(prompt("Precio del producto: "));

    let nuevoProd = new Producto(id, nombre, precio);
    inventario.push(nuevoProd);
}

function verProductos(){
    let textAux ="";

    inventario.forEach((producto) =>{
        textAux +="Id: " + producto.id + "-Nombre: " + producto.nombre + "-Precio: " + producto.precio + "\n";
    })
    alert(textAux);

}

operacion()

agregarAlCarrito({ id: 1, nombre: "Gorra adidas", precio: 5000 });
agregarAlCarrito({ id: 2, nombre: "Zapas adidas", precio: 7000 });
agregarAlCarrito({ id: 3, nombre: "Remera adidas", precio: 2000 });
agregarAlCarrito({ id: 4, nombre: "Jeans", precio: 5000 });

borrarProducto(3)