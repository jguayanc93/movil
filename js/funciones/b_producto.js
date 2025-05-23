
async function buscar_producto(descprod){
    let dataenviar=new Object();
    dataenviar.sugerencia=descprod;
    dataenviar.tipbusq=document.getElementById("currency2").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);

    try{
        let paso1=await fetch(rutabproducto,fetchobj)
        // let paso1=await fetch(tipbusqueda,fetchobj)
        let paso2=await paso1.json();
        let paso3=await JSON.parse(paso2);

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
        let cantidad= document.getElementById("cantidades");
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
    ////////enviar ala otra funcion
    //////////revisar q pasa con la variable global y el dismis de la alerta
    document.getElementById("producto").value="";
    document.getElementById("modal-aceptacion").innerHTML="";
    tblprd2(codi,cantidad);
}