
document.getElementById("clearcookcors").addEventListener("click",()=>{
    let objefetch = new Object();
    objefetch.method="POST";
    objefetch.headers={"Content-Type":"application/json"};
    objefetch.mode="cors";
    objefetch.credentials="include";
    fetch(cookieclear,objefetch)
    .then(respuesta=>{ return respuesta.text(); })
    .then(respuesta=>{ console.log("sesion terminada"); })
    .catch(err=>{
        console.log(err);
    })
})