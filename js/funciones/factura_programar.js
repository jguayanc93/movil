document.addEventListener('DOMContentLoaded',buscar_lista)
document.getElementById("fecha-escojido").addEventListener('change',buscar_dia2);

async function buscar_lista(){
    document.getElementById("lfpp").innerHTML="";
    let dataenviar=new Object();
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutalistadespacho,fetchobj)
        let paso2= await paso1.json();
        let paso3= await JSON.parse(paso2);

        for(const doc in paso3){
            let contenedor_superior=document.createElement('dl')
            contenedor_superior.className="divide-y divide-gray-100";
            let contenedor_medio=document.createElement('div');
            contenedor_medio.className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0";

            let elemento1=document.createElement('dt');
            elemento1.className="text-sm/6 font-medium text-gray-900";
            elemento1.textContent=paso3[doc][2];

            let elemento2=document.createElement('dd');
            elemento2.className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0";
            elemento2.textContent=paso3[doc][1];

            let elemento3=document.createElement('dd');
            elemento3.className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0";
            elemento3.textContent=paso3[doc][3];

            ////////ESPACIO ESPECIAL PARA EL BOTON PROGRAMADOR DE FACTURA
            let boton=document.createElement('button');
            boton.type='button'
            boton.className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";            
            boton.textContent="PROGRAMAR";
            boton.addEventListener('click',()=>enviar(paso3[doc][1]))

            contenedor_medio.appendChild(elemento1)
            contenedor_medio.appendChild(elemento2)
            contenedor_medio.appendChild(elemento3)
            contenedor_medio.appendChild(boton)

            contenedor_superior.appendChild(contenedor_medio);

            document.getElementById("lfpp").appendChild(contenedor_superior);
        }
    }
    catch(err){
        console.log(err);
        let contenedor_superior=document.createElement('dl')
        contenedor_superior.className="divide-y divide-gray-100";
        let contenedor_medio=document.createElement('div');
        contenedor_medio.className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0";

        let elemento1=document.createElement('dt');
        elemento1.className="text-sm/6 font-medium text-gray-900";
        elemento1.textContent="SIN RESULTADOS";

        let elemento2=document.createElement('dd');
        elemento2.className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0";
        elemento2.textContent="nada que mostrar";

        contenedor_medio.appendChild(elemento1)
        contenedor_medio.appendChild(elemento2)

        contenedor_superior.appendChild(contenedor_medio);

        document.getElementById("lfpp").appendChild(contenedor_superior);
    }
}

async function buscar_dia2(){
    document.getElementById("lfpp").innerHTML="";
    let dataenviar=new Object();
    dataenviar.dia=document.getElementById("fecha-escojido").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutalistadespachodia,fetchobj)
        let paso2= await paso1.json();
        let paso3= await JSON.parse(paso2);

        for(const doc in paso3){
            let contenedor_superior=document.createElement('dl')
            contenedor_superior.className="divide-y divide-gray-100";
            let contenedor_medio=document.createElement('div');
            contenedor_medio.className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0";

            let elemento1=document.createElement('dt');
            elemento1.className="text-sm/6 font-medium text-gray-900";
            elemento1.textContent=paso3[doc][2];

            let elemento2=document.createElement('dd');
            elemento2.className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0";
            elemento2.textContent=paso3[doc][1];

            let elemento3=document.createElement('dd');
            elemento3.className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0";
            elemento3.textContent=paso3[doc][3];

            let boton=document.createElement('button');
            boton.type='button';
            boton.className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
            boton.textContent="PROGRAMAR"
            boton.addEventListener('click',()=>enviar(paso3[doc][1]))

            contenedor_medio.appendChild(elemento1)
            contenedor_medio.appendChild(elemento2)
            contenedor_medio.appendChild(elemento3)
            contenedor_medio.appendChild(boton)

            contenedor_superior.appendChild(contenedor_medio);

            document.getElementById("lfpp").appendChild(contenedor_superior);
        }
        
    }
    catch(err){
        console.log(err);
        let contenedor_superior=document.createElement('dl')
        contenedor_superior.className="divide-y divide-gray-100";
        let contenedor_medio=document.createElement('div');
        contenedor_medio.className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0";

        let elemento1=document.createElement('dt');
        elemento1.className="text-sm/6 font-medium text-gray-900";
        elemento1.textContent="SIN RESULTADOS";

        let elemento2=document.createElement('dd');
        elemento2.className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0";
        elemento2.textContent="nada que mostrar";

        contenedor_medio.appendChild(elemento1)
        contenedor_medio.appendChild(elemento2)

        contenedor_superior.appendChild(contenedor_medio);

        document.getElementById("lfpp").appendChild(contenedor_superior);
    }
}

async function enviar(doc){
    // let fechita=document.getElementById("fecha-escojido").value;

    let dataenviar=new Object();
    dataenviar.factura=doc;

    let fecha = new Date();
    let año=fecha.getFullYear();
    let mes=fecha.getMonth()+1;
    let dia=fecha.getDate();
    let formato_hoy=año+"-"+mes+"-"+dia;

    let fecha_valida=document.getElementById("fecha-escojido").value;

    if(fecha_valida!="") dataenviar.fecha=document.getElementById("fecha-escojido").value;
    else{dataenviar.fecha=formato_hoy}
    
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutabfacturavalida,fetchobj)
        let paso2= await paso1.json();
        let paso3= await JSON.parse(paso2);
        ///refrescar
        document.getElementById("lfpp").innerHTML="";
        for(const doc in paso3){
            let contenedor_superior=document.createElement('dl')
            contenedor_superior.className="divide-y divide-gray-100";
            let contenedor_medio=document.createElement('div');
            contenedor_medio.className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0";

            let elemento1=document.createElement('dt');
            elemento1.className="text-sm/6 font-medium text-gray-900";
            elemento1.textContent=paso3[doc][2];

            let elemento2=document.createElement('dd');
            elemento2.className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0";
            elemento2.textContent=paso3[doc][1];

            let elemento3=document.createElement('dd');
            elemento3.className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0";
            elemento3.textContent=paso3[doc][3];

            ////////ESPACIO ESPECIAL PARA EL BOTON PROGRAMADOR DE FACTURA
            let boton=document.createElement('button');
            boton.type='button'
            boton.className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";            
            boton.textContent="PROGRAMAR";
            boton.addEventListener('click',()=>enviar(paso3[doc][1]))

            contenedor_medio.appendChild(elemento1)
            contenedor_medio.appendChild(elemento2)
            contenedor_medio.appendChild(elemento3)
            contenedor_medio.appendChild(boton)

            contenedor_superior.appendChild(contenedor_medio);

            document.getElementById("lfpp").appendChild(contenedor_superior);
        }


        console.log(paso2)
        // console.log(paso3)
    }
    catch(err){
        console.log(err);
    }
}