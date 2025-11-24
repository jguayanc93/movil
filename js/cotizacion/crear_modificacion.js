
document.getElementById("crear-modificacion").addEventListener("click",()=>{
    modificacion_terminada();
})

async function modificacion_terminada(){
    let dataenviar=new Object();
    dataenviar.item=cotimodi_tmpitems;
    
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        // let paso1=await fetch(rutacotizacioncmodificacion,fetchobj)
        let paso1=await fetch(rutacotizacionactualizar,fetchobj)
        // let paso2=await paso1.json();
        let paso2=await paso1.text();
        console.log("esta seria la respuesta",paso2)

        cotimodi_tipcli.length=0;
        for(let propiedad in cotimodi_tmpitems){
            if(cotimodi_tmpitems.hasOwnProperty(propiedad)) delete cotimodi_tmpitems[propiedad];
        }
        
        ////mostrar un texto temporal segun resultado despues de la eliminacion de residuos para otra modificacion

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
    interior1.textContent=`${paso2}`;
    let interior2=document.createElement('div');
    interior2.className="mt-2";
    // let parrafo=document.createElement('p');
    // parrafo.className="text-sm text-gray-500";
    // parrafo.textContent=`Esta seguro que desea agregar este producto 12`;
    // let interior3=document.createElement('h3');
    // interior3.className="text-base font-semibold text-gray-900";
    // interior3.textContent="UNIDADES";
    // let interior4=document.createElement('div');
    // interior4.className="mt-2";
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
    boton1.disabled=false;
    boton1.textContent="OK";
    // boton1.id="producto-confirmado";
    boton1.addEventListener('click',cancelar_confirmacion)
    // boton1.addEventListener("click",()=>{
    //     let cantidad= document.getElementById("cantidades");
    //     verificador(codi,cantidad.value)
    // });
    // let boton2=document.createElement('button');
    // boton2.className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto";
    // boton2.setAttribute("type","button");
    // boton2.textContent="OK";
    // boton2.addEventListener('click',cancelar_confirmacion)

    parte2.appendChild(boton1);
    // parte2.appendChild(boton2);

    // interior2.appendChild(parrafo);
    // interior4.appendChild(parrafo2);
    capa7.appendChild(interior1);
    capa7.appendChild(interior2);
    // capa7.appendChild(interior3);
    // capa7.appendChild(interior4);
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
    catch(err){
        cotimodi_tipcli.length=0;
        for(let propiedad in cotimodi_tmpitems){
            if(cotimodi_tmpitems.hasOwnProperty(propiedad)) delete cotimodi_tmpitems[propiedad];
        }
        console.log(err);
    }
}

function cancelar_confirmacion(){
    document.getElementById("modal-aceptacion").innerHTML="";
    document.getElementById("contendor-final-final").innerHTML="";
    document.getElementById("productos-cotizacion-detallada").innerHTML="";
}