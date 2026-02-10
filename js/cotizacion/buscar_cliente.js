
document.getElementById("busqueda").addEventListener("input",(ev)=>{
    let busqueda=ev.target.value;
    let busqueda_anterior=document.getElementById("recorrer-clientes");
    busqueda_anterior.innerHTML="";
    if(busqueda.length>2){buscar_cliente2(busqueda);}
    else{
        busqueda_anterior.innerHTML="";
    }
    // busqueda=='' ? busqueda_anterior.innerHTML="" : buscar_cliente2(busqueda);////CAMBIAR ESTO a buscar_cliente luego
})