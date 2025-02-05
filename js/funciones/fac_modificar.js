
function preparado(sustituto,indice,doc){
    let dataenviar=new Object();
    dataenviar[indice]=sustituto;
    dataenviar.doc=doc;
    let fetchobj=new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    fetch(rutarevisar,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>{
        acumulador.shift();
        document.getElementById("recorrer").innerHTML="";
        console.log(resultado)
    })
    .catch(err=>console.log(err))
}