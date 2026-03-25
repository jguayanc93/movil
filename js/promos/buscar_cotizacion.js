
document.getElementById("buscar-coti").addEventListener("click",()=>{
    const nCoti = document.getElementById("ncoti").value.trim();
    if (!nCoti) {
        mostrarNotificacion('Por favor ingresa un número de cotización', 'error');
        return;
    }
    buscar_cotizacion2();
});

// Permitir búsqueda con Enter
document.getElementById("ncoti").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("buscar-coti").click();
    }
});

async function buscar_cotizacion(){
    let dataenviar=new Object();
    dataenviar.ncoti=document.getElementById("ncoti").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1=await fetch(rutacotizacion,fetchobj)
        let paso2=await paso1.json();
        let paso3=await JSON.parse(paso2);
        console.log(paso3);
        
        for(let indice in paso3){
            let escondido=document.createElement("p");
            escondido.innerHTML=paso3[indice][0];
            let mensaje2=document.createElement("td");
            mensaje2.appendChild(escondido);

            let seleccionable=document.createElement("p");
            seleccionable.innerHTML=paso3[indice][1];
            let mensaje=document.createElement("td");
            mensaje.appendChild(seleccionable);            

            let escondido2=document.createElement("p");
            escondido2.innerHTML=paso3[indice][2];
            let mensaje3=document.createElement("td");
            mensaje3.appendChild(escondido2);

            let escondido3=document.createElement("p");
            escondido3.innerHTML=paso3[indice][3].toFixed(2);
            let mensaje4=document.createElement("td");
            mensaje4.appendChild(escondido3);

            let escondido4=document.createElement("p");
            escondido4.innerHTML=paso3[indice][4];
            let mensaje5=document.createElement("td");
            mensaje5.appendChild(escondido4);

            let escondido5=document.createElement("p");
            escondido5.innerHTML=paso3[indice][5];
            let mensaje6=document.createElement("td");
            mensaje6.appendChild(escondido5);
            ////agregado para completar
            let escondido6=document.createElement("p");
            escondido6.innerHTML=paso3[indice][6];
            let mensaje7=document.createElement("td");
            mensaje7.appendChild(escondido6);

            let escondido7=document.createElement("p");
            escondido7.innerHTML=paso3[indice][7];
            let mensaje8=document.createElement("td");
            mensaje8.appendChild(escondido7);

            let cuadrado=document.createElement("tr");

            cuadrado.appendChild(mensaje2);
            cuadrado.appendChild(mensaje);
            cuadrado.appendChild(mensaje3);
            cuadrado.appendChild(mensaje4);
            cuadrado.appendChild(mensaje5);
            cuadrado.appendChild(mensaje6);
            cuadrado.appendChild(mensaje7);
            cuadrado.appendChild(mensaje8);
            document.getElementById("coti-detalle").appendChild(cuadrado);
        }
    }
    catch(err){ console.log(err); }
}

async function buscar_cotizacion2(){
    /////NO TE OLVIDES DE LIMPIAR CADA VES QUE BUSCAN UNA COTI LAS VARIABLES GLOBLAES
    document.getElementById("productos-cotizacion-detallada").innerHTML="";
    document.getElementById("contendor-final-final").innerHTML="";
    /////////
    let dataenviar=new Object();
    dataenviar.ncoti=document.getElementById("ncoti").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        // Mostrar spinner de carga
        const spinner = document.createElement('div');
        spinner.className = "flex items-center justify-center py-8";
        spinner.innerHTML = `
            <div class="animate-spin">
                <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                </svg>
            </div>
        `;
        document.getElementById("contendor-final-final").appendChild(spinner);
        
        let paso1=await fetch(rutacotizacionleer,fetchobj)
        if (!paso1.ok) throw new Error('Cotización no encontrada');
        
        let paso2=await paso1.json();
        let paso3=await JSON.parse(paso2);
        await buscar_pivot();
        
        coti_cant=Object.keys(paso3).length;
        
        if (coti_cant <= 0) {
            throw new Error('No hay items en esta cotización');
        }
        
        // Limpiar contenedor
        document.getElementById("contendor-final-final").innerHTML="";
        
        // Crear lista de items con mejor estructura
        let itemsContainer = document.createElement('div');
        itemsContainer.className = "space-y-3";
        
        for(let indice in paso3){
            let item = paso3[indice];
            
            let itemElement = document.createElement('div');
            itemElement.className = "flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200";
            itemElement.innerHTML = `
                <div class="flex-1 min-w-0">
                    <div class="flex flex-col gap-1">
                        <div class="flex items-center justify-between gap-2">
                            <h4 class="font-semibold text-gray-900 truncate text-sm md:text-base">${item[14] || 'Producto'}</h4>
                            <span class="text-lg font-bold text-indigo-600 whitespace-nowrap">$${parseFloat(item[19]).toFixed(2)}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-3 text-xs md:text-sm text-gray-600">
                            <div>
                                <span class="text-gray-500">Marca:</span>
                                <span class="font-medium">${item[12] || '-'}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">Cantidad:</span>
                                <span class="font-medium">${item[15]}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">Unitario:</span>
                                <span class="font-medium">$${parseFloat(item[16]).toFixed(2)}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">Descuento:</span>
                                <span class="font-medium">${item[18]}%</span>
                            </div>
                            <div class="col-span-2">
                                <span class="text-gray-500">Almacén:</span>
                                <span class="font-medium">${item[20]}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            itemsContainer.appendChild(itemElement);
        }
        
        document.getElementById("contendor-final-final").appendChild(itemsContainer);
        
        // Crear botón de buscar promociones
        let btnPromo = document.createElement('button');
        btnPromo.type = "button";
        btnPromo.className = "w-full mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-6 py-3 text-base font-semibold text-white hover:bg-amber-700 active:bg-amber-800 transition-colors";
        btnPromo.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z"></path>
            </svg>
            Buscar Promociones
        `;
        btnPromo.addEventListener('click', ()=>{
            esperador(promos_conjunto_diferenciales);
        });
        document.getElementById("contendor-final-final").appendChild(btnPromo);
        
        // Actualizar resumen
        document.getElementById("total-items").textContent = coti_cant;
        document.getElementById("items-count").textContent = `${coti_cant} items encontrados`;
        document.getElementById("coti-numero").textContent = document.getElementById("ncoti").value;
        
        mostrarNotificacion(`Cotización cargada: ${coti_cant} items encontrados`, 'success');
    }
    catch(err){
        console.error('Error:', err);
        document.getElementById("contendor-final-final").innerHTML = `
            <div class="text-center py-8">
                <svg class="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-gray-900 font-semibold">${err.message || 'Error al buscar la cotización'}</p>
                <p class="text-gray-500 text-sm mt-1">Verifica el número ingresado e intenta de nuevo</p>
            </div>
        `;
        mostrarNotificacion(err.message || 'Error al buscar la cotización', 'error');
    }
}

// Función auxiliar para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Implementación simple de notificación
    console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
}