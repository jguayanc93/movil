// document.getElementById("conjunto-id").addEventListener('click',buscar_pivot)

async function buscar_pivot(){
    let dataenviar=new Object();
    dataenviar.ncoti=document.getElementById("ncoti").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        promos_conjunto_diferenciales.length=0;////PARA VACIAR LAS PROMOS CADA VES QUE SE BUSCA
        // let paso1= await fetch(rutapivot,fetchobj)
        let paso1= await fetch(rutapromocionbuscador,fetchobj)
        let paso2= await paso1.json();
        // let paso3= await JSON.parse(paso2);
        console.log("este es el array de posibles promociones");
        console.log(paso2);
        for(let idprom of paso2) promos_conjunto_diferenciales.push(idprom);
    }
    catch(err){
        console.log(err);
    }
}