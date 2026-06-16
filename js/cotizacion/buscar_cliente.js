
// ========================================
// ESTADO GLOBAL
// ========================================
let clienteSeleccionado = null;
let timeoutBusqueda = null;

// ========================================
// ELEMENTOS DEL DOM
// ========================================
const btnBuscarCliente = document.getElementById("btn-buscar-cliente");
const modalBusquedaCliente = document.getElementById("modal-busqueda-cliente");
const inputBusqueda = document.getElementById("input-busqueda");
const btnCerrarBusqueda = document.getElementById("btn-cerrar-busqueda");
const btnCancelarBusqueda = document.getElementById("btn-cancelar-busqueda");
const btnLimpiarBusqueda = document.getElementById("btn-limpiar-busqueda");
const recorrerClientes = document.getElementById("recorrer-clientes");
const modalBackdrop = document.getElementById("modal-backdrop");
const clienteSeleccionadoDiv = document.getElementById("cliente-seleccionado");
const nombreClienteSpan = document.getElementById("nombre-cliente");
const btnCambiarCliente = document.getElementById("btn-cambiar-cliente");
const indicadorBusqueda = document.getElementById("indicador-busqueda");
const busquedaLoading = document.getElementById("busqueda-loading");
const sinResultados = document.getElementById("sin-resultados");
const paso2 = document.getElementById("paso2");

// ========================================
// ABRIR MODAL DE BÚSQUEDA
// ========================================
btnBuscarCliente.addEventListener("click", () => {
    abrirModalBusqueda();
});

function abrirModalBusqueda() {
    modalBusquedaCliente.classList.remove("hidden");
    document.body.classList.add("modal-abierto");
    inputBusqueda.focus();
    limpiarBusqueda();
}

// ========================================
// CERRAR MODAL DE BÚSQUEDA
// ========================================
function cerrarModalBusqueda() {
    modalBusquedaCliente.classList.add("hidden");
    document.body.classList.remove("modal-abierto");
    recorrerClientes.innerHTML = "";
    inputBusqueda.value = "";
    btnLimpiarBusqueda.classList.add("hidden");
}

btnCerrarBusqueda.addEventListener("click", cerrarModalBusqueda);
btnCancelarBusqueda.addEventListener("click", cerrarModalBusqueda);
modalBackdrop.addEventListener("click", cerrarModalBusqueda);

// ========================================
// INPUT DE BÚSQUEDA
// ========================================
inputBusqueda.addEventListener("input", (ev) => {
    const busqueda = ev.target.value.trim();
    
    // Mostrar/ocultar botón limpiar
    if (busqueda.length > 0) {
        btnLimpiarBusqueda.classList.remove("hidden");
    } else {
        btnLimpiarBusqueda.classList.add("hidden");
    }

    // Limpiar timeout anterior
    clearTimeout(timeoutBusqueda);
    recorrerClientes.innerHTML = "";
    sinResultados.classList.add("hidden");
    busquedaLoading.classList.add("hidden");

    // Si es menor a 3 caracteres
    if (busqueda.length < 3) {
        if (busqueda.length > 0) {
            indicadorBusqueda.classList.remove("hidden");
        } else {
            indicadorBusqueda.classList.add("hidden");
        }
        return;
    }

    // Ocultar indicador y mostrar loading
    indicadorBusqueda.classList.add("hidden");
    busquedaLoading.classList.remove("hidden");

    // Buscar después de 400ms (debounce)
    timeoutBusqueda = setTimeout(() => {
        buscar_cliente2(busqueda);
    }, 400);
});

// ========================================
// BOTÓN LIMPIAR BÚSQUEDA
// ========================================
btnLimpiarBusqueda.addEventListener("click", (ev) => {
    ev.stopPropagation();
    limpiarBusqueda();
});

function limpiarBusqueda() {
    inputBusqueda.value = "";
    btnLimpiarBusqueda.classList.add("hidden");
    recorrerClientes.innerHTML = "";
    indicadorBusqueda.classList.add("hidden");
    busquedaLoading.classList.add("hidden");
    sinResultados.classList.add("hidden");
    inputBusqueda.focus();
}

// ========================================
// MOSTRAR RESULTADOS DE BÚSQUEDA
// ========================================
function mostrarSugerenciasClientes(clientes) {
    busquedaLoading.classList.add("hidden");
    recorrerClientes.innerHTML = "";

    if (!clientes || Object.keys(clientes).length === 0) {
        sinResultados.classList.remove("hidden");
        return;
    }

    Object.values(clientes).forEach((cliente) => {
        const contenedor = document.createElement("div");
        contenedor.className = "p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 active:bg-indigo-100";
        
        const nombre = document.createElement("p");
        nombre.className = "font-medium text-gray-900 text-sm";
        nombre.textContent = cliente[1]; // nombre
        
        const info = document.createElement("p");
        info.className = "text-xs text-gray-600 mt-1";
        info.textContent = `ID: ${cliente[0]}`; // ID
        
        contenedor.appendChild(nombre);
        contenedor.appendChild(info);
        
        contenedor.addEventListener("click", () => {
            seleccionarCliente(cliente[0], cliente[1]);
        });
        
        recorrerClientes.appendChild(contenedor);
    });
}

// ========================================
// INTERCEPTAR FUNCIÓN buscar_cliente2
// ========================================
// Guardar la función original
const buscar_cliente2Original = typeof buscar_cliente2 !== "undefined" ? buscar_cliente2 : null;

// Nueva función wrapper
async function buscar_cliente2(busqueda) {
    let dataenviar = new Object();
    dataenviar.sugerencia = busqueda;
    let fetchobj = new Object();
    fetchobj.method = "POST";
    fetchobj.headers = { "Content-Type": "application/json" };
    fetchobj.mode = "cors";
    fetchobj.credentials = "include";
    fetchobj.body = JSON.stringify(dataenviar);
    
    try {
        let paso1 = await fetch(rutaclientebusqueda, fetchobj);
        let paso2 = await paso1.json();
        let paso3 = await JSON.parse(paso2);
        
        // Usar la nueva función para mostrar sugerencias
        mostrarSugerenciasClientes(paso3);
    } catch (err) {
        console.log(err);
        busquedaLoading.classList.add("hidden");
        sinResultados.classList.remove("hidden");
    }
}

// ========================================
// SELECCIONAR CLIENTE
// ========================================
function seleccionarCliente(clienteId, clienteNombre) {
    clienteSeleccionado = {
        id: clienteId,
        nombre: clienteNombre
    };
    
    // Cerrar modal
    cerrarModalBusqueda();
    
    // Mostrar cliente seleccionado
    nombreClienteSpan.textContent = clienteNombre;
    clienteSeleccionadoDiv.classList.remove("hidden");
    
    // Mostrar paso 2
    paso2.classList.remove("hidden");
    
    // Scroll suave al paso 2
    setTimeout(() => {
        paso2.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    
    // Ejecutar lógica de identificación del cliente si existe
    if (typeof cliente !== "undefined") {
        cliente(clienteId);
    }
}

// ========================================
// BOTÓN CAMBIAR CLIENTE
// ========================================
btnCambiarCliente.addEventListener("click", (ev) => {
    ev.stopPropagation();
    clienteSeleccionado = null;
    clienteSeleccionadoDiv.classList.add("hidden");
    paso2.classList.add("hidden");
    abrirModalBusqueda();
});