// document.getElementById("buscar-prom").addEventListener("click",()=>{
//     // for(let idprom of promos_conjunto_diferenciales) ver_promo2(idprom);
//     // promos_conjunto_diferenciales.forEach(idprom => { ver_promo2(idprom) });
//     // promos_conjunto_diferenciales.forEach(idprom=>ver_promo3(idprom));
//     // ver_promo();
//     esperador(promos_conjunto_diferenciales);
// })
///funcion especial para esperar la funcion asincrona
async function esperador(promos){
    for(const idprom of promos){
        await ver_promo2(idprom);
    }
}
// mejorar la funcion de recursion de promociones
async function ver_promo(){
    let dataenviar=new Object();
    dataenviar.ncoti=document.getElementById("ncoti").value;
    dataenviar.nprom=document.getElementById("nprom").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        document.getElementById("prom-detalle").innerHTML="";
        let paso1=await fetch(rutaprom,fetchobj)
        let paso2=await paso1.json();
        console.log(paso2);
        // for(let i in paso2["items_validos2"]){ prom_numero[i]=paso2["items_validos2"][i]; }
        if(Object.keys(paso2).includes("descuento")) prom_numero["descuento"]=paso2["descuento"];
        delete paso2["descuento"];
        for(let i in paso2) prom_numero[i]=paso2[i];

        const head1=document.createElement("th");head1.textContent="CODIGO";
        const head2=document.createElement("th");head2.textContent="MARCA";
        const head3=document.createElement("th");head3.textContent="DESCRIPCION";
        const head4=document.createElement("th");head4.textContent="CANTIDAD";
        const head5=document.createElement("th");head5.textContent="PRECIO";
        const head6=document.createElement("th");head6.textContent="TOTAL";
        const cabeseras=document.createElement("tr");
        cabeseras.appendChild(head1);
        cabeseras.appendChild(head2);
        cabeseras.appendChild(head3);
        cabeseras.appendChild(head4);
        cabeseras.appendChild(head5);cabeseras.appendChild(head6)
        document.getElementById("prom-titulos").appendChild(cabeseras);

        for(let i in paso2){
            let seleccionable=document.createElement("p");
            seleccionable.textContent=paso2[i][12];
            let mensaje=document.createElement("td");
            mensaje.appendChild(seleccionable)

            let escondido=document.createElement("p");
            escondido.textContent=paso2[i][13];
            let mensaje2=document.createElement("td");
            mensaje2.appendChild(escondido)

            let escondido2=document.createElement("p");
            escondido2.innerHTML=paso2[i][15];
            let mensaje3=document.createElement("td");
            mensaje3.appendChild(escondido2);

            let escondido3=document.createElement("p");
            escondido3.innerHTML=paso2[i][7];
            let mensaje4=document.createElement("td");
            mensaje4.appendChild(escondido3);

            let escondido4=document.createElement("p");
            escondido4.innerHTML=paso2[i][17];
            let mensaje5=document.createElement("td");
            mensaje5.appendChild(escondido4);
            
            let escondido5=document.createElement("p");
            escondido5.innerHTML=paso2[i][19];
            let mensaje6=document.createElement("td");
            mensaje6.appendChild(escondido5);

            let cuadrado=document.createElement("tr");
            
            cuadrado.appendChild(mensaje);
            cuadrado.appendChild(mensaje2);
            cuadrado.appendChild(mensaje3);
            cuadrado.appendChild(mensaje4);
            cuadrado.appendChild(mensaje5);
            cuadrado.appendChild(mensaje6);
            
            document.getElementById("prom-detalle").appendChild(cuadrado);
        }
    }catch(err){ console.log(err); }
    
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