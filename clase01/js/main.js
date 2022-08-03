const totalCarrito = localStorage.getItem('totalCarrito');
const elementosCarrito = Json.parse(localStorage.getItem('carrito'));
const carrito = elementosCarrito;

let cards = "";

/* productos.forEach((producto) => {
    cards += `<div class='card d-flex col-4'>
    <h2>${producto.title}</h2>
    <button onclick='agregarAlCarrito("${producto.title}")'>Agregar al carrito</button>
    </div>`
}) */

productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}`;
    document.getElementById("seccion-card").innerHTML += `<div class='card d-flex col-4'>
    <h2>${producto.title}</h2>
    <button id = "${idButton}")'>Agregar al carrito</button>
    </div>`
})

productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}`;
    document.getElementById(idButton).addEventListener('click', () => {
        carrito.push(producto);
        const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
        document.getElementById("cart-total").innerHTML = carrito.length + Number(totalCarrito) + "- $" + total;
        console.log(carrito);
        localStorage.setItem('totalCarrito', carrito.length);
    })
})

function agregarAlCarrito(tituloProducto) {
    alert("Me agregaste!!" + tituloProducto);
}
