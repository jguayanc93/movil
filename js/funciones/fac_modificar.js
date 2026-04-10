
function preparado(sustituto,indice,doc){
    console.log("sustituto",sustituto,"indice",indice,"doc",doc);
    let dataenviar=new Object();
    dataenviar[indice]=sustituto;
    dataenviar.doc=doc;
    let fetchobj=new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    // fetch(rutarevisar,fetchobj)
    fetch(rutafacturacampoactualisar,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>{
        acumulador.shift();
        document.getElementById("recorrer").innerHTML="";
        console.log(resultado)
    })
    .catch(err=>console.log(err))
}

['primera-opc', 'segunda-opc', 'tercera-opc'].forEach(id => {
    document.getElementById(id).addEventListener("click", () => {
        preparado(document.getElementById(id).textContent, 1, objfactura[1]);
    });
});