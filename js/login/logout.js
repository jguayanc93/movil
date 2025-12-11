
document.getElementById("sesion-terminada").addEventListener("click",kitarse)

async function kitarse(){

    let dataenviar = new Object();
    dataenviar.msg = "terminar sesion";
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);

    try{
        let paso1 = await fetch(rutalogout,fetchobj)
        let paso2 = await paso1.json();
        window.location.assign("https://landing.compudiskett.com.pe")
    }
    catch(err){}
}

// document.getElementById("sesion-terminada").addEventListener("click",()=>{
//     let objefetch = new Object();
//     objefetch.method="POST";
//     objefetch.headers={"Content-Type":"application/json"};
//     objefetch.mode="cors";
//     objefetch.credentials="include";
//     fetch(cookieclear,objefetch)
//     .then(respuesta=>{ return respuesta.text(); })
//     .then(respuesta=>{ console.log("sesion terminada"); })
//     .catch(err=>{
//         console.log(err);
//     })
// })