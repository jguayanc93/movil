
// document.getElementById("busqueda").addEventListener("input",()=>{
//     document.getElementById("recorrer").innerHTML="";
//     buscar_cliente();
// })

document.getElementById("busqueda").addEventListener("input",(ev)=>{
    let busqueda=ev.target.value;
    let busqueda_anterior=document.getElementById("recorrer");
    busqueda_anterior.innerHTML="";
    busqueda=='' ? busqueda_anterior.innerHTML="" : buscar_cliente(busqueda);
})