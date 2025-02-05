
async function buscar_cliente(busqueda){
    let dataenviar=new Object();
    // dataenviar.sugerencia=document.getElementById("busqueda").value;
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
            // let escondido=document.createElement("p");
            // escondido.classList.add("paraguardar");
            // escondido.innerHTML=paso3[indice][0];
            // let mensaje2=document.createElement("td");
            // mensaje2.appendChild(escondido);

            let seleccionable=document.createElement("p");
            // seleccionable.classList.add("click");
            seleccionable.innerHTML=paso3[indice][1];
            // seleccionable.addEventListener("click",()=>cliente(paso3[indice][0]));
            seleccionable.addEventListener("click",()=>{
                document.getElementById("busqueda").value=paso3[indice][1];
                cliente(paso3[indice][0])
            });
            let mensaje=document.createElement("td");
            mensaje.appendChild(seleccionable);

            let cuadrado=document.createElement("tr");
            // cuadrado.appendChild(mensaje2);
            cuadrado.appendChild(mensaje);
            document.getElementById("recorrer").appendChild(cuadrado);
        }

        // let reconocedor=document.getElementById("recorrer");

        // for(let i of reconocedor.children){
        //     i.lastElementChild.firstElementChild.addEventListener("click",()=>{
        //         cliente(i.firstElementChild.firstElementChild.textContent,i.lastElementChild.firstElementChild.textContent);
        //     })
        // }
    }
    catch(err){
        console.log(err);
    }
}