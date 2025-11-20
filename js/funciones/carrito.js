document.getElementById("carrito").addEventListener('click',()=>carrito2())

function carrito(){
    
    document.getElementById("productos-listados").innerHTML="";
    document.getElementById("carro-contenedor").classList.remove('hidden');

    for(let item in agrupacion){        

    let capa1=document.createElement('li');
    capa1.className="flex py-6";

    let capa2=document.createElement('div');
    capa2.className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200";

    let capaimg=document.createElement('img');
    capaimg.src="https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg";
    capaimg.alt="imagen";
    capaimg.className="size-full object-cover";

    let capa3=document.createElement('div');
    capa3.className="ml-4 flex flex-1 flex-col";
    let capa4=document.createElement('div');
    
    let capa5=document.createElement('div');
    capa5.className="flex justify-between text-base font-medium text-gray-900";
    let capa6=document.createElement('h3');
    
    let capa7=document.createElement('a');
    capa7.className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left";
    capa7.href="#";
    capa7.text=`${agrupacion[item][0]}`;

    let capa8=document.createElement('p')
    capa8.className="ml-4";
    capa8.textContent="$"+agrupacion[item][3];

    let capa9=document.createElement('p')
    capa9.className="mt-1 text-sm text-gray-500";
    capa9.textContent=`Cant. ${agrupacion[item][1]}`;

    let capa10=document.createElement('div')
    capa10.className="flex flex-1 items-end justify-between text-sm";
    let capa11=document.createElement('p');
    capa11.className="text-gray-500";
    capa11.textContent=`Rentabilidad: `;

    let capa12=document.createElement('div');
    capa12.className="flex";

    let capa13=document.createElement('button')
    capa13.type="button";
    capa13.className="font-medium text-indigo-600 hover:text-indigo-500";
    capa13.textContent="Remover";
    capa13.addEventListener('click',()=>remover_item(item))
    
    capa2.appendChild(capaimg);

    capa12.appendChild(capa13);
    capa10.appendChild(capa11);
    capa10.appendChild(capa12);

    capa6.appendChild(capa7);
    capa5.appendChild(capa6);
    capa5.appendChild(capa8);

    capa4.appendChild(capa5);
    capa4.appendChild(capa9);

    capa3.appendChild(capa4);
    capa3.appendChild(capa10);

    capa1.appendChild(capa2);
    capa1.appendChild(capa3);

    document.getElementById("productos-listados").appendChild(capa1);
    }
    document.getElementById("productos-listados").classList.remove('hidden');
}

 
async function carrito2(){
    console.log("esto deberia ser el objeto enviado del carro",agrupacion)
    ////////////////////////
    let dataenviar=new Object();
    dataenviar.productos=agrupacion;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1=await fetch(rutacarritorentabilidad,fetchobj)
        let paso2=await paso1.json();
        console.log("esto deberia ser el objeto recibido del carro",paso2);

        document.getElementById("productos-listados").innerHTML="";
        document.getElementById("productos-totales").innerHTML="";
        document.getElementById("carro-contenedor").classList.remove('hidden');

        let subtotal=0;

        for(let item in paso2){

            let capa1=document.createElement('li');
            capa1.className="flex py-6";

            let capa2=document.createElement('div');
            capa2.className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200";

            let capaimg=document.createElement('img');
            capaimg.src="https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg";
            capaimg.alt="imagen";
            capaimg.className="size-full object-cover";

            let capa3=document.createElement('div');
            capa3.className="ml-4 flex flex-1 flex-col";
            let capa4=document.createElement('div');

            let capa5=document.createElement('div');
            capa5.className="flex justify-between text-base font-medium text-gray-900";
            let capa6=document.createElement('h3');

            let capa7=document.createElement('a');
            capa7.className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left";
            capa7.href="#";
            capa7.text=`${paso2[item][0]}`;

            let capa8=document.createElement('p')
            capa8.className="ml-4";
            capa8.textContent="$"+paso2[item][5];

            let capa9=document.createElement('p')
            capa9.className="mt-1 text-sm text-gray-500";
            capa9.textContent=`Cant. ${paso2[item][1]}`;

            let capa10=document.createElement('div')
            capa10.className="flex flex-1 items-end justify-between text-sm";
            let capa11=document.createElement('p');
            capa11.className="text-gray-500";
            capa11.textContent=`Rentabilidad: ${paso2[item][7]}%`;
            let capa12=document.createElement('div');
            capa12.className="flex";

            let capa13=document.createElement('button')
            capa13.type="button";
            capa13.className="font-medium text-indigo-600 hover:text-indigo-500";
            capa13.textContent="Remover";
            capa13.addEventListener('click',()=>remover_item(item))

            capa2.appendChild(capaimg);
            capa12.appendChild(capa13);
            capa10.appendChild(capa11);
            capa10.appendChild(capa12);
            capa6.appendChild(capa7);
            capa5.appendChild(capa6);
            capa5.appendChild(capa8);
            capa4.appendChild(capa5);
            capa4.appendChild(capa9);
            capa3.appendChild(capa4);
            capa3.appendChild(capa10);
            capa1.appendChild(capa2);
            capa1.appendChild(capa3);

            document.getElementById("productos-listados").appendChild(capa1);
            subtotal+=paso2[item][5];
        }
        //////////parte para la generada del totalisado del carro
        let pie1=document.createElement('div');
        pie1.className="flex justify-between text-base font-medium text-gray-900";
        let pie2=document.createElement('p');
        pie2.textContent="SubTotal";
        let pie3=document.createElement('p')
        pie3.textContent=`$ ${subtotal.toFixed(2)}`;
        let pie4=document.createElement('p');
        pie4.className="mt-0.5 text-sm text-gray-500";
        pie4.textContent="resultados pueden variar.";
        let pie5=document.createElement('div');
        pie5.className="mt-6";
        let pie6=document.createElement('a')
        pie6.id="carrito-cerrar";
        pie6.href="#";
        pie6.className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700";
        pie6.textContent="Cerrar";
        pie6.addEventListener('click',cerrar_carrito);

        pie1.appendChild(pie2);
        pie1.appendChild(pie3);
        pie5.appendChild(pie6);
        document.getElementById("productos-totales").appendChild(pie1);
        document.getElementById("productos-totales").appendChild(pie4);
        document.getElementById("productos-totales").appendChild(pie5);


        document.getElementById("productos-listados").classList.remove('hidden');
        
    }
    catch(err){
        console.log(err);
    }
    
}

// document.getElementById("carrito-cerrar").addEventListener('click',cerrar_carrito);

function cerrar_carrito(){ document.getElementById("carro-contenedor").classList.add('hidden'); }

function remover_item(codi){
    delete agrupacion[codi];
    document.getElementById("carro-contenedor").classList.add('hidden');
    if(Object.keys(agrupacion).length==0){
        document.getElementById("creacion").classList.remove("bg-green-500");
        document.getElementById("creacion").classList.add("bg-rose-500");
    }
}