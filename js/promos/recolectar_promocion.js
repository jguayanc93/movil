async function recojedor_promocion(doc, nitem, descr) {

    if(promos_recojidas.length===0){ 
        promos_recojidas.push([doc, nitem, descr]); 
    }
    else{
        let contador=0;
        for(const item of promos_recojidas){
            if(item[1]==nitem){contador++}
        }
        if(contador==0){ 
            promos_recojidas.push([doc, nitem, descr]);
        }
    }
    
    // Actualizar el contador visual
    if (typeof updateSelectedCount === 'function') {
        updateSelectedCount();
    }
    
    // Mostrar los items seleccionados
    if (typeof promocion_desechadas === 'function') {
        setTimeout(() => {
            promocion_desechadas();
        }, 100);
    }
}

async function promocion_desechadas(){
    try{
        document.getElementById("productos-cotizacion-detallada").innerHTML = "";
        
        for(let indice of promos_recojidas){
            let listItem = document.createElement('li');
            listItem.className = 'fade-in flex items-start justify-between p-3 bg-red-50 border border-red-200 rounded-lg';
            listItem.innerHTML = `
                <div class="flex-1">
                    <p class="font-medium text-gray-900 text-sm">${indice[2]}</p>
                    <p class="text-xs text-gray-600 mt-1">Fila: <span class="font-semibold">${indice[1]}</span></p>
                </div>
                <button 
                    type="button" 
                    class="ml-2 p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                    onclick="removeSelectedItem(${promos_recojidas.indexOf(indice)}, '${indice[1]}')"
                    title="Remover de la selección"
                >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            `;
            document.getElementById("productos-cotizacion-detallada").appendChild(listItem);
        }
    }
    catch(err){ 
        console.error('Error en promocion_desechadas:', err); 
    }
}

// Función para remover un item individual de la selección
function removeSelectedItem(index, nitem) {
    promos_recojidas.splice(index, 1);
    
    // Resetear checkbox
    const checkbox = document.getElementById(`check-${nitem}`);
    if (checkbox) {
        checkbox.checked = false;
    }
    
    // Resetear botón del item
    const btn = document.getElementById(`seleccion-item-${nitem}`);
    if (btn) {
        btn.innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Seleccionar
        `;
        btn.disabled = false;
        btn.className = 'mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors';
    }
    
    // Remover estilo seleccionado de la card
    const card = document.getElementById(`item-card-${nitem}`);
    if (card) {
        card.classList.remove('selected');
    }
    
    if (typeof updateSelectedCount === 'function') {
        updateSelectedCount();
    }
    
    promocion_desechadas();
}

async function ver_promo2(idprom){
    let dataenviar=new Object();
    dataenviar.ncoti=document.getElementById("ncoti").value;
    dataenviar.nprom=idprom;
    dataenviar.grupos=cont_grupo_id;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        console.log(`fecheando el ${idprom}`);
        // let paso1=await fetch(rutaprom,fetchobj)
        let paso1=await fetch(rutapromocionrecojedor,fetchobj)
        let paso2=await paso1.json();
        // console.log(paso2);
        
        // for(let i in paso2["items_validos2"]){ prom_numero[i]=paso2["items_validos2"][i]; }
        if(Object.keys(paso2).includes("agrupados")){
            cont_grupo_id.push(paso2["agrupados"])
            delete paso2["agrupados"];
        }
        ////una posible solucion es sumar los descuentos en uno solo para convertirlo en uno general y asi descontar exacto
        // if(Object.keys(paso2).includes("descuento")) prom_numero["descuento"]=paso2["descuento"];
        // delete paso2["descuento"];
        //////acumular los descuento en campo de descuento
        if(Object.keys(paso2).includes("descuento")){
            delete paso2["descuento"];
            
            for(let i in paso2){
                if(prom_numero["descuento"]==undefined){
                    prom_numero["descuento"]=[paso2[i][2],Number(paso2[i][17]),paso2[i][17]*0.18,Number(paso2[i][19])]
                }
                else{
                    prom_numero["descuento"][0]=paso2[i][2];
                    prom_numero["descuento"][1]+=Number(paso2[i][17]);
                    prom_numero["descuento"][2]=Number((prom_numero["descuento"][1]*0.18).toFixed(2));
                    prom_numero["descuento"][3]+=Number(paso2[i][19]);
                }
            }
        }
        delete paso2["descuento"];
        //////////////////// CUIDADO CON EL CONSTRUCTOR Y SUS CANTIDADES CON RESPECTO A LO MERECIDO
        // for(let i in paso2) prom_numero[i]=paso2[i];
        ///////////////REVISAR LA DIFERENCIA DE CODIS
        for(let i in paso2){
            ////el problema reside en que cuando se envia el indice es 0 y cuando vuelve a encontrar
            ///al otro objeto con el mismo indice con 0 solo lo descarta
            if(Object.keys(prom_numero).includes(i)){
                // prom_numero[i][7]+=paso2[i][7];
                /////solucion temporal no mantener porqe puede romper el adjuntar promo
                if(Number.isInteger(parseInt(i))){
                    let aumentara1=parseInt(i)+1
                    prom_numero[aumentara1]=paso2[i];
                    prom_numero[aumentara1][6]=coti_cant+1;
                    coti_cant++;
                }
                else{prom_numero[i][7]+=paso2[i][7];}                
            }
            else{
                prom_numero[i]=paso2[i];
                prom_numero[i][6]=coti_cant+1;
                coti_cant++;
            }
        };
        

        for(let indice in paso2){
            let parrafo1=document.createElement('p')
            parrafo1.className="mt-1 text-sm text-gray-500";
            parrafo1.textContent=paso2[indice][4];
            let contenedor1=document.createElement('div');
            contenedor1.className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200";
            contenedor1.appendChild(parrafo1);

            let enlace=document.createElement('a')
            enlace.textContent=paso2[indice][15];
            let titulo=document.createElement('h3');
            titulo.appendChild(enlace);
            let parrafo2=document.createElement('p');
            parrafo2.className="ml-4";
            parrafo2.textContent=`$${paso2[indice][19]}`;
            let contenedor2=document.createElement('div')
            contenedor2.className="flex justify-between text-base font-medium text-gray-900";
            contenedor2.appendChild(titulo);
            contenedor2.appendChild(parrafo2);
            let parrafo3=document.createElement('p')
            parrafo3.className="mt-1 text-sm text-gray-500";
            parrafo3.textContent=paso2[indice][13];

            let contenedor_vacio=document.createElement('div');
            contenedor_vacio.appendChild(contenedor2)
            contenedor_vacio.appendChild(parrafo3)

            let boton1=document.createElement('button');
            boton1.type="button";
            boton1.className="font-medium text-indigo-600 hover:text-indigo-500";
            boton1.textContent=`Cant. ${paso2[indice][7]}`;
            let contenedor3=document.createElement('div');
            contenedor3.className="flex";
            contenedor3.appendChild(boton1);
            let parrafo4=document.createElement('p')
            parrafo4.className="text-gray-500";
            parrafo4.textContent=`P.Unit ${paso2[indice][12]}`;
            let contenedor4=document.createElement('div')
            contenedor4.className="flex flex-1 items-end justify-between text-sm";
            contenedor4.appendChild(parrafo4)
            contenedor4.appendChild(contenedor3);

            let boton2=document.createElement('button')
            boton2.type="button";
            boton2.className="font-medium text-indigo-600 hover:text-indigo-500";
            boton2.textContent=`Alm.${paso2[indice][7]}`;
            let contenedor5=document.createElement('div');
            contenedor5.className="flex";
            contenedor5.appendChild(boton2);
            let parrafo5=document.createElement('p')
            parrafo5.className="text-gray-500";
            parrafo5.textContent=`Dscto% ${paso2[indice][6]}`;
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

            document.getElementById("productos-cotizacion-detallada").appendChild(fila);
            // productos_cotizacion_detallada.appendChild(fila);
        }
    }
    catch(err){ console.log(err); }
}