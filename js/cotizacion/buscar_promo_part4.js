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
const promoMontoIgv = document.getElementById("promo-monto-igv");
const promoTotalConIgv = document.getElementById("promo-total-con-igv");
const promoAhorroTotal = document.getElementById("promo-ahorro-total");
const promoMonedasSpan = [
    document.getElementById("promo-moneda-venta"),
    document.getElementById("promo-moneda-descuento"),
    document.getElementById("promo-moneda-total-descuento"),
    document.getElementById("promo-moneda-igv"),
    document.getElementById("promo-moneda-total-igv"),
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
        ////aqui hago un espacio para manejar el caso de que el monto sea NaN
        if (isNaN(monto)) {
            return 0;
        }
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

function parseJSONResponse(value) {
    if (typeof value === "string") {
        try {
            return JSON.parse(value);
        } catch (err) {
            console.warn("No se pudo parsear la respuesta JSON:", err);
            return null;
        }
    }
    return value;
}

function normalizarDetalleLinea(linea, promoDefaults = {}) {
    const tipoRaw = (linea.tipo || linea.tipoPromocion || linea.accion || linea.accionPromo || linea.modo || "").toString().toLowerCase();
    const esRegalo = tipoRaw.includes("regalo") || tipoRaw.includes("gift") || tipoRaw.includes("gratis") || tipoRaw.includes("obsequio") || parseFloat(linea.precioUnitario) === 0;
    const tipo = esRegalo ? "REGALO" : "DESCUENTO";
    const descripcion = linea.descripcion || linea.nombre || linea.producto || linea.articulo || linea.detalle || promoDefaults.descripcion || "";
    const codigo = linea.codigo || linea.promocion || linea.promoCodigo || promoDefaults.codigo || "";
    const cantidad = parseInt(linea.cantidad ?? linea.qty ?? 1, 10) || 1;
    const monto = parseFloat(linea.montoDescuento ?? linea.valorDescuento ?? linea.valor ?? linea.ahorro ?? 0) || 0;
    const moneda = linea.monedaDescuento || linea.moneda || linea.monedaVenta || "D";
    const precioUnitario = parseFloat(linea.precioUnitario ?? linea.precio ?? 0) || 0;

    return {
        tipo,
        codigo,
        descripcion,
        cantidad,
        monto,
        moneda,
        precioUnitario,
        raw: linea
    };
}

function normalizarPromoDetalle(response, codigoPromo) {
    const data = parseJSONResponse(response);
    if (!data) return null;

    if (Array.isArray(data)) {
        const lineas = data.map(item => normalizarDetalleLinea(item, { codigo: codigoPromo }));
        return {
            codigo: codigoPromo,
            descripcion: data[0]?.descripcion || data[0]?.nombre || "Promoción disponible",
            lineas: lineas.filter(linea => linea.descripcion || linea.monto || linea.precioUnitario)
        };
    }

    const lineasRaw = data.detalles || data.detalle || data.items || data.lineas || data.beneficios || data.promociones;
    if (Array.isArray(lineasRaw) && lineasRaw.length > 0) {
        const lineas = lineasRaw.map(item => normalizarDetalleLinea(item, { codigo: data.codigo || codigoPromo, descripcion: data.descripcion }));
        return {
            codigo: data.codigo || codigoPromo,
            descripcion: data.descripcion || lineas[0]?.descripcion || "Promoción disponible",
            lineas
        };
    }

    const singleLinea = normalizarDetalleLinea(data, { codigo: data.codigo || codigoPromo, descripcion: data.descripcion });
    return {
        codigo: data.codigo || codigoPromo,
        descripcion: data.descripcion || singleLinea.descripcion || "Promoción disponible",
        lineas: [singleLinea]
    };
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
            console.log(window.productosSeleccionados)
            mostrarSinPromociones();
            return;
        }
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
        let textoRespuesta = await paso1.text();
        const codigosPromos = parseJSONResponse(textoRespuesta);

        if (!Array.isArray(codigosPromos) || codigosPromos.length === 0) {
            mostrarSinPromociones();
            return;
        }

        await obtenerDetallesPromociones(codigosPromos);

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
    const promoCount = codigosArray.length;
    contadorPromos.textContent = `Se encontraron ${promoCount} promoción${promoCount !== 1 ? 'es' : ''}`;

    const promesasDetalles = codigosArray.map(codigo => obtenerDetallePromo(codigo));
    const resultados = await Promise.allSettled(promesasDetalles);

    let promoExitosaCount = 0;
    resultados.forEach((resultado) => {
        if (resultado.status === "fulfilled" && resultado.value && resultado.value.lineas?.length > 0) {
            promocionesExitosas.push(resultado.value);
            mostrarPromoEnLista(resultado.value);
            promoExitosaCount++;
        }
    });

    if (promoExitosaCount === 0) {
        promosLoading.classList.add("hidden");
        listaPromociones.innerHTML = "";
        sinPromociones.classList.remove("hidden");
        return;
    }

    promosLoading.classList.add("hidden");
    promosTotal.classList.remove("hidden");
    calcularTotalesPromociones();
}

// ========================================
// FUNCIÓN: Obtener detalle de una promoción
// ========================================
async function obtenerDetallePromo(codigoPromo) {
    try {
        const dataenviar = {
            codigo: codigoPromo,
            productos: window.productosSeleccionados
        };
        const fetchobj = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(dataenviar)
        };

        const paso1 = await fetch(rutapromodetalles, fetchobj);
        const textoRespuesta = await paso1.text();
        const detallePromo = normalizarPromoDetalle(textoRespuesta, codigoPromo);

        if (!detallePromo || !detallePromo.lineas || detallePromo.lineas.length === 0) {
            return null;
        }

        return detallePromo;

    } catch (err) {
        console.warn(`No se pudo obtener detalle de promoción ${codigoPromo}:`, err);
        return null;
    }
}

// ========================================
// FUNCIÓN: Mostrar promoción en lista
// ========================================
function mostrarPromoEnLista(promo) {
    const monedaActual = obtenerMonedaSeleccionada();
    const monedaSymbol = obtenerSímboloMoneda(monedaActual);

    const item = document.createElement("div");
    item.className = "p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200";

    const titulo = document.createElement("h4");
    titulo.className = "font-semibold text-gray-900 text-sm mb-2";
    titulo.innerHTML = `<i class="fas fa-tag text-purple-600 mr-2"></i>${promo.descripcion} <span class="text-xs text-gray-500">[${promo.codigo}]</span>`;

    const resumen = document.createElement("div");
    resumen.className = "grid grid-cols-2 gap-2 mb-3 text-xs text-gray-600";
    const detalleCodigo = document.createElement("p");
    detalleCodigo.innerHTML = `<span class="font-medium">Código:</span> ${promo.codigo}`;
    const detalleCantidad = document.createElement("p");
    const totalCantidad = promo.lineas.reduce((sum, linea) => sum + linea.cantidad, 0);
    detalleCantidad.innerHTML = `<span class="font-medium">Items:</span> ${totalCantidad}`;
    resumen.appendChild(detalleCodigo);
    resumen.appendChild(detalleCantidad);

    const lineaContainer = document.createElement("div");
    lineaContainer.className = "space-y-2";

    promo.lineas.forEach((linea) => {
        const lineaDiv = document.createElement("div");
        lineaDiv.className = "p-3 rounded-lg border border-gray-200 bg-white";
        const montoConvertido = convertirMoneda(linea.monto, linea.moneda);
        const montoTexto = isNaN(montoConvertido) ? '0.00' : montoConvertido.toFixed(2);
        const precioUnitario = isNaN(linea.precioUnitario) ? 0 : linea.precioUnitario;

        if (linea.tipo === "REGALO") {
            lineaDiv.innerHTML = `
                <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                        <p class="text-xs text-gray-600 mb-1">Regalo</p>
                        <p class="font-semibold text-gray-900 truncate">${linea.descripcion}</p>
                        <p class="text-xs text-gray-500 mt-1">Cantidad: ${linea.cantidad}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-gray-600">Precio</p>
                        <p class="text-sm font-bold text-green-600">${precioUnitario.toFixed(2)} ${monedaSymbol}</p>
                    </div>
                </div>
            `;
        } else {
            lineaDiv.innerHTML = `
                <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                        <p class="text-xs text-gray-600 mb-1">Descuento</p>
                        <p class="font-semibold text-gray-900 truncate">${linea.descripcion}</p>
                        <p class="text-xs text-gray-500 mt-1">Cantidad: ${linea.cantidad}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-gray-600">Monto</p>
                        <p class="text-sm font-bold text-red-600">-${montoTexto} ${monedaSymbol}</p>
                    </div>
                </div>
            `;
        }

        lineaContainer.appendChild(lineaDiv);
    });

    item.appendChild(titulo);
    item.appendChild(resumen);
    item.appendChild(lineaContainer);
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

    let valorVentaTotal = 0;
    Object.values(window.productosSeleccionados).forEach((producto) => {
        const precioConvertido = convertirMoneda(producto.precioUnitario, "D");
        const valorVenta = (precioConvertido * producto.cantidad) - 
                          ((precioConvertido * producto.cantidad) * (producto.descuento / 100));
        valorVentaTotal += valorVenta;
    });

    const lineasPromociones = promocionesExitosas.flatMap(promo => promo.lineas || []);
    const descuentoTotalPromo = lineasPromociones.reduce((sum, linea) => {
        if (linea.tipo !== "DESCUENTO") return sum;
        return sum + convertirMoneda(linea.monto, linea.moneda);
    }, 0);

    const totalConDescuento = valorVentaTotal - descuentoTotalPromo;
    const montoIgv = totalConDescuento * 0.18;
    const totalConIgv = totalConDescuento + montoIgv;
    const ahorroConIgv = descuentoTotalPromo * 1.18;

    promoValorVenta.textContent = valorVentaTotal.toFixed(2);
    promoMontDescuento.textContent = descuentoTotalPromo.toFixed(2);
    promoTotalDescuento.textContent = totalConDescuento.toFixed(2);
    promoMontoIgv.textContent = montoIgv.toFixed(2);
    promoTotalConIgv.textContent = totalConIgv.toFixed(2);
    promoAhorroTotal.textContent = ahorroConIgv.toFixed(2);

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
