
document.getElementById("adjuntar").addEventListener("click",()=>{
    addprom();
})

async function addprom(){
    let dataenviar=new Object();
    dataenviar.ncoti=document.getElementById("ncoti").value;
    dataenviar.fullpromo=prom_numero;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1=await fetch(rutaaddprom,fetchobj)
        let paso2=await paso1.json();
        console.log(paso2);
        ////mostrar un texto temporal segun resultado
    }
    catch(err){console.log(err);}
}