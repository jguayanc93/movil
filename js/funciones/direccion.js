async function get_direccion(){
    let dataenviar=new Object();
    dataenviar.cli=objfactura[0];
    // dataenviar.sugerencia=document.getElementById("direccion2").value;
    let fetchobj=new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
      // let paso1=await fetch(rutaropc4,fetchobj)
      let paso1=await fetch(rutafacturacambiodireccion,fetchobj)
      let paso2=await paso1.json();
      let paso3=await JSON.parse(paso2);
      // for(let indice in paso3){
      //   let seleccionable=document.createElement("p");
      //   seleccionable.classList.add("click");
      //   seleccionable.innerHTML=paso3[indice][0];
      //   let mensaje=document.createElement("td");
      //   mensaje.appendChild(seleccionable);
      //   let cuadrado=document.createElement("tr");

      //   cuadrado.appendChild(mensaje);

      //   document.getElementById("recorrer").appendChild(cuadrado);
      // }

      for(let indice in paso3){
        let card=document.createElement("div");
        card.className="bg-whtie p-4 rounded border border-blue-200";
        let titulo=document.createElement("div");
        titulo.className="text-blue-600 font-bold mb-2";
        titulo.innerHTML="1. CALLE";

        let direccion=document.createElement("p");
        direccion.className="text-sm text-gray-700";
        direccion.innerHTML=paso3[indice][1];

        card.appendChild(titulo);
        card.appendChild(direccion);

        document.getElementById("all-direcciones").appendChild(card);
      }

      // let reconocedor=document.getElementById("recorrer");
  
      // for(let i of reconocedor.children){
      //   i.firstElementChild.firstElementChild.addEventListener("click",()=>{
      //     acumulador.push(4);
      //     // preparado(i.firstElementChild.firstElementChild.textContent,acumulador[0],document.getElementById("doc").value);
      //     preparado(i.firstElementChild.firstElementChild.textContent,4,objfactura[1]);
      //     document.getElementById("direccion2").value=i.lastElementChild.firstElementChild.textContent;
      //   })
      // }
    }
    catch(err){
      console.log(err);
    }
  }