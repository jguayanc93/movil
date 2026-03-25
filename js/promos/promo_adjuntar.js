
document.getElementById("adjuntar").addEventListener("click",()=>{ addprom();})

async function addprom(){
    // Validar que existan promociones antes de proceder
    if (!prom_numero || Object.keys(prom_numero).length === 0) {
        console.warn("No hay promociones para adjuntar");
        mostrarModalResultado("No hay promociones a aplicar", "warning");
        return;
    }

    let dataenviar=new Object();
    dataenviar.ncoti=document.getElementById("ncoti").value;
    dataenviar.fullpromo=prom_numero;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        console.log("ESTO ES LO Q ESTOI MANDANDO A ADJUNTAR")
        console.log(prom_numero);
        // let paso1=await fetch(rutaaddprom,fetchobj)
        let paso1=await fetch(rutapromocionacoplador,fetchobj)
        
        if (!paso1.ok) {
            throw new Error(`Error HTTP: ${paso1.status}`);
        }
        
        // let paso2=await paso1.json();
        let paso2=await paso1.text();
        console.log("[DEBUG] Respuesta del servidor:", paso2);
        
        // Limpiar variables tras éxito
        for(let propiedad in prom_numero) delete prom_numero[propiedad];
        coti_cant=0;

        // Mostrar modal de éxito
        mostrarModalResultado(paso2, "success");
    }
    catch(err){
        console.error("[ERROR] Error al adjuntar promociones:", err);
        for(let propiedad in prom_numero) delete prom_numero[propiedad];
        coti_cant=0;
        mostrarModalResultado("Error al adjuntar las promociones: " + err.message, "error");
    }
}

function mostrarModalResultado(mensaje, tipo = "info") {
    let capa1=document.createElement('div');
    capa1.className="fixed inset-0 bg-gray-500/75 transition-opacity";
    capa1.setAttribute("aria-hidden","true");

    let capa2=document.createElement('div');
    capa2.className="fixed inset-0 z-10 w-screen overflow-y-auto";
    let capa3=document.createElement('div');
    capa3.className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0";
    let capa4=document.createElement('div');
    capa4.className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg";
    
    let capa5=document.createElement('div');
    capa5.className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4";
    let capa6=document.createElement('div');
    capa6.className="sm:flex sm:items-start";
    
    // Icono según tipo de mensaje
    let iconoDiv=document.createElement('div');
    iconoDiv.className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10";
    
    let iconoSvg=document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconoSvg.setAttribute("class", "h-6 w-6");
    iconoSvg.setAttribute("fill", "none");
    iconoSvg.setAttribute("viewBox", "0 0 24 24");
    iconoSvg.setAttribute("stroke", "currentColor");
    
    if (tipo === "success") {
        iconoDiv.className += " bg-green-100 text-green-600";
        iconoSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>';
    } else if (tipo === "error") {
        iconoDiv.className += " bg-red-100 text-red-600";
        iconoSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
    } else {
        iconoDiv.className += " bg-blue-100 text-blue-600";
        iconoSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
    }
    
    iconoDiv.appendChild(iconoSvg);
    
    let capa7=document.createElement('div');
    capa7.className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left";
    let interior1=document.createElement('h3');
    interior1.className="text-base font-semibold text-gray-900";
    interior1.textContent=tipo === "success" ? "¡Éxito!" : tipo === "error" ? "Error" : "Atención";
    let interior2=document.createElement('div');
    interior2.className="mt-2";
    let parrafo=document.createElement('p');
    parrafo.className="text-sm text-gray-500";
    parrafo.textContent=mensaje;
    interior2.appendChild(parrafo);

    let parte2=document.createElement('div');
    parte2.className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6";
    let boton1=document.createElement('button');
    boton1.className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 sm:ml-3 sm:w-auto";
    boton1.setAttribute("type","button");
    boton1.textContent="OK";
    boton1.addEventListener('click',() => cancelar_confirmacion(tipo));

    parte2.appendChild(boton1);
    capa7.appendChild(interior1);
    capa7.appendChild(interior2);
    capa6.appendChild(iconoDiv);
    capa6.appendChild(capa7);
    capa5.appendChild(capa6);
    capa4.appendChild(capa5);
    capa4.appendChild(parte2);
    capa3.appendChild(capa4);
    capa2.appendChild(capa3);
    capa1.appendChild(capa2);

    document.getElementById("modal-aceptacion").innerHTML="";
    document.getElementById("modal-aceptacion").appendChild(capa1);
}

function cancelar_confirmacion(tipo = "info"){
    // Limpiar modal
    document.getElementById("modal-aceptacion").innerHTML="";
    
    // Si fue éxito, limpiar todo para nueva búsqueda
    if (tipo === "success") {
        document.getElementById("contendor-final-final").innerHTML=`
            <div class="p-8 text-center text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
                Busca una cotización para ver sus items
            </div>
        `;
        document.getElementById("productos-cotizacion-detallada").innerHTML="";
        document.getElementById("ncoti").value="";
        document.getElementById("coti-numero").textContent="-";
        document.getElementById("total-items").textContent="0";
        document.getElementById("promo-count").textContent="0";
        document.getElementById("contendor-promos-final").classList.add('hidden');
        
        // Resetear variables globales
        prom_numero = {};
        cont_grupo_id = [];
        coti_cant = 0;
        promos_conjunto_diferenciales = [];
        
        // Deshabilitar botón adjuntar
        document.getElementById("adjuntar").disabled = true;
        
        window.actualizarEstadoUI?.();
    }
}