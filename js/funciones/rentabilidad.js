
async function rentabilidad(){
    let dataenviar=new Object();
    dataenviar.productos=agrupacion;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1 = await fetch(rutacrentabilidad,fetchobj)
        let paso2 = await paso1.json();
        // let paso3 = await JSON.parse(paso2);///no cuando es objeto
        for(let indice in paso2){
            let escondido1=document.createElement("p");
            escondido1.textContent=paso2[indice][0];
            let mensaje1=document.createElement("td");
            mensaje1.appendChild(escondido1);

            let escondido2=document.createElement("p");
            escondido2.textContent=paso2[indice][1];
            let mensaje2=document.createElement("td");
            mensaje2.appendChild(escondido2);

            let escondido3=document.createElement("p");
            escondido3.textContent=paso2[indice][2];
            let mensaje3=document.createElement("td");
            mensaje3.appendChild(escondido3);

            let escondido4=document.createElement("p");
            escondido4.textContent=paso2[indice][3];
            let mensaje4=document.createElement("td");
            mensaje4.appendChild(escondido4);

            let escondido5=document.createElement("p");
            escondido5.textContent=paso2[indice][4];
            let mensaje5=document.createElement("td");
            mensaje5.appendChild(escondido5);

            let escondido6=document.createElement("p");
            escondido6.textContent=paso2[indice][5];
            let mensaje6=document.createElement("td");
            mensaje6.appendChild(escondido6);

            let escondido7=document.createElement("p");
            escondido7.textContent=paso2[indice][6];
            let mensaje7=document.createElement("td");
            mensaje7.appendChild(escondido7);

            let escondido8=document.createElement("p");
            escondido8.textContent=paso2[ind1ice][7];
            let mensaje8=document.createElement("td");
            mensaje8.appendChild(escondido8);

            let renglon=document.createElement("tr");
            renglon.appendChild(mensaje1);
            renglon.appendChild(mensaje2);
            renglon.appendChild(mensaje3);
            renglon.appendChild(mensaje4);
            renglon.appendChild(mensaje5);
            renglon.appendChild(mensaje6);
            renglon.appendChild(mensaje7);
            renglon.appendChild(mensaje8);

            let contenedor=document.getElementById("resumen");
            contenedor.appendChild(renglon);
        }
    }
    catch(err){ console.log(err); }
}