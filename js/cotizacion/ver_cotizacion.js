document.getElementById("buscar-coti").addEventListener("click",(ev)=>{
    buscar_cotizacion_modificar();
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
        console.log(paso3)

        /////guardando temporalmente los items
        ////aqui esta el error
        for(const item in paso3) cotimodi_tmpitems[paso3[item][10]]=[paso3[item][1],paso3[item][2],paso3[item][3],paso3[item][4],paso3[item][5],paso3[item][6],paso3[item][7],paso3[item][8],paso3[item][9],paso3[item][10],paso3[item][11],paso3[item][12],paso3[item][13],paso3[item][14],paso3[item][15],paso3[item][16],paso3[item][17],paso3[item][18],paso3[item][19],paso3[item][20],paso3[item][21],paso3[item][22]];
                
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
        boton_prom.textContent="PRODUCTOS DESPLEGADOS";
        
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