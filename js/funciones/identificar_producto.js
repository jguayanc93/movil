function tblprd(cprd,descr,stoc,costo,venta,dsct,codf,marca){
    document.getElementById("producto").innerHTML="";
    document.getElementById("seleccionar-productos").innerHTML="";
    agrupacion[cprd]=[descr,stoc,costo,venta,dsct,codf,marca];

    for(let i in agrupacion){
        let escondido=document.createElement("p");
        escondido.innerHTML=agrupacion[i][0];
        let mensaje2=document.createElement("td");
        mensaje2.appendChild(escondido);

        let seleccionable=document.createElement("p");
        seleccionable.innerHTML=agrupacion[i][1];
        let mensaje=document.createElement("td");
        mensaje.appendChild(seleccionable);

        ///////////solo para testeo
        let pos3=document.createElement("p");
        pos3.innerHTML=agrupacion[i][2];
        let mensaje3=document.createElement("td");
        mensaje3.appendChild(pos3);

        let pos4=document.createElement("p");
        pos4.innerHTML=agrupacion[i][3];
        let mensaje4=document.createElement("td");
        mensaje4.appendChild(pos4);

        let pos5=document.createElement("p");
        pos5.innerHTML=agrupacion[i][4];
        let mensaje5=document.createElement("td");
        mensaje5.appendChild(pos5);
        ////////////////////////////////////        
        
        let cuadrado=document.createElement("tr");
        cuadrado.appendChild(mensaje2);
        cuadrado.appendChild(mensaje);
        cuadrado.appendChild(mensaje3);
        cuadrado.appendChild(mensaje4);
        cuadrado.appendChild(mensaje5);
        document.getElementById("seleccionar-productos").appendChild(cuadrado);
    }
}


async function tblprd2(cprd,stoc){
    document.getElementById("producto").innerHTML="";
    // document.getElementById("seleccionar-productos").innerHTML="";
    
    ////////////
    let dataenviar=new Object();
    dataenviar.sugerencia=cprd;
    dataenviar.cctl=cliente_data[5];
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1=await fetch(rutabproductoid,fetchobj)
        let paso2=await paso1.json();
        let paso3=await JSON.parse(paso2);

        agrupacion[paso3[0]]=[paso3[1],stoc,paso3[3],paso3[4],paso3[5],paso3[6],paso3[7]];
        console.log(agrupacion);
    }
    catch(err){
        console.log(err);
    }
}