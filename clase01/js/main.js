

const listadoDeProductos = ['zapatillas', 'remeras', 'chanclas'];

let acumuladorDeTexto = "";

for(let i= 0; i < 3; i++) {
    acumuladorDeTexto += "<div>" + listadoDeProductos[i]+"</div>";
}

console.log(acumuladorDeTexto);
document.write(acumuladorDeTexto);

let totalCarrito = 0;

function agregarAlCarrito(producto, stock) {
    const tenemosStock = validarStock(stock);

    if(tenemosStock === "Tenemos stock"){
        console.log("Agregas el producto al carrito: "  + producto);
        totalCarrito++;
    }else{
        console.log("Lo siento subió mucho el dolar");
    }    
    
}

function validarStock(stockDelProducto){
    if (stockDelProducto > 0){
        return "tenemos stock";
    } else{
        return "no tenemos stock";
    }
}


agregarAlCarrito("Zapatillas de toto", 0);

