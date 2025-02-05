document.getElementById("revisar-doc").addEventListener("click",()=>{
    buscar_factura();
})

async function buscar_factura(){
    document.getElementById("contenedor").innerHTML="";
    document.getElementById("contenedor-minutos").innerHTML="";

    let dataenviar=new Object();
    dataenviar.factura=document.getElementById("ndoc").value;

    let fecha = new Date();
    let año=fecha.getFullYear();
    let mes=fecha.getMonth()+1;
    let dia=fecha.getDate();
    let formato_hoy=año+"-"+mes+"-"+dia;

    let fecha_valida=document.getElementById("fecha-escojido").value;

    if(fecha_valida!="") dataenviar.fecha=document.getElementById("fecha-escojido").value;
    else{dataenviar.fecha=formato_hoy}
    // dataenviar.fecha=document.getElementById("fecha-escojido").value;

    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutabfacturavalida,fetchobj)
        let paso2= await paso1.json();
        console.log(paso2);
        if(Object.keys(paso2).includes("estado")){
            console.log("factura : mensaje= deberia ser porqe ya se programo")
        }
        else{
            objprogramar["fdata"]=paso2["fdata"];
            objprogramar["ffecha"]=paso2["ffecha"];
        ////materiales de construccion para el combo de hora
        let label=document.createElement("label")
        label.setAttribute("for","hora")
        label.textContent="horas disponibles: ";
        let solo_hora=document.createElement("select");
        solo_hora.setAttribute("name","hora")
        solo_hora.setAttribute("id","hora")
        solo_hora.addEventListener("change",()=>disponibilidad_minutos())

        let opcdefault=document.createElement("option")
        opcdefault.setAttribute("value","0")
        opcdefault.setAttribute("selected",true)
        opcdefault.textContent="porfavor las horas disponibles"
        solo_hora.appendChild(opcdefault);


        for(let i in paso2["horas"]){
            let op1=document.createElement("option")
            op1.setAttribute("value",i);
            op1.textContent=paso2["horas"][i];
            solo_hora.appendChild(op1)
        }

        document.getElementById("contenedor").appendChild(label).appendChild(solo_hora)
        }
    }
    catch(err){console.log(err)}
}

async function disponibilidad_minutos(){
    console.log("deberia disparar esta funcion");
    let dataenviar=new Object();
    dataenviar.factura=objprogramar["fdata"];
    dataenviar.fecha=objprogramar["ffecha"];
    dataenviar.hora_escojida=document.getElementById("hora").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutafacturaprogramadaminutos,fetchobj)
        let paso2= await paso1.json();
        console.log(paso2);
        ////manejador de objeto vacio
        if(Object.keys(paso2["minutos"]).length<1){
            console.log("no tienes minutos disponibles para esta hora")
        }
        else{
        ///////TEMPORALMENTE DESABILITADO PARA CONTRUIR SEGUN ELECCION DE HORA
        document.getElementById("contenedor-minutos").innerHTML="";
        ////materiales de construccion para el combo de minutos
        let label2=document.createElement("label")
        label2.setAttribute("for","minutos");
        label2.textContent="minutos disponibles: ";
        let solo_minutos=document.createElement("select");
        solo_minutos.setAttribute("name","minutos")
        solo_minutos.setAttribute("id","minutos")

        for(let i in paso2["minutos"]){
            let op1=document.createElement("option")
            op1.setAttribute("value",i);
            op1.textContent=paso2["minutos"][i];
            solo_minutos.appendChild(op1)
        }
        document.getElementById("contenedor-minutos").appendChild(label2).appendChild(solo_minutos)
        /////creando el boton de programacion dinamica segun disponibilidad
        let boton_crear=document.createElement("button");
        boton_crear.setAttribute("id","docprogramar");
        boton_crear.textContent="crear programacion";
        boton_crear.addEventListener("click",()=>programador_documentos());
        document.getElementById("contenedor-minutos").appendChild(boton_crear);
        }
    }
    catch(err){console.log(err)}
}

async function programador_documentos(){
    let dataenviar=new Object();
    dataenviar.factura=objprogramar["fdata"];
    dataenviar.fecha=objprogramar["ffecha"];
    dataenviar.hora=document.getElementById("hora").value;
    dataenviar.minuto=document.getElementById("minutos").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutafacturaprogramada,fetchobj)
        let paso2= await paso1.json();
        console.log(paso2);
    }
    catch(err){console.log(err)}
}