async function recojedor_promocion(doc,nitem,descr) {

    if(promos_recojidas.length===0){ promos_recojidas.push([doc,nitem,descr]); }
    else{
        let contador=0;
        for(const item of promos_recojidas){
            if(item[1]==nitem){contador++}
        }
        if(contador==0){ promos_recojidas.push([doc,nitem,descr]);}
    }
}

async function promocion_desechadas(){

    try{
        document.getElementById("productos-cotizacion-detallada").innerHTML="";
        // let paso2=await paso1.json();
        
        for(let indice of promos_recojidas){
            let parrafo1=document.createElement('p')
            parrafo1.className="mt-1 text-sm text-gray-500";
            parrafo1.textContent=indice[0];//este esta bien
            let contenedor1=document.createElement('div');
            contenedor1.className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200";
            contenedor1.appendChild(parrafo1);

            let enlace=document.createElement('a')
            enlace.textContent=indice[2];
            let titulo=document.createElement('h3');
            titulo.appendChild(enlace);
            let parrafo2=document.createElement('p');
            parrafo2.className="ml-4";
            parrafo2.textContent=`#`;
            let contenedor2=document.createElement('div')
            contenedor2.className="flex justify-between text-base font-medium text-gray-900";
            contenedor2.appendChild(titulo);
            contenedor2.appendChild(parrafo2);
            // let parrafo3=document.createElement('p')
            // parrafo3.className="mt-1 text-sm text-gray-500";
            // parrafo3.textContent=indice[1];

            let contenedor_vacio=document.createElement('div');
            contenedor_vacio.appendChild(contenedor2)
            // contenedor_vacio.appendChild(parrafo3)

            // let boton1=document.createElement('button');
            // boton1.type="button";
            // boton1.className="font-medium text-indigo-600 hover:text-indigo-500";
            // boton1.textContent=`Fila. ${indice[1]}`;
            let contenedor3=document.createElement('div');
            contenedor3.className="flex";
            // contenedor3.appendChild(boton1);
            let parrafo4=document.createElement('p')
            parrafo4.className="text-gray-500";
            parrafo4.textContent=`Fila. ${indice[1]}`;
            let contenedor4=document.createElement('div')
            contenedor4.className="flex flex-1 items-end justify-between text-sm";
            contenedor4.appendChild(parrafo4)
            contenedor4.appendChild(contenedor3);

            // let boton2=document.createElement('button')
            // boton2.type="button";
            // boton2.className="font-medium text-indigo-600 hover:text-indigo-500";
            // boton2.textContent=`Alm`;
            // let contenedor5=document.createElement('div');
            // contenedor5.className="flex";
            // contenedor5.appendChild(boton2);
            // let parrafo5=document.createElement('p')
            // parrafo5.className="text-gray-500";
            // parrafo5.textContent=`Dscto%`;
            // let contenedor6=document.createElement('div')            
            // contenedor6.className="flex flex-1 items-end justify-between text-sm";
            // contenedor6.appendChild(parrafo5)
            // contenedor6.appendChild(contenedor5)

            let contenedor7=document.createElement('div');
            contenedor7.className="ml-4 flex flex-1 flex-col";
            contenedor7.appendChild(contenedor_vacio);
            contenedor7.appendChild(contenedor4)
            // contenedor7.appendChild(contenedor6)
            
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

// async function esperador(promos){
//     for(const idprom of promos){
//         await ver_promo2(idprom);
//     }
// }
// mejorar la funcion de recursion de promociones

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