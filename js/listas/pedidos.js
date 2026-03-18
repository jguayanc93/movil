// UI State Management
const UIState = {
    loader: document.getElementById('loader'),
    container: document.getElementById('npedis'),
    emptyState: document.getElementById('empty-state'),
    errorState: document.getElementById('error-state'),
    errorMessage: document.getElementById('error-message'),
    btnLimpiar: document.getElementById('btn-limpiar')
};

// Show/Hide UI Elements
function showLoader() {
    UIState.loader.classList.remove('hidden');
    UIState.container.innerHTML = '';
    UIState.emptyState.classList.add('hidden');
    UIState.errorState.classList.add('hidden');
}

function hideLoader() {
    UIState.loader.classList.add('hidden');
}

function showEmpty() {
    UIState.loader.classList.add('hidden');
    UIState.emptyState.classList.remove('hidden');
    UIState.errorState.classList.add('hidden');
}

function showError(message) {
    UIState.loader.classList.add('hidden');
    UIState.errorMessage.textContent = message;
    UIState.errorState.classList.remove('hidden');
    UIState.emptyState.classList.add('hidden');
}

// Card Builder for Pedidos
function buildCardElement(data) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden card-item fade-in';
    card.innerHTML = `
        <div class="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img src="/logotipo.png" alt="Logo" class="w-24 h-24 object-contain">
        </div>
        <div class="p-4 sm:p-5">
            <div class="space-y-3">
                <div>
                    <p class="text-xs font-semibold text-blue-600 uppercase tracking-wide">Pedido ID</p>
                    <h3 class="text-base font-bold text-gray-900 truncate">${data[1] || 'N/A'}</h3>
                </div>
                <p class="text-sm text-gray-600 line-clamp-2 min-h-10">${data[2] || 'Sin descripción'}</p>
                <div class="pt-2 border-t border-gray-200 grid grid-cols-2 gap-2">
                    <div>
                        <p class="text-xs text-gray-500 font-medium">Monto</p>
                        <p class="text-lg font-bold text-blue-600">$${data[3] || '0'}</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 font-medium">Estado</p>
                        <p class="text-sm font-semibold text-gray-900">${data[4] || 'N/A'}</p>
                    </div>
                </div>
            </div>
            <button class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors text-sm">
                Ver detalles
            </button>
        </div>
    `;
    return card;
}

// Fetch and Display Data
async function fetchAndDisplay(endpoint, showByDate = false) {
    showLoader();
    try {
        const payload = {};
        if (showByDate) {
            const dateValue = document.getElementById('fecha-dia').value;
            if (!dateValue) {
                showEmpty();
                return;
            }
            payload.dia = dateValue;
        }

        const fetchConfig = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(payload)
        };

        const response = await fetch(endpoint, fetchConfig);
        const jsonData = await response.json();
        const data = JSON.parse(jsonData);

        // Check if data is empty or not an object
        if (!data || Object.keys(data).length === 0) {
            showEmpty();
            hideLoader();
            return;
        }

        hideLoader();
        UIState.container.innerHTML = '';

        // Build and append cards
        for (const key in data) {
            const card = buildCardElement(data[key]);
            UIState.container.appendChild(card);
        }

    } catch (error) {
        console.error('Error:', error);
        showError('No se pudieron cargar los datos. Por favor, intenta nuevamente.');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplay(rutalistapedi);
});

document.getElementById('fecha-dia').addEventListener('change', () => {
    fetchAndDisplay(rutalistapedixdia, true);
});

document.getElementById('btn-limpiar').addEventListener('click', () => {
    document.getElementById('fecha-dia').value = '';
    fetchAndDisplay(rutalistapedi);
});

async function buscar_dia(){
    let dataenviar=new Object();
    // dataenviar.dia=document.getElementById("fecha-dia").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutalistapedi,fetchobj)
        let paso2= await paso1.json();
        let paso3= await JSON.parse(paso2);
        
        for(const item in paso3){
            let contenedorinferior=document.createElement('div');
            contenedorinferior.className="flex flex-col w-40 gap-y-4";

            let tituloh3=document.createElement('h3');
            tituloh3.classList.add("text-sm","text-gray-700");
            let linkh3=document.createElement('a');
            linkh3.href="#";
            let spanh3=document.createElement('span');
            spanh3.setAttribute("aria-hidden",true)
            spanh3.classList.add("absolute","inset-0")
            let ncoti=document.createElement('p');
            ncoti.textContent=paso3[item][1];
            linkh3.appendChild(spanh3);
            linkh3.appendChild(ncoti);
            tituloh3.appendChild(linkh3);

            let parrafo=document.createElement('p');
            // parrafo.classList.add("mt-1","text-sm","text-gray-500");
            parrafo.className="truncate";
            parrafo.textContent=paso3[item][2];

            contenedorinferior.appendChild(tituloh3)
            contenedorinferior.appendChild(parrafo)

            let minicontenedor=document.createElement("div");
            minicontenedor.className="flex flex-col gap-y-2";

            let parrafo3=document.createElement('p');
            parrafo3.classList.add("text-sm","font-medium","text-gray-900");
            parrafo3.textContent="$"+paso3[item][3];

            let parrafo4=document.createElement('p');
            parrafo4.classList.add("text-sm","font-medium","text-gray-900");
            parrafo4.textContent=paso3[item][4];

            minicontenedor.appendChild(parrafo3);
            minicontenedor.appendChild(parrafo4);

            let contenedormedio=document.createElement('div')
            // contenedormedio.classList.add("mt-4","flex","justify-between");
            contenedormedio.className="sm:mt-4 flex-col content-center";
            contenedormedio.appendChild(contenedorinferior)
            contenedormedio.appendChild(minicontenedor)
            // contenedormedio.appendChild(parrafo3)
            // contenedormedio.appendChild(parrafo4)

            let img=document.createElement('img');
            img.src="/logotipo.png";
            img.alt="logo cdk";
            // img.classList.add("aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80");
            // img.className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80";
            img.className="aspect-square w-full rounded-md bg-gray-200 object-contain";

            let contenedorsuperior=document.createElement('div');
            // contenedorsuperior.classList.add("group relative");
            contenedorsuperior.className="group relative flex flex-row gap-x-6 max-[391px]:max-w-[150px] min-[601px]:max-w-[180px]";
            contenedorsuperior.appendChild(img)
            contenedorsuperior.appendChild(contenedormedio)

            document.getElementById("npedis").appendChild(contenedorsuperior);
        }
        // console.log(typeof paso3);
        // console.log(paso3);
    }
    catch(err){
        console.log(err);
        let contenedorinferior=document.createElement('div');

            let tituloh3=document.createElement('h3');
            tituloh3.classList.add("text-sm","text-gray-700");
            let linkh3=document.createElement('a');
            linkh3.href="#";
            let spanh3=document.createElement('span');
            spanh3.setAttribute("aria-hidden",true)
            spanh3.classList.add("absolute","inset-0")
            let ncoti=document.createElement('p');
            ncoti.textContent="SIN RESULTADOS";
            linkh3.appendChild(spanh3);
            linkh3.appendChild(ncoti);
            tituloh3.appendChild(linkh3);

            let parrafo=document.createElement('p');
            parrafo.classList.add("text-sm","font-medium","text-gray-900");
            contenedorinferior.appendChild(tituloh3)
            contenedorinferior.appendChild(parrafo)

            let contenedormedio=document.createElement('div')
            contenedormedio.classList.add("mt-4","flex","justify-between");
            contenedormedio.appendChild(contenedorinferior)

            let img=document.createElement('img');
            img.src="/logotipo.png";
            img.alt="logo cdk";
            // img.classList.add("aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80");
            img.className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80";

            let contenedorsuperior=document.createElement('div');
            // contenedorsuperior.classList.add("group relative");
            contenedorsuperior.className="group relative";
            //contenedorsuperior.appendChild(img)
            contenedorsuperior.appendChild(contenedormedio)

            document.getElementById("npedis").appendChild(contenedorsuperior);
    }
}

async function buscar_dia2(){
    document.getElementById("npedis").innerHTML="";
    let dataenviar=new Object();
    dataenviar.dia=document.getElementById("fecha-dia").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutalistapedixdia,fetchobj)
        let paso2= await paso1.json();
        let paso3= await JSON.parse(paso2);
        
        for(const item in paso3){
            let contenedorinferior=document.createElement('div');
            contenedorinferior.className="flex flex-col w-40 gap-y-4";

            let tituloh3=document.createElement('h3');
            tituloh3.classList.add("text-sm","text-gray-700");
            let linkh3=document.createElement('a');
            linkh3.href="#";
            let spanh3=document.createElement('span');
            spanh3.setAttribute("aria-hidden",true)
            spanh3.classList.add("absolute","inset-0")
            let ncoti=document.createElement('p');
            ncoti.textContent=paso3[item][1];
            linkh3.appendChild(spanh3);
            linkh3.appendChild(ncoti);
            tituloh3.appendChild(linkh3);

            let parrafo=document.createElement('p');
            // parrafo.classList.add("mt-1","text-sm","text-gray-500");
            parrafo.className="truncate";
            parrafo.textContent=paso3[item][2];

            contenedorinferior.appendChild(tituloh3)
            contenedorinferior.appendChild(parrafo)

            let parrafo3=document.createElement('p');
            parrafo3.classList.add("text-sm","font-medium","text-gray-900");
            parrafo3.textContent="$"+paso3[item][3];

            let parrafo4=document.createElement('p');
            parrafo4.classList.add("text-sm","font-medium","text-gray-900");
            parrafo4.textContent=paso3[item][4];

            minicontenedor.appendChild(parrafo3);
            minicontenedor.appendChild(parrafo4);

            let contenedormedio=document.createElement('div')
            // contenedormedio.classList.add("mt-4","flex","justify-between");
            contenedormedio.className="sm:mt-4 flex-col content-center";
            contenedormedio.appendChild(contenedorinferior)
            contenedormedio.appendChild(minicontenedor)
            // contenedormedio.appendChild(parrafo3)
            // contenedormedio.appendChild(parrafo4)

            let img=document.createElement('img');
            img.src="/logotipo.png";
            img.alt="logo cdk";
            // img.classList.add("aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80");
            // img.className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80";
            img.className="aspect-square w-full rounded-md bg-gray-200 object-contain";

            let contenedorsuperior=document.createElement('div');
            // contenedorsuperior.classList.add("group relative");
            contenedorsuperior.className="group relative flex flex-row gap-x-6 max-[391px]:max-w-[150px] min-[601px]:max-w-[180px]";
            contenedorsuperior.appendChild(img)
            contenedorsuperior.appendChild(contenedormedio)

            document.getElementById("npedis").appendChild(contenedorsuperior);
        }
        // console.log(typeof paso3);
        // console.log(paso3);
    }
    catch(err){
        console.log(err);
        let contenedorinferior=document.createElement('div');

            let tituloh3=document.createElement('h3');
            tituloh3.classList.add("text-sm","text-gray-700");
            let linkh3=document.createElement('a');
            linkh3.href="#";
            let spanh3=document.createElement('span');
            spanh3.setAttribute("aria-hidden",true)
            spanh3.classList.add("absolute","inset-0")
            let ncoti=document.createElement('p');
            ncoti.textContent="SIN RESULTADOS";
            linkh3.appendChild(spanh3);
            linkh3.appendChild(ncoti);
            tituloh3.appendChild(linkh3);

            let parrafo=document.createElement('p');
            parrafo.classList.add("text-sm","font-medium","text-gray-900");
            contenedorinferior.appendChild(tituloh3)
            contenedorinferior.appendChild(parrafo)

            let contenedormedio=document.createElement('div')
            contenedormedio.classList.add("mt-4","flex","justify-between");
            contenedormedio.appendChild(contenedorinferior)

            let img=document.createElement('img');
            img.src="logotipo.png";
            img.alt="Front of men&#039;s Basic Tee in black.";
            // img.classList.add("aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80");
            img.className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80";

            let contenedorsuperior=document.createElement('div');
            // contenedorsuperior.classList.add("group relative");
            contenedorsuperior.className="group relative";
            //contenedorsuperior.appendChild(img)
            contenedorsuperior.appendChild(contenedormedio)

            document.getElementById("npedis").appendChild(contenedorsuperior);
    }
}