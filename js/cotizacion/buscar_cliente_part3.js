// ========================================
// ESTADO GLOBAL - PRODUCTOS SELECCIONADOS
// ========================================
var productosSeleccionados = {}; // Objeto con índices numéricos: {0: {...}, 1: {...}}
let idsProductosAgregados = []; // Array para rastrear IDs únicos y evitar duplicados
let contadorProductos = 0; // Contador para índices numéricos
let productoEnEdicion = null; // Producto seleccionado para modificar

// ========================================
// ELEMENTOS DEL DOM - PASO 3
// ========================================
const btnDetallado = document.getElementById("btn-detallado");
const btnModificar = document.getElementById("btn-modificar");
// const btnPromociones = document.getElementById("btn-promociones");
const cantidadProductos = document.getElementById("cantidad-productos");

// MODAL DETALLADO
const modalDetallado = document.getElementById("modal-detallado");
const listaDetallado = document.getElementById("lista-detallado");
const btnCerrarDetallado = document.getElementById("btn-cerrar-detallado");
const btnOkDetallado = document.getElementById("btn-ok-detallado");
const btnConformidad = document.getElementById("btn-conformidad");
const totalSinIgv = document.getElementById("total-sin-igv");
const totalConIgv = document.getElementById("total-con-igv");
const modalBackdropDetallado = document.getElementById("modal-backdrop-detallado");

// MODAL MODIFICAR
const modalModificar = document.getElementById("modal-modificar");
const listaProductosModificar = document.getElementById("lista-productos-modificar");
const btnCerrarModificar = document.getElementById("btn-cerrar-modificar");
const btnCancelarModificar = document.getElementById("btn-cancelar-modificar");
const modalBackdropModificar = document.getElementById("modal-backdrop-modificar");

// MODAL EDITAR PRODUCTO
const modalEditarProducto = document.getElementById("modal-editar-producto");
const editProductoNombre = document.getElementById("edit-producto-nombre");
const editCantidad = document.getElementById("edit-cantidad");
const editDescuento = document.getElementById("edit-descuento");
const editValorVenta = document.getElementById("edit-valor-venta");
const errorEditCantidad = document.getElementById("error-edit-cantidad");
const errorEditDescuento = document.getElementById("error-edit-descuento");
const btnGuardarCambios = document.getElementById("btn-guardar-cambios");
const btnCancelarEdicion = document.getElementById("btn-cancelar-edicion");
const modalBackdropEditar = document.getElementById("modal-backdrop-editar");

// VARIABLES DE CONTROL
// const tipoCambioUSDPEN = 3.80;let indiceProductoEnEdicion = null; // Índice numérico del producto siendo editado
// ========================================
// FUNCIÓN: Obtener moneda seleccionada
// ========================================
function obtenerMonedaSeleccionada() {
    const selectMoneda = document.getElementById("alm");
    return selectMoneda ? selectMoneda.value : "D";
}

function obtenerSímboloMoneda(monedaId) {
    return monedaId === "D" ? "USD" : "PEN";
}

// ========================================
// FUNCIÓN: Convertir moneda
// ========================================
function convertirMoneda(monto, monedaOrigen) {
    const monedaActual = obtenerMonedaSeleccionada();
    
    if (monedaOrigen === monedaActual) {
        return monto;
    }
    
    if (monedaOrigen === "D" && monedaActual === "S") {
        return monto * tipoCambioUSDPEN;
    }
    
    if (monedaOrigen === "S" && monedaActual === "D") {
        return monto / tipoCambioUSDPEN;
    }
    
    return monto;
}

// ========================================
// FUNCIÓN: Agregar producto (con validación de duplicados por ID)
// ========================================
function agregarProductoSeleccionado(producto, cantidad, descuento) {
    // Validar si el producto ya existe por ID
    if (idsProductosAgregados.includes(producto.id)) {
        console.warn(`Producto con ID ${producto.id} ya existe en la lista. Se ignorará.`);
        return false;
    }

    // Guardar el producto seleccionado con índice numérico
    productosSeleccionados[contadorProductos] = {
        codigo: producto.id,
        descripcion: producto.descripcion,
        cantidad: cantidad,
        descuento: descuento,
        precioUnitario: producto.precioUnitario,
        descuentoMaximo: producto.descuentoMaximo || 6,
        preciosinIGV: producto.total,
        stock1: producto.stock1,
        stock2: producto.stock2
    };

    // Rastrear ID para evitar duplicados
    idsProductosAgregados.push(producto.id);
    contadorProductos++;

    // Actualizar UI
    actualizarResumenProductos();
    return true;
}

// ========================================
// FUNCIÓN: Actualizar resumen de productos
// ========================================
function actualizarResumenProductos() {
    const cantidad = Object.keys(productosSeleccionados).length;
    cantidadProductos.textContent = `${cantidad} producto${cantidad !== 1 ? 's' : ''}`;
}

// ========================================
// FUNCIÓN: Calcular valor de venta de un producto
// ========================================
function calcularValorVentaProducto(precioUnitario, cantidad, descuento) {
    const valorSinDescuento = precioUnitario * cantidad;
    const montoDescuento = valorSinDescuento * (descuento / 100);
    const valorFinal = valorSinDescuento - montoDescuento;
    return valorFinal;
}

// ========================================
// FUNCIÓN: Mostrar modal Detallado
// ========================================
function abrirModalDetallado() {
    listaDetallado.innerHTML = "";
    let totalSinIgvValue = 0;

    Object.values(productosSeleccionados).forEach((producto) => {
        const monedaActual = obtenerMonedaSeleccionada();
        const monedaSymbol = obtenerSímboloMoneda(monedaActual);
        
        // Convertir precio a la moneda actual
        const precioConvertido = convertirMoneda(producto.precioUnitario, "D");
        
        // Calcular valor de venta
        const valorVenta = calcularValorVentaProducto(precioConvertido, producto.cantidad, producto.descuento);
        totalSinIgvValue += valorVenta;

        const item = document.createElement("div");
        item.className = "p-4 bg-gray-50 rounded-lg border border-gray-200";
        
        const nombre = document.createElement("p");
        nombre.className = "font-semibold text-gray-900 text-sm mb-2";
        nombre.textContent = producto.descripcion;
        
        const detalles = document.createElement("div");
        detalles.className = "grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3";
        
        const detalleCodigo = document.createElement("p");
        detalleCodigo.innerHTML = `<span class="font-medium">Código:</span> ${producto.codigo}`;
        
        const detalleCantidad = document.createElement("p");
        detalleCantidad.innerHTML = `<span class="font-medium">Cantidad:</span> ${producto.cantidad}`;
        
        const detalleDescuento = document.createElement("p");
        detalleDescuento.innerHTML = `<span class="font-medium">Descuento:</span> ${producto.descuento.toFixed(2)}%`;
        
        const detallePrecio = document.createElement("p");
        detallePrecio.innerHTML = `<span class="font-medium">Precio Unit.:</span> ${monedaSymbol} ${precioConvertido.toFixed(2)}`;
        
        detalles.appendChild(detalleCodigo);
        detalles.appendChild(detalleCantidad);
        detalles.appendChild(detalleDescuento);
        detalles.appendChild(detallePrecio);
        
        const valorVentaDiv = document.createElement("div");
        valorVentaDiv.className = "p-2 bg-green-50 rounded-lg border border-green-200";
        
        const valorVentaLabel = document.createElement("p");
        valorVentaLabel.className = "text-xs text-gray-600 mb-1";
        valorVentaLabel.textContent = "Valor de Venta";
        
        const valorVentaValue = document.createElement("p");
        valorVentaValue.className = "text-lg font-bold text-green-600";
        valorVentaValue.innerHTML = `${monedaSymbol} ${valorVenta.toFixed(2)}`;
        
        valorVentaDiv.appendChild(valorVentaLabel);
        valorVentaDiv.appendChild(valorVentaValue);
        
        item.appendChild(nombre);
        item.appendChild(detalles);
        item.appendChild(valorVentaDiv);
        
        listaDetallado.appendChild(item);
    });

    // Actualizar totales
    const totalConIgvValue = totalSinIgvValue * 1.18;
    totalSinIgv.textContent = totalSinIgvValue.toFixed(2);
    totalConIgv.textContent = totalConIgvValue.toFixed(2);

    // Mostrar modal
    modalDetallado.classList.remove("hidden");
    document.body.classList.add("modal-abierto");
}

function cerrarModalDetallado() {
    modalDetallado.classList.add("hidden");
    document.body.classList.remove("modal-abierto");
}

btnDetallado.addEventListener("click", abrirModalDetallado);
btnCerrarDetallado.addEventListener("click", cerrarModalDetallado);
btnOkDetallado.addEventListener("click", cerrarModalDetallado);
modalBackdropDetallado.addEventListener("click", cerrarModalDetallado);

// Botón Conformidad (sin funcionalidad por ahora)
btnConformidad.addEventListener("click", () => {
    console.log("Conformidad seleccionada", productosSeleccionados);
});

// ========================================
// FUNCIÓN: Mostrar modal Modificar
// ========================================
function abrirModalModificar() {
    listaProductosModificar.innerHTML = "";

    Object.entries(productosSeleccionados).forEach(([indice, producto]) => {
        const item = document.createElement("div");
        item.className = "p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer transition-colors hover:bg-gray-100 active:bg-gray-200";
        
        const nombre = document.createElement("p");
        nombre.className = "font-semibold text-gray-900 text-sm mb-2";
        nombre.textContent = producto.descripcion;
        
        const info = document.createElement("p");
        info.className = "text-xs text-gray-600";
        info.innerHTML = `<span class="font-medium">Cant:</span> ${producto.cantidad} | <span class="font-medium">Desc:</span> ${producto.descuento.toFixed(2)}%`;
        
        item.appendChild(nombre);
        item.appendChild(info);
        
        // Al hacer click, abrir modal de edición
        item.addEventListener("click", () => {
            abrirModalEditarProducto(indice, producto);
        });
        
        listaProductosModificar.appendChild(item);
    });

    modalModificar.classList.remove("hidden");
    document.body.classList.add("modal-abierto");
}

function cerrarModalModificar() {
    modalModificar.classList.add("hidden");
    document.body.classList.remove("modal-abierto");
}

btnModificar.addEventListener("click", abrirModalModificar);
btnCerrarModificar.addEventListener("click", cerrarModalModificar);
btnCancelarModificar.addEventListener("click", cerrarModalModificar);
modalBackdropModificar.addEventListener("click", cerrarModalModificar);

// ========================================
// FUNCIÓN: Abrir modal de edición de producto
// ========================================
function abrirModalEditarProducto(indice, producto) {
    indiceProductoEnEdicion = indice;
    productoEnEdicion = producto;
    
    editProductoNombre.textContent = producto.descripcion;
    editCantidad.value = producto.cantidad;
    editDescuento.value = producto.descuento.toFixed(2);
    
    // Limpiar errores
    errorEditCantidad.classList.add("hidden");
    errorEditDescuento.classList.add("hidden");
    
    // Calcular valor de venta inicial
    recalcularValorVentaEdicion();
    
    // Mostrar modal
    modalEditarProducto.classList.remove("hidden");
    document.body.classList.add("modal-abierto");
    editCantidad.focus();
}

function cerrarModalEditarProducto() {
    modalEditarProducto.classList.add("hidden");
    document.body.classList.remove("modal-abierto");
    productoEnEdicion = null;
    indiceProductoEnEdicion = null;
}

function recalcularValorVentaEdicion() {
    if (!productoEnEdicion) return;
    
    const cantidad = parseInt(editCantidad.value) || 0;
    const descuento = parseFloat(editDescuento.value) || 0;
    const precioConvertido = convertirMoneda(productoEnEdicion.precioUnitario, "D");
    
    const valorVenta = calcularValorVentaProducto(precioConvertido, cantidad, descuento);
    editValorVenta.textContent = valorVenta.toFixed(2);
    // Guardando el valor del monto total con descuento cuando se modifica la cantidad o el descuento
    productoEnEdicion.total = valorVenta.toFixed(2);
}

editCantidad.addEventListener("input", (ev) => {
    const valor = parseInt(ev.target.value);
    
    // Validar que sea un número entero
    if (isNaN(valor) || !Number.isInteger(parseFloat(ev.target.value))) {
        errorEditCantidad.textContent = "La cantidad debe ser un número entero";
        errorEditCantidad.classList.remove("hidden");
        return;
    }
    
    // Validar rango 1-500
    if (valor < 1) {
        errorEditCantidad.textContent = "La cantidad mínima es 1";
        errorEditCantidad.classList.remove("hidden");
        ev.target.value = "1";
        recalcularValorVentaEdicion();
        return;
    }
    
    if (valor > 500) {
        errorEditCantidad.textContent = "La cantidad máxima es 500";
        errorEditCantidad.classList.remove("hidden");
        ev.target.value = "500";
        recalcularValorVentaEdicion();
        return;
    }
    
    errorEditCantidad.classList.add("hidden");
    recalcularValorVentaEdicion();
});

editDescuento.addEventListener("blur", (ev) => {
    let valor = ev.target.value.trim();
    
    if (valor === "") {
        editDescuento.value = "0.00";
        errorEditDescuento.classList.add("hidden");
        recalcularValorVentaEdicion();
        return;
    }
    
    const numeroValor = parseFloat(valor);
    const descuentoMax = productoEnEdicion ? (productoEnEdicion.descuentoMaximo || 6) : 1;
    
    // Validar que sea un número válido
    if (isNaN(numeroValor)) {
        errorEditDescuento.textContent = "Ingrese un número válido";
        errorEditDescuento.classList.remove("hidden");
        return;
    }
    
    // Validar rango
    if (numeroValor < 0) {
        errorEditDescuento.textContent = "El descuento no puede ser negativo";
        errorEditDescuento.classList.remove("hidden");
        return;
    }
    
    if (numeroValor > descuentoMax) {
        errorEditDescuento.textContent = `El descuento máximo es ${descuentoMax.toFixed(2)}%`;
        errorEditDescuento.classList.remove("hidden");
        return;
    }
    
    editDescuento.value = numeroValor.toFixed(2);
    errorEditDescuento.classList.add("hidden");
    recalcularValorVentaEdicion();
});

// Recalcular en tiempo real mientras se escribe descuento
editDescuento.addEventListener("input", () => {
    recalcularValorVentaEdicion();
});

btnGuardarCambios.addEventListener("click", () => {
    // Validar
    errorEditCantidad.classList.add("hidden");
    errorEditDescuento.classList.add("hidden");
    
    const cantidadStr = editCantidad.value.trim();
    const descuentoStr = editDescuento.value.trim();
    
    let tieneError = false;
    
    // Validar cantidad
    const cantidad = parseInt(cantidadStr);
    if (isNaN(cantidad) || cantidadStr === "") {
        errorEditCantidad.textContent = "Cantidad es requerida";
        errorEditCantidad.classList.remove("hidden");
        tieneError = true;
    } else if (cantidad < 1 || cantidad > 500) {
        errorEditCantidad.textContent = "La cantidad debe estar entre 1 y 500";
        errorEditCantidad.classList.remove("hidden");
        tieneError = true;
    }
    
    // Validar descuento
    let descuento = 0;
    if (descuentoStr !== "") {
        descuento = parseFloat(descuentoStr);
        if (isNaN(descuento)) {
            errorEditDescuento.textContent = "Descuento inválido";
            errorEditDescuento.classList.remove("hidden");
            tieneError = true;
        } else if (descuento < 0) {
            errorEditDescuento.textContent = "El descuento no puede ser negativo";
            errorEditDescuento.classList.remove("hidden");
            tieneError = true;
        }
    }
    
    if (tieneError) return;
    
    // Guardar cambios usando el índice numérico
    if (indiceProductoEnEdicion !== null && productosSeleccionados[indiceProductoEnEdicion]) {
        productosSeleccionados[indiceProductoEnEdicion].cantidad = cantidad;
        productosSeleccionados[indiceProductoEnEdicion].descuento = descuento;
    }
    
    // Cerrar modales
    cerrarModalEditarProducto();
    cerrarModalModificar();
    
    // Actualizar resumen
    actualizarResumenProductos();
});

btnCancelarEdicion.addEventListener("click", cerrarModalEditarProducto);
modalBackdropEditar.addEventListener("click", cerrarModalEditarProducto);

// ========================================
// BOTÓN PROMOCIONES - Conectado a buscar_promo_part4.js
// ========================================
// El evento está manejado en buscar_promo_part4.js
// No agregar evento aquí para evitar conflictos

// ========================================
// INTEGRACIÓN CON BÚSQUEDA DE PRODUCTOS
// ========================================
// Interceptar la función agregarProductoAlCarrito original
const agregarProductoAlCarritoOriginal = window.agregarProductoAlCarrito || (() => {});

window.agregarProductoAlCarrito = function(producto, cantidad, descuento) {
    // Intentar agregar al nuevo sistema de Segmento 3
    const agregado = agregarProductoSeleccionado(producto, cantidad, descuento);
    
    if (agregado) {
        console.log("Producto agregado a Segmento 3:", producto);
    }
    
    // Ejecutar función original si existe
    if (typeof agregarProductoAlCarritoOriginal === "function") {
        agregarProductoAlCarritoOriginal(producto, cantidad, descuento);
    }
};

// Inicializar
actualizarResumenProductos();

// ========================================
// FUNCIÓN: Reiniciar estado
// ========================================
function reiniciarSegmento3() {
    productosSeleccionados = {};
    idsProductosAgregados = [];
    contadorProductos = 0;
    productoEnEdicion = null;
    indiceProductoEnEdicion = null;
    actualizarResumenProductos();
}
