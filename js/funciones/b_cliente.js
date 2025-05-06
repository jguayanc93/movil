
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
        
    }
    catch(err){
        console.log(err);
    }
}

async function buscar_cliente2(busqueda){
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

        let contenedor_general=document.createElement('div');
        contenedor_general.className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4";

        let contenedor_general1=document.createElement('div');
        contenedor_general1.className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5";

        let contenedor_general2=document.createElement('div');
        contenedor_general2.className="p-4";

        for(let indice in paso3){

            let contenedor_general3=document.createElement('div')
            contenedor_general3.className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50";

            let contenedor1=document.createElement('div');
            let enlace_descripcion_titulo=document.createElement('a');
            enlace_descripcion_titulo.href="#";
            enlace_descripcion_titulo.className="font-semibold text-gray-900";
            enlace_descripcion_titulo.textContent="SUGERENCIA";
            let spamcito=document.createElement('span');
            spamcito.className="absolute inset-0";
            enlace_descripcion_titulo.appendChild(spamcito)          
            let parrafo_descripcion_data=document.createElement('p')
            parrafo_descripcion_data.className="mt-1 text-gray-600";
            parrafo_descripcion_data.textContent=paso3[indice][1];

            contenedor1.appendChild(enlace_descripcion_titulo);
            contenedor1.appendChild(parrafo_descripcion_data);
            contenedor1.addEventListener("click",()=>{
                document.getElementById("busqueda").value=paso3[indice][1];
                cliente(paso3[indice][0])
            })

            contenedor_general3.appendChild(contenedor1);
            contenedor_general2.appendChild(contenedor_general3);
        }

        contenedor_general1.appendChild(contenedor_general2);
        contenedor_general.appendChild(contenedor_general1);

        document.getElementById("recorrer-clientes").appendChild(contenedor_general);
        
    }
    catch(err){
        console.log(err);
    }
}