
document.getElementById("trae-tiempo").addEventListener('click',buscartiempo)

function buscartiempo(){
    // console.log(marca_seleccionada);
    let dataenviar=new Object();
    dataenviar.marca=marca_seleccionada;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);

    /////DIFERENCIA
    fetch(rutatiempo,fetchobj)
    .then(resultado=>{
        if(!resultado.ok) throw new Error("fallo la creacion");
        return resultado.blob();
    })
    .then(resultado=>{
        console.log("ai va el archivo")
        const url=URL.createObjectURL(resultado);
        const link=document.createElement('a');
        link.href=url;
        link.download="tiempo.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    })
    .catch(err=>{console.log(err);})
    
}