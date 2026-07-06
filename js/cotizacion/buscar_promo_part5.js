/*
  Paso 4 - Crear cotización
  Lógica de la nueva ruta rutacotizacionnewcrear.
  - Activa/desactiva el botón CREAR según el carrito.
  - Envía el detalle completo de los productos al backend.
  - Reinicia el estado luego de recibir respuesta válida o inválida.
*/

function obtenerCantidadProductosCarrito() {
    return window.productosSeleccionados ? Object.keys(window.productosSeleccionados).length : 0;
}

function actualizarBotonCreacion() {
    const boton = document.getElementById("creacion");
    if (!boton) return;

    const tieneProductos = obtenerCantidadProductosCarrito() > 0;
    boton.disabled = !tieneProductos;

    boton.classList.toggle("bg-green-500", tieneProductos);
    boton.classList.toggle("hover:bg-emerald-600", tieneProductos);
    boton.classList.toggle("bg-rose-500", !tieneProductos);
    boton.classList.toggle("hover:bg-red-600", !tieneProductos);
    boton.classList.toggle("cursor-not-allowed", !tieneProductos);
    boton.classList.toggle("opacity-60", !tieneProductos);
    boton.classList.toggle("opacity-100", tieneProductos);
}

function parseJSONResponse(value) {
    if (typeof value === "string") {
        try {
            return JSON.parse(value);
        } catch (err) {
            return value;
        }
    }
    return value;
}

function mostrarModalResultadoCreacion(tipo, titulo, mensaje) {
    const existente = document.getElementById("modal-resultado-creacion");
    if (existente) existente.remove();

    const overlay = document.createElement("div");
    overlay.id = "modal-resultado-creacion";
    overlay.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4";

    const cuadro = document.createElement("div");
    cuadro.className = "w-full max-w-md rounded-2xl bg-white p-6 shadow-xl";

    const tituloElem = document.createElement("h2");
    tituloElem.className = "text-lg font-bold mb-2" + (tipo === "error" ? " text-rose-600" : " text-emerald-600");
    tituloElem.textContent = titulo;

    const mensajeElem = document.createElement("p");
    mensajeElem.className = "text-sm text-gray-700 mb-4";
    mensajeElem.textContent = mensaje;

    const botonCerrar = document.createElement("button");
    botonCerrar.type = "button";
    botonCerrar.className = "w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700";
    botonCerrar.textContent = "Cerrar";
    botonCerrar.addEventListener("click", () => {
        overlay.remove();
    });

    cuadro.appendChild(tituloElem);
    cuadro.appendChild(mensajeElem);
    cuadro.appendChild(botonCerrar);
    overlay.appendChild(cuadro);
    document.body.appendChild(overlay);
}

function limpiarEstadoDespuesDeCreacion() {
    if (Array.isArray(cliente_data)) {
        cliente_data.length = 0;
    } else {
        cliente_data = [];
    }

    almc_id = "D";

    if (typeof agrupacion === "object" && agrupacion !== null) {
        for (let prod in agrupacion) {
            if (Object.prototype.hasOwnProperty.call(agrupacion, prod)) {
                delete agrupacion[prod];
            }
        }
    }

    if (typeof promos_insertadas === "object" && promos_insertadas !== null) {
        promos_insertadas = {};
    }

    if (typeof reiniciarSegmento3 === "function") {
        reiniciarSegmento3();
    } else if (window.productosSeleccionados) {
        window.productosSeleccionados = {};
    }

    if (window.idsProductosAgregados) {
        window.idsProductosAgregados = [];
    }

    const paso2 = document.getElementById("paso2");
    if (paso2) paso2.classList.add("hidden");

    const paso3 = document.getElementById("paso3");
    if (paso3) paso3.classList.add("hidden");

    const clienteSeleccionado = document.getElementById("cliente-seleccionado");
    if (clienteSeleccionado) clienteSeleccionado.classList.add("hidden");

    const seleccionarProductos = document.getElementById("seleccionar-productos");
    if (seleccionarProductos) seleccionarProductos.innerHTML = "";

    const productosListados = document.getElementById("productos-listados");
    if (productosListados) productosListados.innerHTML = "";

    const recorrerProductos = document.getElementById("recorrer-productos");
    if (recorrerProductos) recorrerProductos.innerHTML = "";

    if (typeof actualizarBotonCreacion === "function") {
        actualizarBotonCreacion();
    }
}

window.crearCotizacion = async function () {
    const boton = document.getElementById("creacion");
    if (!boton || boton.disabled) return;

    const botonContenido = boton.innerHTML;
    boton.disabled = true;
    boton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>ENVIANDO...</span>';

    try {
        const productos = window.productosSeleccionados ? window.productosSeleccionados : {};
        const dataenviar = {
            cliente: cliente_data,
            productos: productos,
            moneda: almc_id,
            promos: promos_insertadas || {}
        };

        const fetchobj = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(dataenviar)
        };

        const paso1 = await fetch(rutacotizacionnewcrear, fetchobj);
        const textoRespuesta = await paso1.text();
        console.log("Respuesta del backend:", textoRespuesta);
        const data = parseJSONResponse(textoRespuesta);
        console.log("respuesta parseada", data);

        const esValida = paso1.ok && (
            (typeof data === "object" && data !== null && (
                data.success === true || data.valid === true || data.estado?.toString().toLowerCase().includes("valida") || data.resultado?.toString().toLowerCase().includes("valida") || data.numero || data.id
            )) ||
            (typeof data === "string" && data.toLowerCase().includes("valida"))
        );

        const mensajeBase = typeof data === "object" && data !== null
            ? data.mensaje || data.message || data.error || JSON.stringify(data)
            : String(data);

        if (esValida) {
            mostrarModalResultadoCreacion("success", "Cotización generada", mensajeBase || "La cotización se generó correctamente.");
        } else {
            mostrarModalResultadoCreacion("error", "Cotización inválida", mensajeBase || "La cotización fue procesada pero el backend devolvió un resultado inválido.");
        }
    } catch (err) {
        console.error("Error creando cotización:", err);
        mostrarModalResultadoCreacion("error", "Error de conexión", "No se pudo completar la solicitud. Intente nuevamente.");
    } finally {
        limpiarEstadoDespuesDeCreacion();
        boton.innerHTML = botonContenido;
        if (typeof actualizarBotonCreacion === "function") {
            actualizarBotonCreacion();
        }
    }
};

window.actualizarBotonCreacion = actualizarBotonCreacion;
actualizarBotonCreacion();
