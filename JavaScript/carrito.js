document.addEventListener("DOMContentLoaded", () => {
    mostrarProductosCarrito();
});

function mostrarProductosCarrito() {
    const divProductos = document.getElementById("productos");
    divProductos.innerHTML = "";

    let row = document.createElement("div");
    row.className = "row";
    divProductos.appendChild(row);

    let productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalCompra = 0;

    productosCarrito.forEach(producto => {
        totalCompra += crearCardProducto(producto, row);
    });

    mostrarTotalCompra(totalCompra);
    agregarBotonEliminar(divProductos);
}

function crearCardProducto(producto, row) {
    const { imagen, nombre, categoria, precio } = producto;
    let card = document.createElement("div");
    card.className = "card col-xl-3 col-md-6 col-sm-12";
    card.innerHTML = `
        <img class="card-img-top" src="${imagen}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">Categoria: ${categoria}</p>
            <p class="card-text">Precio: <b>$${precio}</b></p>
        </div>`;
    row.appendChild(card);
    return precio;
}

function mostrarTotalCompra(totalCompra) {
    // Intenta encontrar un elemento existente que muestre el total
    let totalElement = document.querySelector(".total-compra");
    
    // Si el elemento no existe, créalo
    if (!totalElement) {
        totalElement = document.createElement("div");
        totalElement.className = "total-compra";
        totalElement.style.textAlign = "center";
        // Inserta el nuevo elemento antes del footer
        document.body.insertBefore(totalElement, document.querySelector("footer"));
    }
    
    // Actualiza el contenido del elemento con el nuevo total
    totalElement.innerHTML = `<h4>Estos son los productos agregados al carrito, el total de su compra será: <span style="font-weight: bold;">$${totalCompra}</span></h4>`;
}

function agregarBotonEliminar(divProductos) {
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar elementos del carrito";
    botonEliminar.className = "btn btn-danger mt-3";
    botonEliminar.style.display = "block";
    botonEliminar.style.margin = "auto";
    divProductos.after(botonEliminar);

    botonEliminar.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        // Para evitar recargar la página, actualiza el DOM directamente aquí
        document.getElementById("productos").innerHTML = "";
        mostrarTotalCompra(0); // Actualiza el total a $0
        botonEliminar.remove(); // Elimina el botón de eliminar
    });
}

