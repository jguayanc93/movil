
document.getElementById("buscar-coti").addEventListener("click",(ev)=>{
    buscar_cotizacion_modificar();
    // ev.target.value!='' ? buscar_producto() : document.getElementById("recorrer-productos").innerHTML="";
})


async function buscar_cotizacion_modificar(){
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
        
        let paso1=await fetch(rutacotizacionleer,fetchobj)
        let paso2=await paso1.json();
        let paso3=await JSON.parse(paso2);
        console.log("esto es lo que trae la ruta ver factura",paso3)
        cotimodi_tipcli.push(paso3[0][0]);///clialfabeto
        cotimodi_tipcli.push(paso3[0][1]);///fecha
        cotimodi_tipcli.push(paso3[0][2]);///cdocu
        cotimodi_tipcli.push(paso3[0][3]);///documento
        cotimodi_tipcli.push(paso3[0][4]);///codcliente
        cotimodi_tipcli.push(paso3[0][5]);///tcambio
        cotimodi_tipcli.push(paso3[0][6]);///mone
        cotimodi_tipcli.push(paso3[0][7]);///moneitem
        cotimodi_tipcli.push(paso3[0][20]);///moneitem

        /////guardando temporalmente los items
        for(const item in paso3) cotimodi_tmpitems[paso3[item][10]]=[paso3[item][1],paso3[item][2],paso3[item][3],paso3[item][4],paso3[item][5],paso3[item][6],paso3[item][7],paso3[item][8],paso3[item][9],paso3[item][10],paso3[item][11],paso3[item][12],paso3[item][13],paso3[item][14],paso3[item][15],paso3[item][16],paso3[item][17],paso3[item][18],paso3[item][19],paso3[item][20],paso3[item][21],paso3[item][22]];
        
        console.log(cotimodi_tipcli);
        
        // coti_cant=Object.keys(paso3).length;
        ///creacion del cuerpo
        let cuerpo1=document.createElement('h2');
        cuerpo1.className="text-lg font-medium text-gray-900";
        cuerpo1.textContent="Lista de productos";
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
        /////INGRESAR EN ESTA LISTA LOS ITEMS A AGREGAR
        let productos_cotizacion_detallada=document.createElement('ul');
        productos_cotizacion_detallada.id="aqui-nuevos";
        productos_cotizacion_detallada.role="list";
        productos_cotizacion_detallada.className="-my-6 divide-y divide-gray-200";
        
        for(let indice in cotimodi_tmpitems){
            let parrafo1=document.createElement('p')
            parrafo1.className="mt-1 text-sm text-gray-500";
            parrafo1.textContent=cotimodi_tmpitems[indice][10];
            let contenedor1=document.createElement('div');
            contenedor1.className="h-full size-16 shrink-0 overflow-hidden rounded-md border border-gray-200";
            contenedor1.appendChild(parrafo1);

            let enlace=document.createElement('a')
            enlace.textContent=cotimodi_tmpitems[indice][13];
            let titulo=document.createElement('h3');
            titulo.appendChild(enlace);
            let parrafo2=document.createElement('p');
            parrafo2.className="ml-4";
            parrafo2.textContent=`$${cotimodi_tmpitems[indice][16]}`;
            let contenedor2=document.createElement('div')
            contenedor2.className="flex justify-between text-base font-medium text-gray-900";
            contenedor2.appendChild(titulo);
            contenedor2.appendChild(parrafo2);
            let parrafo3=document.createElement('p')
            parrafo3.className="mt-1 text-sm text-gray-500";
            parrafo3.textContent=cotimodi_tmpitems[indice][11];

            let contenedor_vacio=document.createElement('div');
            contenedor_vacio.appendChild(contenedor2)
            contenedor_vacio.appendChild(parrafo3)

            /////CAMBIAR LAS CANTIDADES SOLICITADAS
            let boton1=document.createElement('button');
            boton1.type="button";
            boton1.className="font-medium text-indigo-600 hover:text-indigo-500";
            boton1.textContent=`Cant. ${cotimodi_tmpitems[indice][14]}`;
            boton1.addEventListener('click',()=>{
                console.log(`cambiando esta cantidad ${cotimodi_tmpitems[indice][14]}`);
                cambiar_cantidad(cotimodi_tmpitems[indice][9],cotimodi_tmpitems[indice][13],cotimodi_tmpitems[indice][14]);
            })

            let contenedor3=document.createElement('div');
            contenedor3.className="flex";
            contenedor3.appendChild(boton1);
            let parrafo4=document.createElement('p')
            parrafo4.className="text-gray-500";
            parrafo4.textContent=`P.Unit ${cotimodi_tmpitems[indice][15]}`;
            let contenedor4=document.createElement('div')
            contenedor4.className="flex flex-1 items-end justify-between text-sm";
            contenedor4.appendChild(parrafo4)
            contenedor4.appendChild(contenedor3);

            //////REMOVER ESTO Y CONVERTIRLO EN UN BOTON PARA ELIMINAR EL PRODUCTO DE LA COTI
            let boton2=document.createElement('button')
            boton2.type="button";
            boton2.className="font-medium text-indigo-600 hover:text-indigo-500";
            // boton2.textContent=`Alm.${paso3[indice][0]}`;
            boton2.textContent="Remover";
            boton2.addEventListener('click',()=>{
                // document.getElementById("contendor-final-final").innerHTML="";
                document.getElementById("aqui-nuevos").innerHTML="";
                console.log("eliminado")
                volver_correr(cotimodi_tmpitems[indice][9]);
            });
            
            let contenedor5=document.createElement('div');
            contenedor5.className="flex";
            contenedor5.appendChild(boton2);
            
            let parrafo5=document.createElement('p')
            parrafo5.className="text-gray-500";
            parrafo5.textContent=`Dscto% ${cotimodi_tmpitems[indice][17]}`;
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
            fila.className="flex py-6 items-center";
            fila.appendChild(contenedor1)
            fila.appendChild(contenedor7)

            // document.getElementById("productos-cotizacion-detallada").appendChild(fila);
            productos_cotizacion_detallada.appendChild(fila);
        }

        cuerpo5.appendChild(productos_cotizacion_detallada);
        cuerpo4.appendChild(cuerpo5);

        cuerpo3.appendChild(cuerpo4);

        // let parrafo6=document.createElement('p');
        // parrafo6.className="mt-0.5 text-sm text-gray-500";
        // parrafo6.textContent="Listado de productos detallado.";
        //////espacio para la busqueda de promos
        let boton_prom=document.createElement('button');
        boton_prom.className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
        boton_prom.textContent="AGREGAR PRODUCTO";
        boton_prom.addEventListener('click',()=>{ coti_item_new();
            // esperador(promos_conjunto_diferenciales);
        })
        ///////////////////
        let cuerpo6=document.createElement('div');
        cuerpo6.className="border-t border-gray-200 px-12 py-6";
        // cuerpo6.appendChild(parrafo6);
        cuerpo6.appendChild(boton_prom);

        let cuerpo7=document.createElement('div');
        cuerpo7.className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl";
        cuerpo7.appendChild(cuerpo3)
        cuerpo7.appendChild(cuerpo6)

        document.getElementById("contendor-final-final").appendChild(cuerpo7);

        /////////////ESPACIO PARA MOSTRAR EL BUSCADOR DE LA BUSUQEDA DE NUEVOS PRODUCTOS
        
    }
    catch(err){ console.log(err); }
}

function coti_item_new(){
    let new_item=document.getElementById('cotimodificar-buscarnuevoproducto');
    
    let parrafo=document.createElement('label');
    parrafo.className="block text-sm/6 font-medium text-gray-900";
    parrafo.textContent="Busca Producto:";

    let contenedor1=document.createElement('div');
    contenedor1.className="mt-2";
    let contenedor2=document.createElement('div');
    contenedor2.className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600";
    let contenedor3=document.createElement('div');
    contenedor3.className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6";

    let boton_voz=document.createElement('button');
    boton_voz.id='cotivoz';
    boton_voz.disabled
    boton_voz.textContent='presionar';
    // contenedor3.appendChild(boton_voz);

    let busqueda=document.createElement('input');
    busqueda.type='search';
    busqueda.id='producto';
    busqueda.className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6';
    busqueda.placeholder='buscalo por';
    // busqueda.addEventListener('input',buscar_producto)
    busqueda.addEventListener('input',(ev)=>{
        document.getElementById("recorrer-productos").innerHTML="";
        ev.target.value!='' ? buscar_producto() : document.getElementById("recorrer-productos").innerHTML="";
    })

    let contenedor4=document.createElement('div');
    contenedor4.className='grid shrink-0 grid-cols-1 focus-within:relative';

    let opciones=document.createElement('select');
    opciones.id='currency2';
    opciones.name='currency2';
    opciones.ariaLabel="Currency";
    opciones.className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6";
    let opcion1=document.createElement('option')
    opcion1.value='1'
    opcion1.textContent='nombre'
    let opcion2=document.createElement('option')
    opcion2.value='2'
    opcion2.textContent='partnumber'
    opciones.appendChild(opcion1)
    opciones.appendChild(opcion2)

    contenedor4.appendChild(opciones);

    contenedor2.appendChild(contenedor3);
    contenedor2.appendChild(busqueda);
    contenedor2.appendChild(contenedor4);
    contenedor1.appendChild(contenedor2);

    new_item.appendChild(parrafo);
    new_item.appendChild(contenedor1);
}


async function buscar_producto(){
    let dataenviar=new Object();
    dataenviar.sugerencia=document.getElementById("producto").value;
    dataenviar.tipbusq=document.getElementById("currency2").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1=await fetch(rutabproducto,fetchobj)
        let paso2=await paso1.json();
        let paso3=await JSON.parse(paso2);
        console.log("que es lo q trae la busqueda de producto")
        console.log(paso3);

        let contenedor_general=document.createElement('div');
        contenedor_general.className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4";

        let contenedor_general1=document.createElement('div');
        contenedor_general1.className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5";

        let contenedor_general2=document.createElement('div');
        contenedor_general2.className="p-4";   
        
        for(let indice in paso3){
            
            let contenedor_general3=document.createElement('div')
            contenedor_general3.className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50";

            let contenedor1=document.createElement('div');
            let enlace_descripcion_titulo=document.createElement('a');
            enlace_descripcion_titulo.href="#";
            enlace_descripcion_titulo.className="font-semibold text-gray-900";
            enlace_descripcion_titulo.textContent="DESCRIPCION";
            let spamcito=document.createElement('span');
            spamcito.className="absolute inset-0";
            enlace_descripcion_titulo.appendChild(spamcito)          
            let parrafo_descripcion_data=document.createElement('p')
            parrafo_descripcion_data.className="mt-1 text-gray-600";
            parrafo_descripcion_data.textContent=paso3[indice][1];
            

            contenedor1.appendChild(enlace_descripcion_titulo);
            contenedor1.appendChild(parrafo_descripcion_data);

            let contenedor2=document.createElement('div');
            let enlace_descripcion_titulo2=document.createElement('a');            
            enlace_descripcion_titulo2.className="font-semibold text-gray-900";
            enlace_descripcion_titulo2.textContent="PRINCIPAL";
            let spamcito2=document.createElement('span');
            spamcito2.className="absolute inset-0";
            enlace_descripcion_titulo2.appendChild(spamcito2)
            let parrafo_descripcion_data2=document.createElement('p')
            parrafo_descripcion_data2.className="mt-1 text-gray-600";
            parrafo_descripcion_data2.textContent=paso3[indice][2];

            contenedor2.appendChild(enlace_descripcion_titulo2);
            contenedor2.appendChild(parrafo_descripcion_data2);

            let contenedor3=document.createElement('div');
            let enlace_descripcion_titulo3=document.createElement('a');
            enlace_descripcion_titulo3.className="font-semibold text-gray-900";
            enlace_descripcion_titulo3.textContent="M&M";
            let spamcito3=document.createElement('span');
            spamcito3.className="absolute inset-0";
            // spamcito3.addEventListener('click',prod);
            enlace_descripcion_titulo3.appendChild(spamcito3)
            let parrafo_descripcion_data3=document.createElement('p')
            parrafo_descripcion_data3.className="mt-1 text-gray-600";
            parrafo_descripcion_data3.textContent=paso3[indice][3];
            
            contenedor3.appendChild(enlace_descripcion_titulo3);
            contenedor3.appendChild(parrafo_descripcion_data3);
            
            contenedor_general3.appendChild(contenedor1);
            contenedor_general3.appendChild(contenedor2);
            contenedor_general3.appendChild(contenedor3);
            contenedor3.addEventListener('click',()=>prod(paso3[indice][0],paso3[indice][1],paso3[indice][2],paso3[indice][3]));
            // document.getElementById("recorrer-productos").appendChild(contenedor_general3);
            contenedor_general2.appendChild(contenedor_general3);
           
        }

        contenedor_general1.appendChild(contenedor_general2);
        contenedor_general.appendChild(contenedor_general1);

        document.getElementById("recorrer-productos").appendChild(contenedor_general);

    }
    catch(err){ console.log(err); }
}

function prod(codi,descr,stock1,stock2){
    console.log("llege ala seleccion del producto seleccionado");
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
    interior1.textContent="AGREGAR PRODUCTO";
    let interior2=document.createElement('div');
    interior2.className="mt-2";
    let parrafo=document.createElement('p');
    parrafo.className="text-sm text-gray-500";
    parrafo.textContent=`Esta seguro que desea agregar este producto ${descr}`;
    let interior3=document.createElement('h3');
    interior3.className="text-base font-semibold text-gray-900";
    interior3.textContent="UNIDADES";
    let interior4=document.createElement('div');
    interior4.className="mt-2";
    let parrafo2=document.createElement('input')
    parrafo2.type="number";
    parrafo2.id="cantidades";
    parrafo2.className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-black shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto";
    parrafo2.placeholder="ingresa la cantidad";
    parrafo2.addEventListener('input',activar_boton_confirmacion)
    

    let parte2=document.createElement('div');
    parte2.className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6";
    let boton1=document.createElement('button');
    boton1.className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto";
    boton1.setAttribute("type","button");
    boton1.disabled=true;
    boton1.textContent="SI";
    boton1.id="producto-confirmado";
    // boton1.addEventListener("click",verificador);
    boton1.addEventListener("click",()=>{
        let cantidad=document.getElementById("cantidades");
        verificador(codi,cantidad.value)
    });
    let boton2=document.createElement('button');
    boton2.className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto";
    boton2.setAttribute("type","button");
    boton2.textContent="NO";
    boton2.addEventListener('click',cancelar_confirmacion)

    parte2.appendChild(boton1);
    parte2.appendChild(boton2);

    interior2.appendChild(parrafo);
    interior4.appendChild(parrafo2);
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



function cancelar_confirmacion(){
    document.getElementById("producto").value="";
    document.getElementById("modal-aceptacion").innerHTML="";
}

function activar_boton_confirmacion(ev){
    let valor=ev.target.value;
    let tipo=parseInt(valor);

    if(!isNaN(tipo)){
        console.log("si es un entero");
        console.log(parseInt(tipo))
        document.getElementById("producto-confirmado").disabled=false;
    }
    else{
        document.getElementById("producto-confirmado").disabled=true;
        console.log("no es valido tu entero")
    }
}

function verificador(codi,cantidad){
    console.log("llege ala validacion del producto identificado");
    ////////enviar ala otra funcion
    //////////revisar q pasa con la variable global y el dismis de la alerta
    // document.getElementById("producto").value="";
    document.getElementById("modal-aceptacion").innerHTML="";
    tblprd3(codi,cantidad);
}

async function tblprd3(cprd,stoc){
    console.log(cotimodi_tipcli)
    console.log(cotimodi_tipcli[0])
    document.getElementById("cotimodificar-buscarnuevoproducto").innerHTML="";
    // document.getElementById("producto").innerHTML="";
    document.getElementById("aqui-nuevos").innerHTML="";
    // document.getElementById("seleccionar-productos").innerHTML="";
    let dataenviar=new Object();
    dataenviar.sugerencia=cprd;
    dataenviar.cctl=cotimodi_tipcli[0];
    dataenviar.ccli=cotimodi_tipcli[4];
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1=await fetch(rutacotizacionbprdagregar,fetchobj)
        let paso2=await paso1.json();
        let paso3=await JSON.parse(paso2);
        
        let dsct_sacado=(paso3[8]*(paso3[9]/100));
        // let tota=((paso3[8]-dsct_sacado)*stoc).toFixed(2);
        let tota=parseFloat((paso3[8]-dsct_sacado).toFixed(2))*stoc;
        let totn=tota*1.18;
        // cotimodi_tmpitems[paso3[2]]=[sacar_fecha,sacar_doc,paso3[0],paso3[1],stoc,paso3[4],tota,paso3[5],paso3[6],paso3[7]];
        cotimodi_tmpitems[paso3[2]]=[cotimodi_tipcli[1],cotimodi_tipcli[2],cotimodi_tipcli[3],cotimodi_tipcli[4],cotimodi_tipcli[5],cotimodi_tipcli[6],cotimodi_tipcli[7],paso3[0],paso3[1],paso3[2],paso3[3],paso3[4],paso3[5],paso3[6],stoc,paso3[8],tota,paso3[9],totn,cotimodi_tipcli[8],paso3[10],paso3[11]];

        volver_correr();
    }
    catch(err){
        console.log(err);
    }
}

function volver_correr(coti){
    delete cotimodi_tmpitems[coti];

    console.log(cotimodi_tmpitems);

    // let cuerpo1=document.createElement('h2');
    //     cuerpo1.className="text-lg font-medium text-gray-900";
    //     cuerpo1.textContent="Lista Productos";
    //     let cuerpo2=document.createElement('div');
    //     cuerpo2.className="flex items-start justify-between";
    //     cuerpo2.appendChild(cuerpo1);
    //     let cuerpo3=document.createElement('div');
    //     cuerpo3.className="flex-1 overflow-y-auto px-4 py-6 sm:px-6";
    //     cuerpo3.appendChild(cuerpo2);

    //     let cuerpo4=document.createElement('div');
    //     cuerpo4.className="mt-8";
    //     let cuerpo5=document.createElement('div');
    //     cuerpo5.className="flow-root";
    //     //////INGRESAR EN ESTA LISTA LOS ITEMS A AGREGAR
    //     let productos_cotizacion_detallada=document.createElement('ul');
    //     productos_cotizacion_detallada.id="aqui-nuevos";
    //     productos_cotizacion_detallada.role="list";
    //     productos_cotizacion_detallada.className="-my-6 divide-y divide-gray-200";
        //////CORREGIR LA FUNCION DE VUELTA PORQE CREA UN NUEVO CONTENEDOR CUANDO SOLO DEVE CREAR LISTAS
        for(let indice in cotimodi_tmpitems){
            let parrafo1=document.createElement('p')
            parrafo1.className="mt-1 text-sm text-gray-500";
            parrafo1.textContent=cotimodi_tmpitems[indice][10];
            let contenedor1=document.createElement('div');
            contenedor1.className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200";
            contenedor1.appendChild(parrafo1);

            let enlace=document.createElement('a')
            enlace.textContent=cotimodi_tmpitems[indice][13];
            let titulo=document.createElement('h3');
            titulo.appendChild(enlace);
            let parrafo2=document.createElement('p');
            parrafo2.className="ml-4";
            parrafo2.textContent=`$${cotimodi_tmpitems[indice][16]}`;
            let contenedor2=document.createElement('div')
            contenedor2.className="flex justify-between text-base font-medium text-gray-900";
            contenedor2.appendChild(titulo);
            contenedor2.appendChild(parrafo2);
            let parrafo3=document.createElement('p')
            parrafo3.className="mt-1 text-sm text-gray-500";
            parrafo3.textContent=cotimodi_tmpitems[indice][11];

            let contenedor_vacio=document.createElement('div');
            contenedor_vacio.appendChild(contenedor2)
            contenedor_vacio.appendChild(parrafo3)

            /////CAMBIAR LAS CANTIDADES SOLICITADAS
            let boton1=document.createElement('button');
            boton1.type="button";
            boton1.className="font-medium text-indigo-600 hover:text-indigo-500";
            boton1.textContent=`Cant. ${cotimodi_tmpitems[indice][14]}`;
            boton1.addEventListener('click',()=>{
                console.log(`cambiando esta cantidad ${cotimodi_tmpitems[indice][14]}`)
                cambiar_cantidad(cotimodi_tmpitems[indice][9],cotimodi_tmpitems[indice][13],cotimodi_tmpitems[indice][14])
            })

            let contenedor3=document.createElement('div');
            contenedor3.className="flex";
            contenedor3.appendChild(boton1);
            let parrafo4=document.createElement('p')
            parrafo4.className="text-gray-500";
            parrafo4.textContent=`P.Unit ${cotimodi_tmpitems[indice][15]}`;
            let contenedor4=document.createElement('div')
            contenedor4.className="flex flex-1 items-end justify-between text-sm";
            contenedor4.appendChild(parrafo4)
            contenedor4.appendChild(contenedor3);

            //////REMOVER ESTO Y CONVERTIRLO EN UN BOTON PARA ELIMINAR EL PRODUCTO DE LA COTI
            let boton2=document.createElement('button')
            boton2.type="button";
            boton2.className="font-medium text-indigo-600 hover:text-indigo-500";
            // boton2.textContent=`Alm.${paso3[indice][0]}`;
            boton2.textContent="Remover";
            boton2.addEventListener('click',()=>{
                // document.getElementById("contendor-final-final").innerHTML="";
                document.getElementById("aqui-nuevos").innerHTML="";
                console.log("eliminado")
                volver_correr(cotimodi_tmpitems[indice][9]);
            });
            
            let contenedor5=document.createElement('div');
            contenedor5.className="flex";
            contenedor5.appendChild(boton2);
            
            let parrafo5=document.createElement('p')
            parrafo5.className="text-gray-500";
            parrafo5.textContent=`Dscto% ${cotimodi_tmpitems[indice][17]}`;
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
            fila.className="flex py-6 items-center";
            fila.appendChild(contenedor1)
            fila.appendChild(contenedor7)

            // document.getElementById("productos-cotizacion-detallada").appendChild(fila);
            // productos_cotizacion_detallada.appendChild(fila);
            document.getElementById("aqui-nuevos").appendChild(fila);
        }

        // cuerpo5.appendChild(productos_cotizacion_detallada);
        // cuerpo4.appendChild(cuerpo5);

        // cuerpo3.appendChild(cuerpo4);

        // let parrafo6=document.createElement('p');
        // parrafo6.className="mt-0.5 text-sm text-gray-500";
        // parrafo6.textContent="Listado de productos detallado.";
        // //////espacio para la busqueda de promos
        // let boton_prom=document.createElement('button');
        // boton_prom.className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
        // boton_prom.textContent="Agregar Producto";
        // boton_prom.addEventListener('click',()=>{
        //     coti_item_new();
        // })
        // ///////////////////
        // let cuerpo6=document.createElement('div');
        // cuerpo6.className="border-t border-gray-200 px-4 py-6 sm:px-6";
        // cuerpo6.appendChild(parrafo6);
        // cuerpo6.appendChild(boton_prom);

        // let cuerpo7=document.createElement('div');
        // cuerpo7.className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl";
        // cuerpo7.appendChild(cuerpo3)
        // cuerpo7.appendChild(cuerpo6)

        // document.getElementById("contendor-final-final").appendChild(cuerpo7);
}

function cambiar_cantidad(codi,descr,cantidad){
    console.log("este es el codi")
    console.log(codi);
    console.log("este es el cantidad a cambiar")
    console.log(cantidad);
    prod(codi,descr,cantidad);
}