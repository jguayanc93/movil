
function preparado(sustituto,indice,doc){
    console.log("sustituto",sustituto,"indice",indice,"doc",doc);
    let dataenviar=new Object();
    dataenviar[indice]=sustituto;
    dataenviar.doc=doc;
    let fetchobj=new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    // fetch(rutarevisar,fetchobj)
    fetch(rutafacturacampoactualisar,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>{
        acumulador.shift();
        document.getElementById("recorrer").innerHTML="";
        console.log(resultado)
        
        // Mensaje de éxito con opciones
        const confirmar = confirm(
            `✓ ¡Cambio de despacho exitoso!\n\n` +
            `¿Qué deseas hacer?\n\n` +
            `Aceptar → Regresar al menú\n` +
            `Cancelar → Cambiar otra factura`
        );
        
        if (confirmar) {
            // Regresar al menú principal
            window.location.href = '/main.html';
        } else {
            // Limpiar el formulario para cambiar otra factura
            document.getElementById("leer").value = "";
            document.getElementById("tipo-despacho").value = "";
            document.getElementById("tipo-despacho-display").innerHTML = 
                '<span class="text-gray-400">Busca una factura para cargar esta información</span>';
            document.getElementById("leer").focus();
        }
    })
    .catch(err=>{
        console.log(err);
        alert("❌ Error: No se pudo actualizar el despacho. Intenta nuevamente.");
    })
}