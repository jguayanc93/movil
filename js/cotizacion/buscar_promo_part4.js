// ========================================
// PROMOCIONES - SEGMENTO 3 - PARTE 4
// ========================================

// ESTADO GLOBAL
let promocionesExitosas = []; // Almacena promociones que se cargaron correctamente
let promocionesAplicadas = []; // Promociones seleccionadas para aplicar

// ========================================
// ELEMENTOS DEL DOM - MODAL PROMOCIONES
// ========================================
const btnPromociones = document.getElementById("btn-promociones");
const modalPromociones = document.getElementById("modal-promociones");
const listaPromociones = document.getElementById("lista-promociones");
const btnCerrarPromociones = document.getElementById("btn-cerrar-promociones");
const btnCancelarPromo = document.getElementById("btn-cancelar-promo");
const btnAplicarPromo = document.getElementById("btn-aplicar-promo");
const modalBackdropPromociones = document.getElementById("modal-backdrop-promociones");
const promosLoading = document.getElementById("promos-loading");
const sinPromociones = document.getElementById("sin-promociones");
const contadorPromos = document.getElementById("contador-promos");
const promosTotal = document.getElementById("promos-totales-container");

// Elementos de totales
const promoValorVenta = document.getElementById("promo-valor-venta");
const promoMontDescuento = document.getElementById("promo-monto-descuento");
const promoTotalDescuento = document.getElementById("promo-total-descuento");
const promoTotalConIgv = document.getElementById("promo-total-con-igv");
const promoAhorroTotal = document.getElementById("promo-ahorro-total");
const promoMonedasSpan = [
    document.getElementById("promo-moneda-venta"),
    document.getElementById("promo-moneda-descuento"),
    document.getElementById("promo-moneda-igv"),
    document.getElementById("promo-moneda-ahorro")
];

// ========================================
// CONFIGURACIÓN
// ========================================
// const tipoCambioUSDPEN = 3.80;

// ========================================
// FUNCIÓN: Obtener moneda y conversión
// ========================================
function obtenerMonedaSeleccionada() {
    const selectMoneda = document.getElementById("alm");
    return selectMoneda ? selectMoneda.value : "D";
}

function obtenerSímboloMoneda(monedaId) {
    return monedaId === "D" ? "USD" : "PEN";
}

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
// FUNCIÓN: Abrir modal de promociones
// ========================================
function abrirModalPromociones() {
    // Resetear estado
    promocionesExitosas = [];
    promocionesAplicadas = [];
    listaPromociones.innerHTML = "";
    promosLoading.classList.remove("hidden");
    sinPromociones.classList.add("hidden");
    promosTotal.classList.add("hidden");
    
    // Mostrar modal
    modalPromociones.classList.remove("hidden");
    document.body.classList.add("modal-abierto");
    
    // Obtener códigos de promociones
    obtenerCodigosPromociones();
}

function cerrarModalPromociones() {
    modalPromociones.classList.add("hidden");
    document.body.classList.remove("modal-abierto");
    promocionesExitosas = [];
    promocionesAplicadas = [];
}

btnPromociones.addEventListener("click", abrirModalPromociones);
btnCerrarPromociones.addEventListener("click", cerrarModalPromociones);
btnCancelarPromo.addEventListener("click", cerrarModalPromociones);
modalBackdropPromociones.addEventListener("click", cerrarModalPromociones);

// ========================================
// FUNCIÓN: Obtener códigos de promociones
// ========================================
async function obtenerCodigosPromociones() {
    try {
        console.log("entre en la funcion de obtener codigos de promociones");
        // Validar que tenemos productos seleccionados
        if (!window.productosSeleccionados || Object.keys(window.productosSeleccionados).length === 0) {
            console.log("NO supere la validacion de que si tengo items seleccionados");
            console.log("esto tenia en el listado chekear");
            console.log(window.productosSeleccionados)
            mostrarSinPromociones();
            return;
        }
        console.log("supere la validacion de que si tengo items seleccionados");

        // Preparar datos para enviar al backend
        let dataenviar = new Object();
        dataenviar.productos = window.productosSeleccionados;

        console.log("revisar los productos",window.productosSeleccionados);
        
        let fetchobj = new Object();
        fetchobj.method = "POST";
        fetchobj.headers = { "Content-Type": "application/json" };
        fetchobj.mode = "cors";
        fetchobj.credentials = "include";
        fetchobj.body = JSON.stringify(dataenviar);

        // Llamar API para obtener códigos de promos
        let paso1 = await fetch(rutapromocionrecolector, fetchobj);
        let paso2 = await paso1.json();
        // console.log("en caso funcione hasta aqui",paso2);
        // let codigosPromos = await JSON.parse(paso2);

        // Verificar si hay promociones disponibles
        // if (!codigosPromos || Object.keys(codigosPromos).length === 0) {
        //     mostrarSinPromociones();
        //     return;
        // }
        if (!Array.isArray(paso2)) {
            mostrarSinPromociones();
            return;
        }

        // Obtener detalles de cada promoción
        // await obtenerDetallesPromociones(codigosPromos);
        await obtenerDetallesPromociones(paso2);

    } catch (err) {
        console.error("Error al obtener códigos de promociones:", err);
        mostrarSinPromociones();
    }
}

// ========================================
// FUNCIÓN: Obtener detalles de cada promoción
// ========================================
async function obtenerDetallesPromociones(codigosPromos) {
    promosLoading.classList.remove("hidden");
    listaPromociones.innerHTML = "";
    
    const codigosArray = Array.isArray(codigosPromos) ? codigosPromos : Object.values(codigosPromos);
    
    // Actualizar contador
    contadorPromos.textContent = `Se encontraron ${codigosArray.length} promoción${codigosArray.length !== 1 ? 'es' : ''}`;

    let promesasDetalles = codigosArray.map(codigo => obtenerDetallePromo(codigo));
    let resultados = await Promise.allSettled(promesasDetalles);

    // Procesar resultados
    let promoExitosaCount = 0;
    resultados.forEach((resultado, index) => {
        if (resultado.status === "fulfilled" && resultado.value) {
            promocionesExitosas.push(resultado.value);
            mostrarPromoEnLista(resultado.value, index);
            promoExitosaCount++;
        }
    });

    // Si no hay promociones exitosas, mostrar mensaje
    if (promoExitosaCount === 0) {
        promosLoading.classList.add("hidden");
        listaPromociones.innerHTML = "";
        sinPromociones.classList.remove("hidden");
        return;
    }

    // Mostrar totales y ocultar loading
    promosLoading.classList.add("hidden");
    promosTotal.classList.remove("hidden");
    calcularTotalesPromociones();
}

// ========================================
// FUNCIÓN: Obtener detalle de una promoción
// ========================================
async function obtenerDetallePromo(codigoPromo) {
    try {
        let dataenviar = new Object();
        dataenviar.codigo = codigoPromo;
        dataenviar.productos = window.productosSeleccionados;
        
        let fetchobj = new Object();
        fetchobj.method = "POST";
        fetchobj.headers = { "Content-Type": "application/json" };
        fetchobj.mode = "cors";
        fetchobj.credentials = "include";
        fetchobj.body = JSON.stringify(dataenviar);

        let paso1 = await fetch(rutapromodetalles, fetchobj);
        let paso2 = await paso1.json();
        console.log("revisa lo que trae el detallado por bucle",paso2);
        let detallePromo = await JSON.parse(paso2);

        // Retornar null si la respuesta indica error o no cumple requisitos
        if (!detallePromo || detallePromo.error || !detallePromo.codigo) {
            return null;
        }

        return {
            codigo: detallePromo.codigo || codigoPromo,
            descripcion: detallePromo.descripcion || "Promoción disponible",
            cantidad: detallePromo.cantidad || 0,
            montoDescuento: parseFloat(detallePromo.montoDescuento || 0),
            monedaDescuento: detallePromo.monedaDescuento || "D"
        };

    } catch (err) {
        console.warn(`No se pudo obtener detalle de promoción ${codigoPromo}:`, err);
        return null;
    }
}

// ========================================
// FUNCIÓN: Mostrar promoción en lista
// ========================================
function mostrarPromoEnLista(promo, index) {
    const monedaActual = obtenerMonedaSeleccionada();
    const monedaSymbol = obtenerSímboloMoneda(monedaActual);
    
    // Convertir monto de descuento a moneda actual
    const montoDescuentoConvertido = convertirMoneda(promo.montoDescuento, promo.monedaDescuento);

    const item = document.createElement("div");
    item.className = "p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200";
    
    // Título
    const titulo = document.createElement("h4");
    titulo.className = "font-semibold text-gray-900 text-sm mb-2";
    titulo.innerHTML = `<i class="fas fa-tag text-purple-600 mr-2"></i>${promo.descripcion}`;
    
    // Detalles
    const detalles = document.createElement("div");
    detalles.className = "grid grid-cols-2 gap-2 mb-3 text-xs text-gray-600";
    
    const detalleCodigo = document.createElement("p");
    detalleCodigo.innerHTML = `<span class="font-medium">Código:</span> ${promo.codigo}`;
    
    const detalleCantidad = document.createElement("p");
    detalleCantidad.innerHTML = `<span class="font-medium">Cantidad:</span> ${promo.cantidad}`;
    
    detalles.appendChild(detalleCodigo);
    detalles.appendChild(detalleCantidad);
    
    // Descuento
    const descuentoDiv = document.createElement("div");
    descuentoDiv.className = "p-2 bg-red-50 rounded-lg border border-red-200";
    descuentoDiv.innerHTML = `
        <p class="text-xs text-gray-600 mb-1">Descuento en Monto</p>
        <p class="text-sm font-bold text-red-600">-${montoDescuentoConvertido.toFixed(2)} ${monedaSymbol}</p>
    `;
    
    item.appendChild(titulo);
    item.appendChild(detalles);
    item.appendChild(descuentoDiv);
    
    listaPromociones.appendChild(item);
}

// ========================================
// FUNCIÓN: Mostrar "Sin promociones"
// ========================================
function mostrarSinPromociones() {
    promosLoading.classList.add("hidden");
    listaPromociones.innerHTML = "";
    sinPromociones.classList.remove("hidden");
    promosTotal.classList.add("hidden");
    contadorPromos.textContent = "";
}

// ========================================
// FUNCIÓN: Calcular totales de promociones
// ========================================
function calcularTotalesPromociones() {
    if (promocionesExitosas.length === 0) return;

    const monedaActual = obtenerMonedaSeleccionada();
    const monedaSymbol = obtenerSímboloMoneda(monedaActual);

    // Calcular valor de venta actual de productos seleccionados
    let valorVentaTotal = 0;
    Object.values(window.productosSeleccionados).forEach((producto) => {
        const precioConvertido = convertirMoneda(producto.precioUnitario, "D");
        const valorVenta = (precioConvertido * producto.cantidad) - 
                          ((precioConvertido * producto.cantidad) * (producto.descuento / 100));
        valorVentaTotal += valorVenta;
    });

    // Calcular descuento total de todas las promociones
    let descuentoTotalPromo = 0;
    promocionesExitosas.forEach((promo) => {
        const montoConvertido = convertirMoneda(promo.montoDescuento, promo.monedaDescuento);
        descuentoTotalPromo += montoConvertido;
    });

    // Calcular total con descuento
    const totalConDescuento = valorVentaTotal - descuentoTotalPromo;
    
    // Calcular con IGV
    const totalConIgv = totalConDescuento * 1.18;
    const ahorroConIgv = descuentoTotalPromo * 1.18;

    // Actualizar UI
    promoValorVenta.textContent = valorVentaTotal.toFixed(2);
    promoMontDescuento.textContent = descuentoTotalPromo.toFixed(2);
    promoTotalDescuento.textContent = totalConDescuento.toFixed(2);
    promoTotalConIgv.textContent = totalConIgv.toFixed(2);
    promoAhorroTotal.textContent = ahorroConIgv.toFixed(2);

    // Actualizar monedas
    promoMonedasSpan.forEach(span => {
        span.textContent = monedaSymbol;
    });
}

// ========================================
// FUNCIÓN: Aplicar promociones
// ========================================
btnAplicarPromo.addEventListener("click", () => {
    if (promocionesExitosas.length === 0) {
        alert("No hay promociones para aplicar");
        return;
    }

    // Guardar promociones aplicadas
    promocionesAplicadas = [...promocionesExitosas];

    // Log para verificar
    console.log("Promociones aplicadas:", promocionesAplicadas);

    // Aquí se puede hacer más (enviar al backend, actualizar UI, etc.)
    // Por ahora solo notificamos y cerramos
    alert(`¡${promocionesAplicadas.length} promoción${promocionesAplicadas.length !== 1 ? 'es' : ''} aplicada${promocionesAplicadas.length !== 1 ? 's' : ''}!`);
    
    // Cerrar modal
    cerrarModalPromociones();

    // Actualizar UI si es necesario
    // updatearUI();
});

// ========================================
// RECALCULAR CUANDO CAMBIA MONEDA
// ========================================
const selectMoneda = document.getElementById("alm");
if (selectMoneda) {
    selectMoneda.addEventListener("change", () => {
        // Si el modal de promociones está visible y hay promociones, recalcular
        if (!modalPromociones.classList.contains("hidden") && promocionesExitosas.length > 0) {
            listaPromociones.innerHTML = "";
            promocionesExitosas.forEach((promo, index) => {
                mostrarPromoEnLista(promo, index);
            });
            calcularTotalesPromociones();
        }
    });
}
