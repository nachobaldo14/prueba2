"use strict";

const arrayProductos = ["Fideos Tirabuzón Matarazzo", "Arroz Lucchetti 1kg", "Galletitas Rumba", "Coca Cola 2.25L", "Levite 1.5L", "Limpiador líquido Fabuloso 1L", "Hamburguesas Paty express 4u.", "Aceite de girasol Natura 900 cc.", "Yogurt Ilolay de frutilla 900 g.", "Harina Pureza 0000 1 kg."];
const arrayPrecios = [1400, 2100, 700, 2800, 1370, 2300, 3400, 1700, 1950, 1100];
const arrayCantidad = [17, 19, 11, 9, 10, 15, 5, 15, 20, 12];
const arrayImagenes = [
    "./imagenes/fideosTirabuzonesMatarazzo.webp",
    "./imagenes/arrozLucchetti.jpeg",
    "./imagenes/galletitaRumba.jpg",
    "./imagenes/cocaCola.jpeg",
    "./imagenes/levite.jpeg",
    "./imagenes/limpiadorLiquidoFabuloso.webp",
    "./imagenes/hamburguesaPaty.webp",
    "./imagenes/aceiteNatura.webp",
    "./imagenes/yogurtIlolay.webp",
    "./imagenes/harinaPureza.webp"
];

pintarProductos();

function pintarProductos() {
    let contenedor = document.getElementById("contenedorProductos");   //asignas contenedor como el div contenedorProductos
    contenedor.innerHTML = "";

    arrayProductos.forEach((producto, i) => {               //para cada producto del arrayProductos
        let card = document.createElement("div");           //creas card como un div
        card.classList.add("card");                         //le añadis al card la clase card

        let html = '<img src="' + arrayImagenes[i] + '" alt="' + producto + '" height="150px" width="100%">' + 
            '<p>' + producto + ' $<span class="price">' + arrayPrecios[i] + '</span></p>' +
            '<input type="number" min="0" value="0">' +                                         //replica de lo que teniamos antes en el HTML
            '<button type="button">Agregar al carrito</button>' +
            '<p id="errorMensaje' + i + '" class="mensajeError">No disponemos stock suficiente.</p>';

        card.innerHTML = html;       //al div creado llamado card le guardamos el valor de html

        contenedor.appendChild(card);      //agregas el div creado(card) a contenedor(contenedorProductos)
    });
}

let cantidadBotones = document.querySelectorAll("div div button");

for (let i = 0; i < cantidadBotones.length; i++) {
    cantidadBotones[i].addEventListener("click", () => {
        let cantidad = document.querySelectorAll("input")[i].value; //asignamos la cantidad en el valor i del input/boton
        if (cantidad > 0 && arrayCantidad[i] - cantidad >= 0) {
            agregarCarrito(i, cantidad);
            arrayCantidad[i] = arrayCantidad[i] - cantidad          //restas la cantidad y se sigue guardando en el mismo array
            ocultarMensajeError(i);
        } else if (cantidad > arrayCantidad[i]) {
            mostrarMensajeError(i)
        }
    });
}

function agregarCarrito(i, cantidad) {
    let subtotal = cantidad * arrayPrecios[i];
    let totalActual = + document.getElementById("total").innerText;  //=+ para que sea tipo numerico
    document.getElementById("total").innerText = totalActual + subtotal;
}

function mostrarMensajeError(i) {
    let elemento = document.getElementById("errorMensaje" + i);     //con esto simulamos que tenemos los ID "errorMensaje0-1-2" etc     
    elemento.classList.add("mostrarMensaje");
}

function ocultarMensajeError(i) {
    let elemento = document.getElementById("errorMensaje" + i);
    elemento.classList.remove("mostrarMensaje");
}


let botonCompraExitosa = document.getElementById("botonCompraExitosa");
let total = document.getElementById("total");

botonCompraExitosa.addEventListener("click", () => {
    if (parseFloat(total.innerText) > 0)
        mostrarMensajeCompraExitosa();
})

function mostrarMensajeCompraExitosa() {
    let elemento = document.querySelector(".mensajeCompraExitosa");
    elemento.classList.add("mostrarMensaje");
}