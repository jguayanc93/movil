
async function generador_coti(){
    let dataenviar=new Object();
    dataenviar.cliente=cliente_data;
    dataenviar.productos=agrupacion;
    dataenviar.promos=promos_insertadas;
    dataenviar.alm=almc_id;

    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1 = await fetch(rutacreacion,fetchobj)
        let paso2 = await paso1.json();
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