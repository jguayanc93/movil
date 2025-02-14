
document.getElementById("producto").addEventListener("input",(ev)=>{
    document.getElementById("recorrer-productos").innerHTML="";
    ev.target.value!='' ? buscar_producto() : document.getElementById("recorrer-productos").innerHTML="";
})