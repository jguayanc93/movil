document.getElementById("vendedor-asignado2").addEventListener("input",(ev)=>{
    document.getElementById("recorrer").innerHTML='';
    ev.target.value==='' ? document.getElementById("recorrer").innerHTML='' : get_vendedor();
})