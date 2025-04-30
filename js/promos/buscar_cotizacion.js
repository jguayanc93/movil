
document.getElementById("buscar-coti").addEventListener("click",()=>{
    // let ncoti=document.getElementById("ncoti").value;
    buscar_cotizacion2();
})

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
        document.getElementById("contendor-final-final").innerHTML="";
        
        let paso1=await fetch(rutacotizacion,fetchobj)
        let paso2=await paso1.json();
        let paso3=await JSON.parse(paso2);
        await buscar_pivot();
        
        coti_cant=Object.keys(paso3).length;
        ///creacion del cuerpo
        let cuerpo1=document.createElement('h2');
        cuerpo1.className="text-lg font-medium text-gray-900";
        cuerpo1.textContent="Lista Productos";
        let cuerpo2=document.createElement('div');
        cuerpo2.className="flex items-start justify-between";
        cuerpo2.appendChild(cuerpo1);
        let cuerpo3=document.createElement('div');
        cuerpo3.className="flex-1 overflow-y-auto px-4 py-6 sm:px-6";
        cuerpo3.appendChild(cuerpo2);

        let cuerpo4=document.createElement('div');
        cuerpo4.className="mt-8";
        let cuerpo5=document.createElement('div');
        cuerpo5.className="flow-root";

        let productos_cotizacion_detallada=document.createElement('ul');
        productos_cotizacion_detallada.role="list";
        productos_cotizacion_detallada.className="-my-6 divide-y divide-gray-200";
        
        for(let indice in paso3){
            let parrafo1=document.createElement('p')
            parrafo1.className="mt-1 text-sm text-gray-500";
            parrafo1.textContent=paso3[indice][0];
            let contenedor1=document.createElement('div');
            contenedor1.className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200";
            contenedor1.appendChild(parrafo1);

            let enlace=document.createElement('a')
            enlace.textContent=paso3[indice][2];
            let titulo=document.createElement('h3');
            titulo.appendChild(enlace);
            let parrafo2=document.createElement('p');
            parrafo2.className="ml-4";
            parrafo2.textContent=`$${paso3[indice][5]}`;
            let contenedor2=document.createElement('div')
            contenedor2.className="flex justify-between text-base font-medium text-gray-900";
            contenedor2.appendChild(titulo);
            contenedor2.appendChild(parrafo2);
            let parrafo3=document.createElement('p')
            parrafo3.className="mt-1 text-sm text-gray-500";
            parrafo3.textContent=paso3[indice][1];

            let contenedor_vacio=document.createElement('div');
            contenedor_vacio.appendChild(contenedor2)
            contenedor_vacio.appendChild(parrafo3)

            let boton1=document.createElement('button');
            boton1.type="button";
            boton1.className="font-medium text-indigo-600 hover:text-indigo-500";
            boton1.textContent=`Cant. ${paso3[indice][3]}`;
            let contenedor3=document.createElement('div');
            contenedor3.className="flex";
            contenedor3.appendChild(boton1);
            let parrafo4=document.createElement('p')
            parrafo4.className="text-gray-500";
            parrafo4.textContent=`P.Unit ${paso3[indice][4]}`;
            let contenedor4=document.createElement('div')
            contenedor4.className="flex flex-1 items-end justify-between text-sm";
            contenedor4.appendChild(parrafo4)
            contenedor4.appendChild(contenedor3);

            let boton2=document.createElement('button')
            boton2.type="button";
            boton2.className="font-medium text-indigo-600 hover:text-indigo-500";
            boton2.textContent=`Alm.${paso3[indice][7]}`;
            let contenedor5=document.createElement('div');
            contenedor5.className="flex";
            contenedor5.appendChild(boton2);
            let parrafo5=document.createElement('p')
            parrafo5.className="text-gray-500";
            parrafo5.textContent=`Dscto% ${paso3[indice][6]}`;
            let contenedor6=document.createElement('div')            
            contenedor6.className="flex flex-1 items-end justify-between text-sm";
            contenedor6.appendChild(parrafo5)
            contenedor6.appendChild(contenedor5)

            let contenedor7=document.createElement('div');
            contenedor7.className="ml-4 flex flex-1 flex-col";
            contenedor7.appendChild(contenedor_vacio);
            contenedor7.appendChild(contenedor4)
            contenedor7.appendChild(contenedor6)
            
            let fila=document.createElement('li')
            fila.className="flex py-6";
            fila.appendChild(contenedor1)
            fila.appendChild(contenedor7)

            // document.getElementById("productos-cotizacion-detallada").appendChild(fila);
            productos_cotizacion_detallada.appendChild(fila);
        }

        cuerpo5.appendChild(productos_cotizacion_detallada);
        cuerpo4.appendChild(cuerpo5);

        cuerpo3.appendChild(cuerpo4);

        let parrafo6=document.createElement('p');
        parrafo6.className="mt-0.5 text-sm text-gray-500";
        parrafo6.textContent="Listado de productos detallado.";
        //////espacio para la busqueda de promos
        let boton_prom=document.createElement('button');
        boton_prom.className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
        boton_prom.textContent="Buscar Promociones";
        boton_prom.addEventListener('click',()=>{
            esperador(promos_conjunto_diferenciales);
        })
        ///////////////////
        let cuerpo6=document.createElement('div');
        cuerpo6.className="border-t border-gray-200 px-4 py-6 sm:px-6";
        cuerpo6.appendChild(parrafo6);
        cuerpo6.appendChild(boton_prom);

        let cuerpo7=document.createElement('div');
        cuerpo7.className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl";
        cuerpo7.appendChild(cuerpo3)
        cuerpo7.appendChild(cuerpo6)

        document.getElementById("contendor-final-final").appendChild(cuerpo7);

        // buscar_pivot();
    }
    catch(err){
        console.log(err);

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
            interior1.textContent="COTIZACION";
            let interior2=document.createElement('div');
            interior2.className="mt-2";
            let parrafo=document.createElement('p');
            parrafo.className="text-sm text-gray-500";
            parrafo.textContent="cotizacion ya tiene referencia";
            let interior3=document.createElement('h3');
            interior3.className="text-base font-semibold text-gray-900";
            interior3.textContent="INVALIDA";
            let interior4=document.createElement('div');
            interior4.className="mt-2";
            // let parrafo2=document.createElement('input')
            // parrafo2.type="number";
            // parrafo2.id="cantidades";
            // parrafo2.className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-black shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto";
            // parrafo2.placeholder="ingresa la cantidad";
            
        
            let parte2=document.createElement('div');
            parte2.className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6";
            // let boton1=document.createElement('button');
            // boton1.className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto";
            // boton1.setAttribute("type","button");
            // boton1.disabled=true;
            // boton1.textContent="SI";
            // boton1.id="producto-confirmado";
            
            
            let boton2=document.createElement('button');
            boton2.className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto";
            boton2.setAttribute("type","button");
            boton2.textContent="CERRAR";
            boton2.addEventListener('click',()=>{
                // document.getElementById("").value="";////para borrar lo que digito
                document.getElementById("modal-aceptacion").innerHTML="";
            })
        
            // parte2.appendChild(boton1);
            parte2.appendChild(boton2);
        
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
}