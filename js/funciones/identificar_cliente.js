
function cliente(sustituto){
    let dataenviar=new Object();
    dataenviar.idcliente=sustituto;
    let fetchobj=new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    fetch(rutafindcli,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>JSON.parse(resultado))
    .then(resultado=>{
        cliente_data.length=0;
        cliente_data=[resultado[0][0],resultado[0][1],resultado[0][2],resultado[0][3],resultado[0][4],resultado[0][5]];
        return resultado;
    })
    .then(resultado=>{        
        document.getElementById("recorrer").innerHTML="";
        console.log(cliente_data)
        // document.getElementById("ccli").value=resultado[0][0];
        // document.getElementById("cliente").value=resultado[0][1];
        // document.getElementById("ruccli").value=resultado[0][2];
        // document.getElementById("cvend").value=resultado[0][3];
        // document.getElementById("ccdv").value=resultado[0][4];
        // document.getElementById("ctcl").value=resultado[0][5];
    })
    .catch(err=>console.log(err))
}