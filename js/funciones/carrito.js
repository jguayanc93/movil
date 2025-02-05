document.getElementById("carrito").addEventListener('click',()=>carrito())

function carrito(){
    // console.log(agrupacion);
    document.getElementById("productos-listados").innerHTML="";
    document.getElementById("carro-contenedor").classList.remove('hidden');

    for(let item in agrupacion){
        // console.log(agrupacion[item]);

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
    capa8.textContent="$90.00";

    let capa9=document.createElement('p')
    capa9.className="mt-1 text-sm text-gray-500";
    capa9.textContent="salmon";

    let capa10=document.createElement('div')
    capa10.className="flex flex-1 items-end justify-between text-sm";
    let capa11=document.createElement('p');
    capa11.className="text-gray-500";
    capa11.textContent=`Qty ${agrupacion[item][1]}`;

    let capa12=document.createElement('div');
    capa12.className="flex";

    let capa13=document.createElement('button')
    capa13.type="button";
    capa13.className="font-medium text-indigo-600 hover:text-indigo-500";
    capa13.textContent="Remover";    
    // parrafo2.addEventListener('input',activar_boton_confirmacion)
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

document.getElementById("carrito-cerrar").addEventListener('click',cerrar_carrito);
function cerrar_carrito(){
    document.getElementById("carro-contenedor").classList.add('hidden');
}