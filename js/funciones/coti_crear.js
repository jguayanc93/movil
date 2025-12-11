
async function generador_coti(){
    let dataenviar=new Object();
    dataenviar.cliente=cliente_data;
    dataenviar.productos=agrupacion;
    dataenviar.promos=promos_insertadas;
    dataenviar.alm=almc_id;

    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1 = await fetch(rutacotizacioncrear,fetchobj)
        let paso2 = await paso1.json();
        console.log("verificar lo que esta regresando por consultas");
        console.log(paso2);
        ///BORRANDO DATOS GUARDADOS DE LA COTI
        cliente_data.length=0;
        almc_id='01';
        for(let prod in agrupacion) if(agrupacion.hasOwnProperty(prod)) delete agrupacion[prod];
        confirmar_creacion();
    }
    catch(err){
        console.log(err);
    }
}

function confirmar_creacion(){
    document.getElementById("recorrer-productos").innerHTML="";

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
    let capa7=document.createElement('div');
    capa7.className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left";
    let interior1=document.createElement('h3');
    interior1.className="text-base font-semibold text-gray-900";
    interior1.textContent="COTIZACION CREADA CON EXITO";
    let interior2=document.createElement('div');
    interior2.className="mt-2";
    let parrafo=document.createElement('p');
    parrafo.className="text-sm text-gray-500";
    parrafo.textContent=`Revisar cotizacion numero 009-00`;
    let interior3=document.createElement('h3');
    interior3.className="text-base font-semibold text-gray-900";
    interior3.textContent="UNIDADES";
    let interior4=document.createElement('div');
    interior4.className="mt-2";
    // let parrafo2=document.createElement('input')
    // parrafo2.type="number";
    // parrafo2.id="cantidades";
    // parrafo2.className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-black shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto";
    // parrafo2.placeholder="ingresa la cantidad";
    // parrafo2.addEventListener('input',activar_boton_confirmacion)
    

    let parte2=document.createElement('div');
    parte2.className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6";
    let boton1=document.createElement('button');
    boton1.className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto";
    boton1.setAttribute("type","button");
    boton1.disabled=true;
    boton1.textContent="OK";
    boton1.id="producto-confirmado";
    boton1.addEventListener("click",()=>{
        vendedor_confirmado();
    })

    parte2.appendChild(boton1);
    // parte2.appendChild(boton2);

    interior2.appendChild(parrafo);
    // interior4.appendChild(parrafo2);
    capa7.appendChild(interior1);
    capa7.appendChild(interior2);
    capa7.appendChild(interior3);
    capa7.appendChild(interior4);
    capa6.appendChild(capa7);
    capa5.appendChild(capa6);
    capa4.appendChild(capa5);
    capa4.appendChild(parte2);
    capa3.appendChild(capa4);
    capa2.appendChild(capa3);
    capa1.appendChild(capa2);

    document.getElementById("modal-aceptacion").appendChild(capa1);
    document.getElementById("modal-aceptacion").classList.remove('hidden');
}

function vendedor_confirmado(){
    window.location.assign('https://landing.compudiskett.com.pe/main.html');
}