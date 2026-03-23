
document.getElementById("buscar-coti").addEventListener("click",()=>{
    buscar_promocion_cotizacion();
})

async function buscar_promocion_cotizacion(){
    // Limpiar selecciones previas
    document.getElementById("productos-cotizacion-detallada").innerHTML = "";
    // promos_recojidas = [];
    promos_recojidas.length = 0;
    updateSelectedCount();
    
    let dataenviar = new Object();
    dataenviar.ncoti = document.getElementById("ncoti").value;
    
    // Validación básica
    if (!dataenviar.ncoti.trim()) {
        showErrorModal("Por favor ingresa un número de cotización");
        return;
    }
    
    let fetchobj = new Object();
    fetchobj.method = "POST";
    fetchobj.headers = {"Content-Type": "application/json"};
    fetchobj.mode = "cors";
    fetchobj.credentials = "include";
    fetchobj.body = JSON.stringify(dataenviar);
    
    try{
        document.getElementById("contendor-final-final").innerHTML = "";
        
        let paso1 = await fetch(rutacotizacionleerprom, fetchobj)
        let paso2 = await paso1.json();
        let paso3 = await JSON.parse(paso2);
        
        coti_cant = Object.keys(paso3).length;
        
        if (coti_cant === 0) {
            showErrorModal("No se encontraron items en la cotización");
            return;
        }
        
        // Crear contenedor de items mejorado
        let itemsContainer = document.createElement('div');
        itemsContainer.className = 'space-y-3';
        
        // Crear cards para cada item
        for(let indice in paso3){
            let item = paso3[indice];
            
            let card = document.createElement('div');
            card.className = 'item-card fade-in';
            card.id = `item-card-${item[9]}`;
            
            card.innerHTML = `
                <div class="flex items-start gap-4">
                    <input 
                        type="checkbox" 
                        id="check-${item[9]}" 
                        class="mt-1 w-5 h-5 text-indigo-600 rounded cursor-pointer accent-indigo-600"
                        onchange="toggleItemSelection('${item[9]}', '${item[3]}', '${item[9]}', '${item[14]}')"
                    />
                    <div class="flex-1 min-w-0">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 class="font-semibold text-gray-900 text-sm sm:text-base truncate">${item[14]}</h3>
                            <span class="flex items-center gap-2 text-lg font-bold text-indigo-600 whitespace-nowrap">
                                $${item[19]}
                            </span>
                        </div>
                        
                        <p class="text-xs sm:text-sm text-gray-600 mt-1">${item[11]}</p>
                        <p class="text-xs text-gray-500 mt-1">${item[12]}</p>
                        
                        <div class="mt-3 flex flex-wrap gap-3 text-xs sm:text-sm">
                            <div class="flex items-center gap-1">
                                <span class="text-gray-600">Cantidad:</span>
                                <span class="font-semibold text-gray-900">${item[15]}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="text-gray-600">P.Unit:</span>
                                <span class="font-semibold text-gray-900">$${item[16]}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="text-gray-600">Descto:</span>
                                <span class="font-semibold text-gray-900">${item[18]}%</span>
                            </div>
                        </div>
                        
                        <button
                            type="button"
                            id="seleccion-item-${item[9]}"
                            data-original-text="Seleccionar"
                            data-item-id="${item[9]}"
                            data-doc="${item[3]}"
                            data-descr="${item[14]}"
                            class="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                            onclick="selectItemForDeletion('${item[9]}', '${item[3]}', '${item[14]}')"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Seleccionar
                        </button>
                    </div>
                </div>
            `;
            
            itemsContainer.appendChild(card);
        }
        
        document.getElementById("contendor-final-final").appendChild(itemsContainer);
    }
    catch(err){
        console.log('Error:', err);
        showErrorModal("Cotización inválida o no encontrada. Verifica el número ingresado.");
    }
}

// Función para seleccionar/deseleccionar item
async function selectItemForDeletion(nitem, doc, descr) {
    const checkbox = document.getElementById(`check-${nitem}`);
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
        toggleItemSelection(nitem, doc, nitem, descr);
    }
}

// Función para toggle de selección
async function toggleItemSelection(nitem, doc, nitem2, descr) {
    const checkbox = document.getElementById(`check-${nitem}`);
    const card = document.getElementById(`item-card-${nitem}`);
    const button = document.getElementById(`seleccion-item-${nitem}`);
    
    if (checkbox.checked) {
        // Agregar a seleccionados
        card.classList.add('selected');
        button.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
        button.classList.add('bg-green-600', 'hover:bg-green-700');
        button.innerHTML = `
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Seleccionado
        `;
        button.disabled = true;
        
        recojedor_promocion(doc, nitem, descr);
    } else {
        // Remover de seleccionados
        card.classList.remove('selected');
        button.classList.remove('bg-green-600', 'hover:bg-green-700');
        button.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
        button.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Seleccionar
        `;
        button.disabled = false;
        
        // Remover de promos_recojidas
        promos_recojidas = promos_recojidas.filter(item => item[1] != nitem);
        updateSelectedCount();
        promocion_desechadas();
    }
}

// Función para mostrar modal de error mejorado
function showErrorModal(message) {
    let modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-gray-500/75 transition-opacity z-50';
    modal.onclick = () => modal.remove();
    
    let content = document.createElement('div');
    content.className = 'fixed inset-0 z-50 w-screen overflow-y-auto';
    
    let container = document.createElement('div');
    container.className = 'flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0';
    
    let dialog = document.createElement('div');
    dialog.className = 'relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg';
    
    dialog.innerHTML = `
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0V12a9 9 0 11-18 0v-.75M9 15h6M7.08 4.08a8.994 8.994 0 0110.36 1.54m-5.08 5.54h.01m3.6-9.23a9 9 0 010 16.46" />
                    </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">Aviso</h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">${message}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button 
                type="button" 
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onclick="this.closest('div').parentElement.parentElement.remove()"
            >
                OK
            </button>
        </div>
    `;
    
    container.appendChild(dialog);
    content.appendChild(container);
    modal.appendChild(content);
    document.body.appendChild(modal);
}