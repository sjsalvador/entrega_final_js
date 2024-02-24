document.addEventListener("DOMContentLoaded", () => {
    fetch('db/productos.json') 
    .then(response => response.json())
    .then(productos => {
        generarCardsProductos(productos);
    })
    .catch(error => console.error('Error al cargar los productos:', error));
});

const generarCardsProductos = (productos) => {
    const divProductos = document.getElementById("productos");
    divProductos.innerHTML = "";

    let row = document.createElement("div");
    row.className = "row";

    productos.forEach((producto) => {
        const { imagen, nombre, categoria, precio, id } = producto;

        let card = document.createElement("div");
        card.className = "card col-xl-3 col-md-6 col-sm-12";
        card.innerHTML = `
            <img class="card-img-top" src="${imagen}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">Categoria: ${categoria}</p>
                <p class="card-text">Precio: <b>$${precio}</b></p>
                <button id="btn${id}" class="btn btn-primary">Comprar</button>
            </div>`;

        row.appendChild(card);
    });

    divProductos.appendChild(row);

    productos.forEach((producto) => {
        const { id } = producto;
        const btnComprar = document.getElementById(`btn${id}`);
        btnComprar.addEventListener("click", () => {
            Swal.fire({
                title: "¡Buen trabajo!",
                text: "Elemento añadido al carrito",
                icon: "success"
            });

            agregarAlCarrito(producto);
        });
    });
};

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



