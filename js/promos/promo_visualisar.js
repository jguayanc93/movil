document.getElementById("buscar-prom").addEventListener("click",()=>{ ver_promo(); })
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
        cabeseras.appendChild(head1);cabeseras.appendChild(head2);cabeseras.appendChild(head3);cabeseras.appendChild(head4);cabeseras.appendChild(head5);cabeseras.appendChild(head6)
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
    
    // try{
    //     document.getElementById("prom-detalle").innerHTML="";
    //     let paso1=await fetch(rutaprom,fetchobj)
    //     let paso2=await paso1.json();
    //     // let paso3=await JSON.parse(paso2);
    //     console.log(paso2);
    //     // console.log(paso2["items_validos2"]);
    //     for(let i in paso2["items_validos2"]){ prom_numero[i]=paso2["items_validos2"][i]; }

    //     if(Object.keys(paso2).includes("cabesera")) prom_numero["descuento"]=paso2["cabesera"]["descuento"];
    //     // prom_numero["descuento"]=paso2["cabesera"]["descuento"];
    //     for(let indice in paso2["items_validos2"]){
    //         let seleccionable=document.createElement("p");
    //         // seleccionable.innerHTML=paso2[indice][1];
    //         seleccionable.innerHTML=paso2["items_validos2"][indice][10];
    //         let mensaje=document.createElement("td");
    //         mensaje.appendChild(seleccionable);            

    //         let escondido=document.createElement("p");
    //         // escondido.innerHTML=paso2[indice][0];
    //         escondido.innerHTML=paso2["items_validos2"][indice][11];
    //         let mensaje2=document.createElement("td");
    //         mensaje2.appendChild(escondido);

    //         let escondido2=document.createElement("p");
    //         // escondido2.innerHTML=paso2[indice][2];
    //         escondido2.innerHTML=paso2["items_validos2"][indice][13];
    //         let mensaje3=document.createElement("td");
    //         mensaje3.appendChild(escondido2);

    //         let escondido3=document.createElement("p");
    //         // escondido3.innerHTML=paso2[indice][3].toFixed(2);
    //         // escondido3.innerHTML=paso2[indice][3];
    //         escondido3.innerHTML=paso2["items_validos2"][indice][14];
    //         let mensaje4=document.createElement("td");
    //         mensaje4.appendChild(escondido3);

    //         let escondido4=document.createElement("p");
    //         // escondido4.innerHTML=paso2[indice][4];
    //         escondido4.innerHTML=paso2["items_validos2"][indice][12];
    //         let mensaje5=document.createElement("td");
    //         mensaje5.appendChild(escondido4);

    //         let escondido5=document.createElement("p");
    //         // escondido5.innerHTML=paso2[indice][5];
    //         escondido5.innerHTML=paso2["items_validos2"][indice][15];
    //         let mensaje6=document.createElement("td");
    //         mensaje6.appendChild(escondido5);
    //         ////agregado para completar
    //         let escondido6=document.createElement("p");
    //         // escondido6.innerHTML=paso2[indice][6];
    //         escondido6.innerHTML=paso2["items_validos2"][indice][17];
    //         let mensaje7=document.createElement("td");
    //         mensaje7.appendChild(escondido6);

    //         let escondido7=document.createElement("p");
    //         // escondido7.innerHTML=paso2[indice][7];
    //         escondido7.innerHTML=paso2["items_validos2"][indice][16];
    //         let mensaje8=document.createElement("td");
    //         mensaje8.appendChild(escondido7);

    //         let escondido8=document.createElement("p");
    //         // escondido8.innerHTML=paso2[indice][8];
    //         escondido8.innerHTML=paso2["items_validos2"][indice][18];
    //         let mensaje9=document.createElement("td");
    //         mensaje9.appendChild(escondido8);

    //         let cuadrado=document.createElement("tr");
            
    //         cuadrado.appendChild(mensaje);
    //         cuadrado.appendChild(mensaje2);
    //         cuadrado.appendChild(mensaje3);
    //         cuadrado.appendChild(mensaje4);
    //         cuadrado.appendChild(mensaje5);
    //         cuadrado.appendChild(mensaje6);
    //         cuadrado.appendChild(mensaje7);
    //         cuadrado.appendChild(mensaje8);
    //         cuadrado.appendChild(mensaje9);
    //         document.getElementById("prom-detalle").appendChild(cuadrado);
    //     }
    // }catch(err){ console.log(err); }
}