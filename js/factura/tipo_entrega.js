document.getElementById("tipo-despacho2").addEventListener('input',(ev)=>{
  document.getElementById("recorrer").innerHTML="";
  ev.target.value=='' ? document.getElementById("recorrer").innerHTML="" : get_despacho();
})


['primera-opc', 'segunda-opc', 'tercera-opc'].forEach(id => {
    document.getElementById(id).addEventListener("click", () => {
        preparado(document.getElementById(id).dataset.despacho, 1, objfactura[1]);
    });
});