// document.getElementById("loggin").addEventListener("click",()=>{
//     let dataenviada=new Object();
//     dataenviada.userclient=document.getElementById("user").value;
//     dataenviada.passclient=document.getElementById("pass").value;
//     let objefetch= new Object();
//     objefetch.method="POST";
//     objefetch.headers={"Content-Type":"application/json"};
//     objefetch.mode="cors",
//     objefetch.credentials="include";
//     objefetch.body=JSON.stringify(dataenviada);

//     fetch(rutalogin,objefetch)
//     .then(resultado=>{
//         if(resultado.ok){ return resultado.json(); }
//         else{ return resultado.text(); }
//     })
//     .then(resultado=>{
//         let decodificar = JSON.parse(resultado);
//         console.log("cookie externa aceptada");
//         window.location.replace("http://127.0.0.1/demo1/main.html")
//     })
//     .catch(err=>{
//         document.getElementById("user").value="";
//         document.getElementById("pass").value="";
//         document.getElementById("respuesta").textContent="error en logeo";
//         // document.getElementById("respuesta").textContent=`${err}`;
//     })
// })

document.getElementById("cdk-logeo").addEventListener("submit",logearse)
function logearse(ev){
    ev.preventDefault();
    console.log("cancelado a tiempo accion por defecto")
    //////////////////////////////
    let form=document.getElementById("cdk-logeo");
    let formulario=new FormData(form);
    /////peticion completa con la data requerida en el lado del cliente
    let peticion=new Request(rutalogin,{
        method:"POST",
        ////no sirve porqe se usa el tipo de constructor new FormData
        // headers:{},
        body:formulario,
        mode:"cors",
        credentials:"include"
    })
    ///////fechar la peticion para el exito
    fetch(peticion)
    .then(resultado=>{
        if(!resultado.ok){ throw new Error(`HTTP error status: ${resultado.status}`); }
        return resultado.json();
        // if(resultado.ok){ return resultado.json(); }
        // else{ return resultado.text(); }
    })
    .then(resultado=>{
        let decodificar = JSON.parse(resultado);
        // console.log("cookie externa aceptada");
        window.location.replace("http://127.0.0.1/demo1/main.html")
    })
    .catch(err=>{
        console.log(err);
        document.getElementById("user").value="";
        document.getElementById("pass").value="";
        document.getElementById("respuesta").textContent="usuario y/o password incorrecto";
    })
}