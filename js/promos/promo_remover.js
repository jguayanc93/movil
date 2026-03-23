
document.getElementById("remover-promos").addEventListener("click", () => {
    if(promos_recojidas.length !== 0){
        removeprom();
    }
    else {
        showSimpleNotification("Tu listado de promociones a eliminar está vacío", "warning");
    }
})

async function removeprom(){
    let dataenviar = new Object();
    dataenviar.removeproms = promos_recojidas;
    let fetchobj = new Object();
    fetchobj.method = "POST";
    fetchobj.headers = {"Content-Type": "application/json"};
    fetchobj.mode = "cors";
    fetchobj.credentials = "include";
    fetchobj.body = JSON.stringify(dataenviar);
    
    try{
        let paso1 = await fetch(rutapromocioneliminar, fetchobj)
        let paso2 = await paso1.text();
        console.log(paso2);
        
        // Mostrar modal de confirmación mejorado
        showConfirmationModal(paso2);
    }
    catch(err){
        console.log('Error en removeprom:', err);
        showSimpleNotification("Error al procesar la eliminación. Intenta de nuevo.", "error");
    }
}

function showConfirmationModal(message) {
    let modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-gray-500/75 transition-opacity z-50';
    
    let content = document.createElement('div');
    content.className = 'fixed inset-0 z-50 w-screen overflow-y-auto flex items-end justify-center p-4 sm:items-center sm:p-0';
    
    let dialog = document.createElement('div');
    dialog.className = 'relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-bounce';
    
    let isSuccess = message.toLowerCase().includes('éxito') || message.toLowerCase().includes('success') || message.toLowerCase().includes('eliminad');
    let bgColor = isSuccess ? 'bg-green-50' : 'bg-blue-50';
    let iconColor = isSuccess ? 'text-green-600' : 'text-blue-600';
    let iconBg = isSuccess ? 'bg-green-100' : 'bg-blue-100';
    
    dialog.innerHTML = `
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconBg} sm:mx-0 sm:h-10 sm:w-10">
                    <svg class="h-6 w-6 ${iconColor}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 class="text-lg font-semibold leading-6 text-gray-900">
                        ${isSuccess ? 'Eliminación Exitosa' : 'Respuesta del Sistema'}
                    </h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-600">${message}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="${bgColor} px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
            <button 
                type="button" 
                class="inline-flex w-full justify-center rounded-md ${isSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors sm:ml-3 sm:w-auto"
                onclick="handleConfirmationOk()"
            >
                Aceptar
            </button>
            <button 
                type="button" 
                class="mt-3 inline-flex w-full justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-200 transition-colors sm:mt-0 sm:w-auto"
                onclick="closeModal()"
            >
                Cerrar
            </button>
        </div>
    `;
    
    content.appendChild(dialog);
    modal.appendChild(content);
    document.body.appendChild(modal);
    modal.id = 'result-modal';
}

function handleConfirmationOk() {
    cancelar_confirmacion();
    closeModal();
    // Mostrar notificación de éxito
    showSimpleNotification("Promociones eliminadas correctamente", "success");
}

function closeModal() {
    let modal = document.getElementById('result-modal') || document.querySelector('.fixed.inset-0.bg-gray-500');
    if (modal) {
        modal.remove();
    }
}

function showSimpleNotification(message, type = "info") {
    let notification = document.createElement('div');
    let bgColor, iconColor, iconBg;
    
    if (type === "success") {
        bgColor = 'bg-green-50';
        iconColor = 'text-green-600';
        iconBg = 'bg-green-100';
    } else if (type === "error") {
        bgColor = 'bg-red-50';
        iconColor = 'text-red-600';
        iconBg = 'bg-red-100';
    } else if (type === "warning") {
        bgColor = 'bg-yellow-50';
        iconColor = 'text-yellow-600';
        iconBg = 'bg-yellow-100';
    } else {
        bgColor = 'bg-blue-50';
        iconColor = 'text-blue-600';
        iconBg = 'bg-blue-100';
    }
    
    notification.className = `fixed bottom-4 right-4 ${bgColor} px-4 py-3 rounded-lg shadow-lg max-w-sm z-50 animate-bounce`;
    notification.innerHTML = `
        <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5 ${iconColor}" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <p class="text-sm font-medium text-gray-900">${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function cancelar_confirmacion(){
    promos_recojidas.length = 0;
    document.getElementById("modal-aceptacion").innerHTML = "";
    document.getElementById("contendor-final-final").innerHTML = "";
    document.getElementById("productos-cotizacion-detallada").innerHTML = "";
    if (typeof updateSelectedCount === 'function') {
        updateSelectedCount();
    }
}