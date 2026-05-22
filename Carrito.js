// ==========================
// TRANSICIÓN ENTRE PÁGINAS
// ==========================

function cambiarPagina(url) {

    const transicion =
        document.getElementById("transicion");

    transicion.classList.add("activo");

    setTimeout(() => {

        window.location.href = url;

    }, 1200); // duración del gif

}


// ===============================
// CARRITO DE COMPRAS
// ===============================

// Declaramos el carrito vacío
let carrito = [];

// ===============================
// FORMATEAR PRECIOS EN PESOS COLOMBIANOS
// ===============================
const formatearCOP = (valor) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(valor);
};

// ===============================
// CUANDO CARGA LA PÁGINA
// ===============================
document.addEventListener('DOMContentLoaded', () => {

    // Buscar todos los botones del carrito
    const botonesAñadir = document.querySelectorAll('.add-to-cart-btn');

    // Escuchar clicks
    botonesAñadir.forEach(boton => {

        boton.addEventListener('click', function () {

            // Obtener información del producto
            const nombre = this.getAttribute('data-name');

            const precio = parseFloat(
                this.getAttribute('data-price')
            );

            // Agregar producto
            agregarItem(nombre, precio);

        });

    });

    // Pintar carrito vacío al iniciar
    actualizarUI();

});

// ===============================
// AGREGAR PRODUCTOS
// ===============================
function agregarItem(nombre, precio) {

    // Buscar si ya existe
    const index = carrito.findIndex(
        item => item.nombre === nombre
    );

    if (index !== -1) {

        // Si existe aumenta cantidad
        carrito[index].cantidad += 1;

    } else {

        // Si no existe se agrega
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });

    }

    actualizarUI();
}

// ===============================
// MODIFICAR CANTIDAD
// ===============================
window.modificarCantidad = function(index, cambio) {

    carrito[index].cantidad += cambio;

    // Si llega a 0 se elimina
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    actualizarUI();
};

// ===============================
// ELIMINAR PRODUCTO
// ===============================
window.eliminarItem = function(index) {

    carrito.splice(index, 1);

    actualizarUI();
};

// ===============================
// ACTUALIZAR INTERFAZ
// ===============================
function actualizarUI() {

    const contenedor = document.getElementById('cart-items-container');

    const totalTexto = document.getElementById('cart-total');

    const contadorBoton = document.getElementById('cart-counter');

    // Limpiar carrito visual
    contenedor.innerHTML = '';

    let totalDinero = 0;

    let totalArticulos = 0;

    // ===============================
    // SI EL CARRITO ESTÁ VACÍO
    // ===============================
    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <p class="text-center text-muted mt-4">
                Tu carrito está vacío.
            </p>
        `;

    } else {

        // ===============================
        // RECORRER PRODUCTOS
        // ===============================
        carrito.forEach((producto, index) => {

            let subtotal =
                producto.precio * producto.cantidad;

            totalDinero += subtotal;

            totalArticulos += producto.cantidad;

            // Crear HTML del producto
            contenedor.innerHTML += `

                <div class="cart-item d-flex justify-content-between align-items-center mb-3 p-2 border rounded">

                    <div style="flex-grow:1;">

                        <p class="fw-bold m-0">
                            ${producto.nombre}
                        </p>

                        <small>
                            ${formatearCOP(producto.precio)} c/u
                        </small>

                    </div>

                    <div class="d-flex align-items-center gap-2">

                        <button 
                            class="btn btn-sm btn-danger"
                            onclick="window.modificarCantidad(${index}, -1)">
                            -
                        </button>

                        <span class="fw-bold">
                            ${producto.cantidad}
                        </span>

                        <button 
                            class="btn btn-sm btn-success"
                            onclick="window.modificarCantidad(${index}, 1)">
                            +
                        </button>

                    </div>

                    <div class="text-end ms-3">

                        <button 
                            class="btn btn-sm btn-outline-danger mb-1"
                            onclick="window.eliminarItem(${index})">
                            ✖
                        </button>

                        <div class="fw-bold">
                            ${formatearCOP(subtotal)}
                        </div>

                    </div>

                </div>

            `;

        });

    }

    // ===============================
    // ACTUALIZAR TOTALES
    // ===============================
    totalTexto.innerText =
        formatearCOP(totalDinero);

    contadorBoton.innerText =
        totalArticulos;
}

// ==========================
// TRANSICIÓN ENTRE PÁGINAS
// ==========================

function cambiarPagina(url) {

    const transicion =
        document.getElementById("transicion");

    if (transicion) {

        transicion.classList.add("activo");

        setTimeout(() => {

            window.location.href = url;

        }, 1200);

    } else {

        window.location.href = url;

    }

}

// ==========================
// CUANDO CARGA TODO
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    // BOTON PAGAR
    const btnPagar =
        document.getElementById("btnPagar");

    if (btnPagar) {

        btnPagar.addEventListener("click", () => {

            if (carrito.length === 0) {

                alert("Tu carrito está vacío");

                return;

            }

            cambiarPagina("pago.html");

        });

    }

    // BOTON UNIDAD
    const btnUnidad =
        document.getElementById("btnUnidad");

    if (btnUnidad) {

        btnUnidad.addEventListener("click", () => {

            cambiarPagina("productos.html");

        });

    }

    // BOTON PACAS
    const btnPacas =
        document.getElementById("btnPacas");

    if (btnPacas) {

        btnPacas.addEventListener("click", () => {

            cambiarPagina("producto pacas.html");

        });

    }

    // LOGO
    const logoInicio =
        document.getElementById("logoInicio");

    if (logoInicio) {

        logoInicio.addEventListener("click", () => {

            cambiarPagina("index.html");

        });

    }

        // ==========================
    // VOLVER AL INICIO
    // ==========================

    const volverInicio =
        document.getElementById("volverInicio");

    if (volverInicio) {

        volverInicio.addEventListener("click", () => {

            cambiarPagina("index.html");

        });

    }

});


