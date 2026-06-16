
async function buscar_cliente(busqueda){
    let dataenviar=new Object();
    dataenviar.sugerencia=busqueda;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutabcliente,fetchobj)
        let paso2= await paso1.json();
        let paso3= await JSON.parse(paso2);
        for(let indice in paso3){
            let seleccionable=document.createElement("p");
            seleccionable.innerHTML=paso3[indice][1];
            seleccionable.addEventListener("click",()=>{
                document.getElementById("busqueda").value=paso3[indice][1];
                cliente(paso3[indice][0])
            });
            let mensaje=document.createElement("td");
            mensaje.appendChild(seleccionable);

            let cuadrado=document.createElement("tr");
            cuadrado.appendChild(mensaje);
            document.getElementById("recorrer").appendChild(cuadrado);
        }
        
    }
    catch(err){
        console.log(err);
    }
}