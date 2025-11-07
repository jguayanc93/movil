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
        if(!resultado.ok){

            return resultado.json().then(errordata=>{
                const ups = new Error(`HTTP error status: ${resultado.status}`)
                ups.detalles=errordata;
                throw ups;
            })
            // throw new Error(`HTTP error status: ${resultado.status}`);
        }
        return resultado.json();
    })
    .then(resultado=>{
        let decodificar = JSON.parse(resultado);
        console.log("que sucedera? con la redireccion");
        // window.location.replace("http://127.0.0.1/demo1/main.html")
        window.location.replace("https://landing.compudiskett.com.pe/movil/main.html")
    })
    .catch(err=>{
        console.log(err);
        document.getElementById("user").value="";
        document.getElementById("pass").value="";
        document.getElementById("respuesta").textContent="usuario y/o password incorrecto";
        if(err.detalles){error_manejador(err.detalles)}
    })
}

function error_manejador(errobj){
    ////MANEJA CON CUIDADO LOS PARAMETROS PORQE DEPENDERA DE LA REDIRECCION
    switch (errobj.status) {
        case "error query":
            console.log("la webada fallo consulte con su equipo de sistemas");
            break;

        case "no cdk user":
            console.log("oe weon no estas registrado en el navachof");
            break;

        case "falsa galleta":
            console.log("que mrd hiciste con tu logeo en la sesion");
            break;

        case "no identificado":
            // console.log("registrate primero chistoso para poder usar la intranet");
            autenticarse();
            break;
    
        default:
            console.log("paso algo rarisimo y esqe nose que mrd es esto");
            console.log(errobj.msg);
            break;
    }
}

function autenticarse(){
    window.location.assign("https://landing.compudiskett.com.pe/movil/registro.html")
    // let peticion=new Request(rutaidentificador,{
    //     method:"POST",
    //     // headers:{},
    //     body:{"user":usuario},
    //     mode:"cors",
    //     credentials:"include"
    // })
}