
document.getElementById("cuota-mes").addEventListener("click",()=>{
    let hoy = new Date();
    let seguro = hoy.getMonth()+1;
    let fechita = document.getElementById("fecha-mes").value;
    fechita=='' ? fechita=seguro : fechita=new Date(fechita).getMonth()+1;
    if(fechita<10) fechita=("0"+fechita).toString();

    let dataenviada= new Object();
    dataenviada.mes=fechita;
    let fetchobj= new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviada);
    fetch(rutacuota,fetchobj)
    .then(resultado=>{
        if(resultado.ok){ return resultado.json(); }
        else{ return resultado.text(); }
    })
    .then(resultado=>JSON.parse(resultado))
    .then(resultado=>{
        // console.log(resultado);
        // document.getElementById("detallado").innerHTML="vendido: "+resultado[0][0]+ "--- meta: "+ resultado[0][1];
        document.getElementById("vmeta").innerHTML="$"+resultado[0][1]+"K";
        document.getElementById("vavance").innerHTML="$"+resultado[0][0]+"K";
    })
    .catch(err=>{console.log(err);})
})

document.getElementById("cuota-general").addEventListener("click",()=>{
    let dataenviada= new Object();
    dataenviada.cgeneral="crea el excel";
    let fetchobj= new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviada);
    fetch(rutacuotageneral,fetchobj)
    .then(resultado=>{
        if(!resultado.ok) throw new Error("fallo la fecheada");
        return resultado.blob();
    })
    .then(resultado=>{
        const url=URL.createObjectURL(resultado);
        const link=document.createElement('a');
        link.href=url;
        link.download="general.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    })
    .catch(err=>{console.log(err);})
})