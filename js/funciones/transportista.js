async function get_transportista(){
    let dataenviar=new Object();
    dataenviar.sugerencia=document.getElementById("transportista2").value;
    let fetchobj=new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
      let paso1=await fetch(rutafacturacambiotransportista,fetchobj)
      let paso2=await paso1.json();
      let paso3=await JSON.parse(paso2);
      console.log("verificar respuesta de los transportistas buscado",paso3);
      
      // Limpiar el dropdown de resultados
      const resultadosContainer = document.getElementById("resultados-transportistas");
      resultadosContainer.innerHTML = '';
      
      if(Object.keys(paso3).length > 0){
        resultadosContainer.classList.remove('hidden');
        
        for(let indice in paso3){
          const codigo = paso3[indice][0];
          const nombre = paso3[indice][1];
          
          const div = document.createElement('div');
          div.className = 'px-4 py-2.5 hover:bg-indigo-100 cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors';
          div.innerHTML = `<div class="font-medium text-gray-800">${nombre}</div>`;
          
          div.addEventListener('click', function(){
            seleccionarTransportista(codigo, nombre);
          });
          
          resultadosContainer.appendChild(div);
        }
      } else {
        resultadosContainer.classList.add('hidden');
      }
    }
    catch(err){
      console.log(err);
      toast.error('Error al buscar transportistas');
    }
  }