
document.getElementById("buscar-coti").addEventListener("click",()=>{
    // let ncoti=document.getElementById("ncoti").value;
    buscar_cotizacion();
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