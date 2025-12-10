
document.addEventListener('DOMContentLoaded',cargamarcas)

async function cargamarcas(){
    let dataenviar=new Object();
    // dataenviar.marcas=document.getElementById("").value;
    dataenviar.marcas="traeme las marcas";
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    // let principal=document.getElementById("contenedor-marcas");

    ////CREACION DE LOS COMPONENETES PARA LAS MARCAS A SER MOSTRADAS
    let contenedor2=document.createElement('div');
    contenedor2.className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8";
    
    let elemento_superior1=document.createElement('h2');
    elemento_superior1.className="sr-only";
    elemento_superior1.textContent="Marcas";

    let elemento_superior2=document.createElement('div');
    elemento_superior2.className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8";

    try{
        let paso1= await fetch(rutamarcas,fetchobj)
        let paso2= await paso1.json();
        let paso3= await JSON.parse(paso2);
        console.log(paso3);

        for(const marc in paso3){
            let enlace=document.createElement('a');
            enlace.className="group";

            // let image=document.createElement('img');
            // image.src='logotipo.png';
            // image.alt='error al cargar la imagen';
            // image.className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8";

            let encabesado=document.createElement('h3');
            encabesado.className="mt-4 text-sm text-gray-700";
            encabesado.textContent=paso3[marc][2];

            let parrafo=document.createElement('p');
            parrafo.className="mt-1 text-lg font-medium text-gray-900";
            parrafo.textContent=paso3[marc][2];
            parrafo.addEventListener('click',vista_descargas)

            // enlace.appendChild(image)
            enlace.appendChild(encabesado)
            enlace.appendChild(parrafo)
            elemento_superior2.appendChild(enlace);
        }
        contenedor2.appendChild(elemento_superior1)
        contenedor2.appendChild(elemento_superior2)
        document.getElementById("contenedor-marcas").appendChild(contenedor2)
    }
    catch(err){
        console.log(err)
    }
}

function vista_descargas(ev){
    console.log(marca_seleccionada);
    marca_seleccionada=ev.target.textContent;
    console.log(marca_seleccionada);
    document.getElementById("contenedor-marcas").classList.add('hidden');
    document.getElementById("tipo-descarga").classList.remove('hidden');
    // let contenedor_principal1=document.createElement('div');
    // contenedor_principal1.className="px-4 sm:px-0";
    // let titulo=document.createElement('h3')
    // titulo.className="text-base/7 font-semibold text-gray-900";
    // titulo.textContent="DESCARGAS ENCONTRADAS";
    // let parrafo=document.createElement('p')
    // parrafo.className="mt-1 max-w-2xl text-sm/6 text-gray-500";
    // parrafo.textContent="Seleccione una opcion para iniciar su descarga";

    // let contenedor_principal2=document.createElement('div');
    // contenedor_principal2.className="mt-6 border-t border-gray-100";
    // let paso2=document.createElement('dl');
    // paso2.className="divide-y divide-gray-100";

    // let paso3=document.createElement('div')
    // paso3.className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0";

    // let paso4=document.createElement('dt')
    // paso4.className="text-sm/6 font-medium text-gray-900";
    // paso4.textContent="Attachments";

    // let paso5=document.createElement('dd')
    // paso5.className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"

    // let paso6=document.createElement('dd')
}