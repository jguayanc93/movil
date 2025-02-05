
async function generador_coti(){
    let dataenviar=new Object();
    dataenviar.cliente=cliente_data;
    dataenviar.productos=agrupacion;
    dataenviar.promos=promos_insertadas;
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
        // let paso3 = await
    }
    catch(err){
        console.log(err);
    }
}