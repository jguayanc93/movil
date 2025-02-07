function get_ordercompra(){
    let dataenviar=new Object();
    dataenviar[7]=document.getElementById("orden-compra2").value;
    // dataenviar.doc=document.getElementById("doc").value;
    dataenviar.doc=objfactura[1];
    let fetchobj=new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    fetch(rutaropc7,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>{ console.log(resultado); })
    .catch(err=>console.log(err))
}