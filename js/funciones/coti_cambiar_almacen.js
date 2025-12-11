document.getElementById("cambio").addEventListener("click",()=>{
    cambio_almacen();
})


async function cambio_almacen(){
    let dataenviar=new Object();
    dataenviar.ncoti=document.getElementById("busqueda").value;
    dataenviar.alm=almc_id;

    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1 = await fetch(rutacotizacioncambiaralmacen,fetchobj)
        let paso2 = await paso1.json();
        console.log("verificar lo que esta regresando por consultas");
        console.log(paso2);
        ///BORRANDO DATOS GUARDADOS DE LA COTI
        cliente_data.length=0;
        almc_id='01';
        for(let prod in agrupacion) if(agrupacion.hasOwnProperty(prod)) delete agrupacion[prod];
    }
    catch(err){
        console.log(err);
    }
}