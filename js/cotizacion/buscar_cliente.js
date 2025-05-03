
document.getElementById("busqueda").addEventListener("input",(ev)=>{
    let busqueda=ev.target.value;
    // let busqueda_anterior=document.getElementById("recorrer");
    // busqueda_anterior.innerHTML="";
    // busqueda=='' ? busqueda_anterior.innerHTML="" : buscar_cliente(busqueda);

    let busqueda_anterior=document.getElementById("recorrer-clientes");
    busqueda_anterior.innerHTML="";
    busqueda=='' ? busqueda_anterior.innerHTML="" : buscar_cliente2(busqueda);////CAMBIAR ESTO a buscar_cliente luego
})