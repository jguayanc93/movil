// Índices de estructura de datos del pedido
const PEDIDO_INDICES = {
    flag: 0,
    apro: 1,
    dias: 2,
    fecha: 3,
    documento: 4,
    cliente: 5,
    item: 6,
    codigo_fabricante: 7,
    descripcion: 8,
    marca: 9,
    cantidad: 10,
    descuento: 11,
    precio_unitario: 12,
    total: 13
};

let pedido_actual = null;

document.getElementById("buscar-pedi").addEventListener("click", (ev) => {
    buscar_pedido_flete();
});

document.getElementById("cancelar-busqueda").addEventListener("click", (ev) => {
    cancelar_busqueda();
});

document.getElementById("aplicar-flete").addEventListener("click", (ev) => {
    aplicar_flete();
});

async function buscar_pedido_flete() {
    const npedi = document.getElementById("npedi").value.trim();
    
    if (!npedi) {
        mostrar_mensaje("Por favor ingresa un número de pedido", "error");
        return;
    }

    let dataenviar = new Object();
    dataenviar.npedi = npedi;
    let fetchobj = new Object();
    fetchobj.method = "POST";
    fetchobj.headers = { "Content-Type": "application/json" };
    fetchobj.mode = "cors";
    fetchobj.credentials = "include";
    fetchobj.body = JSON.stringify(dataenviar);

    try {
        let paso1 = await fetch(rutapedidoflete, fetchobj);
        let paso2 = await paso1.json();
        let paso3 = JSON.parse(paso2);
        
        console.log("Datos del pedido:", paso3);

        if (!paso3 || Object.keys(paso3).length === 0) {
            mostrar_mensaje("No se encontraron productos para este pedido", "error");
            return;
        }

        // Guardar datos del pedido
        pedido_actual = paso3;

        // Limpiar tabla
        document.getElementById("tabla-productos").innerHTML = "";

        // Variables para cálculos
        let subtotal = 0;
        let total_items = 0;

        // Poblar tabla
        for (let indice in paso3) {
            const item = paso3[indice];
            const cantidad = parseFloat(item[PEDIDO_INDICES.cantidad]) || 0;
            const precio_unitario = parseFloat(item[PEDIDO_INDICES.precio_unitario]) || 0;
            const total_item = parseFloat(item[PEDIDO_INDICES.total]) || 0;

            subtotal += total_item;
            total_items += cantidad;

            // Crear fila
            let tr = document.createElement("tr");
            tr.className = "hover:bg-gray-50";
            tr.innerHTML = `
                <td class="px-6 py-4 text-sm text-gray-900">
                    <div class="font-medium">${item[PEDIDO_INDICES.descripcion]}</div>
                    <div class="text-xs text-gray-500">${item[PEDIDO_INDICES.marca]}</div>
                </td>
                <td class="px-6 py-4 text-center text-sm text-gray-900">${item[PEDIDO_INDICES.codigo_fabricante]}</td>
                <td class="px-6 py-4 text-center text-sm text-gray-900">${cantidad}</td>
                <td class="px-6 py-4 text-center text-sm text-gray-900">$${precio_unitario.toFixed(2)}</td>
                <td class="px-6 py-4 text-right text-sm font-medium text-gray-900">$${total_item.toFixed(2)}</td>
            `;

            document.getElementById("tabla-productos").appendChild(tr);
        }

        // Actualizar totales
        document.getElementById("total-items").textContent = `${total_items} items`;
        document.getElementById("monto-total").textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById("total-final").textContent = `$${subtotal.toFixed(2)}`;

        // Mostrar secciones
        document.getElementById("seccion-flete").classList.remove("hidden");
        document.getElementById("seccion-productos").classList.remove("hidden");

        mostrar_mensaje("Pedido cargado exitosamente", "success");

    } catch (err) {
        console.error("Error:", err);
        mostrar_mensaje("Error al buscar el pedido", "error");
    }
}

function cancelar_busqueda() {
    // Limpiar inputs
    document.getElementById("npedi").value = "";
    
    // Ocultar secciones
    document.getElementById("seccion-flete").classList.add("hidden");
    document.getElementById("seccion-productos").classList.add("hidden");
    
    // Limpiar datos
    pedido_actual = null;
    document.getElementById("tabla-productos").innerHTML = "";
    
    mostrar_mensaje("Búsqueda cancelada", "info");
}

async function aplicar_flete() {
    if (!pedido_actual) {
        mostrar_mensaje("No hay pedido cargado", "error");
        return;
    }

    const npedi = document.getElementById("npedi").value.trim();
    
    if (!npedi) {
        mostrar_mensaje("No se encontró el número de pedido", "error");
        return;
    }

    try {
        // Obtener flag y apro del primer item
        const primer_item = pedido_actual[Object.keys(pedido_actual)[0]];
        const flag = primer_item[PEDIDO_INDICES.flag];
        const apro = primer_item[PEDIDO_INDICES.apro];

        let dataenviar = {
            npedi: npedi,
            flag: flag,
            apro: apro
        };

        let fetchobj = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(dataenviar)
        };

        let respuesta = await fetch(rutapedidofleteaplicar, fetchobj);
        let resultado = await respuesta.json();
        let confirmacion = JSON.parse(resultado);

        console.log("Confirmación del flete:", confirmacion);

        if (confirmacion && confirmacion.exito) {
            mostrar_mensaje("Flete aplicado correctamente", "success");
            
            // Opcional: limpiar después de aplicar
            setTimeout(() => {
                cancelar_busqueda();
            }, 2000);
        } else {
            mostrar_mensaje(confirmacion.mensaje || "Error al aplicar flete", "error");
        }

    } catch (err) {
        console.error("Error:", err);
        mostrar_mensaje("Error al aplicar flete", "error");
    }
}

function mostrar_mensaje(texto, tipo) {
    const contenedor = document.getElementById("mensaje-estado");
    contenedor.innerHTML = "";
    
    let clase_fondo = "bg-blue-50 border-blue-200 text-blue-800";
    let clase_icono = "text-blue-600";
    let icono = "fa-info-circle";
    
    if (tipo === "error") {
        clase_fondo = "bg-red-50 border-red-200 text-red-800";
        clase_icono = "text-red-600";
        icono = "fa-exclamation-circle";
    } else if (tipo === "success") {
        clase_fondo = "bg-green-50 border-green-200 text-green-800";
        clase_icono = "text-green-600";
        icono = "fa-check-circle";
    }
    
    const mensaje = document.createElement("div");
    mensaje.className = `${clase_fondo} border-l-4 px-4 py-4 rounded-lg shadow-md flex items-center gap-3`;
    mensaje.innerHTML = `
        <i class="fas ${icono} ${clase_icono}"></i>
        <span>${texto}</span>
    `;
    
    contenedor.appendChild(mensaje);
    contenedor.classList.remove("hidden");
    
    // Auto-ocultar después de 4 segundos
    setTimeout(() => {
        contenedor.classList.add("hidden");
    }, 4000);
}