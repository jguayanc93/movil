async function get_direccion(){
    let dataenviar=new Object();
    dataenviar.cli=document.getElementById("pista").value;
    dataenviar.sugerencia=document.getElementById("direccion2").value;
    let fetchobj=new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
      let paso1=await fetch(rutaropc4,fetchobj)
      let paso2=await paso1.json();
      let paso3=await JSON.parse(paso2);
      for(let indice in paso3){
        let seleccionable=document.createElement("p");
        seleccionable.classList.add("click");
        seleccionable.innerHTML=paso3[indice][0];
        let mensaje=document.createElement("td");
        mensaje.appendChild(seleccionable);
        let cuadrado=document.createElement("tr");

        cuadrado.appendChild(mensaje);

        document.getElementById("recorrer").appendChild(cuadrado);
      }

      let reconocedor=document.getElementById("recorrer");
  
      for(let i of reconocedor.children){
        i.firstElementChild.firstElementChild.addEventListener("click",()=>{
          acumulador.push(4);
          preparado(i.firstElementChild.firstElementChild.textContent,acumulador[0],document.getElementById("doc").value);
          document.getElementById("direccion2").value=i.lastElementChild.firstElementChild.textContent;
        })
      }
    }
    catch(err){
      console.log(err);
    }
  }