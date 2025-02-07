function get_observacion(){
    let dataenviar=new Object();
    dataenviar[6]=document.getElementById("observacion2").value;
    // dataenviar.doc=document.getElementById("doc").value;
    dataenviar.doc=objfactura[1];
    let fetchobj=new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    fetch(rutaropc6,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>{ console.log(resultado); })
    .catch(err=>console.log(err))
}