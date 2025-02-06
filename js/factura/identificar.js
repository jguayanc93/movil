
document.getElementById("enviar").addEventListener("click",()=>{
    let dataenviar=new Object();
      dataenviar.opc1=document.getElementById("leer").value;
      let fetchobj = new Object();
      fetchobj.method="POST";
      fetchobj.headers={"Content-Type":"application/json"};
      fetchobj.mode="cors";
      fetchobj.credentials="include";
      fetchobj.body=JSON.stringify(dataenviar);
      fetch(rutactualisar,fetchobj)
      .then(resultado=>resultado.ok?resultado.json():resultado.text())
      .then(resultado=>JSON.parse(resultado))///agregado para conversion
      .then(resultado=>{
          document.getElementById("tipo-despacho").value=resultado[0][0];
          document.getElementById("transportista").value=resultado[0][1];
          document.getElementById("atencion").value=resultado[0][2];
        //   document.getElementById("direccion").value=resultado[0][3];
          document.getElementById("direccion").textContent=resultado[0][3];
          document.getElementById("vendedor-asignado").value=resultado[0][4];
          document.getElementById("observacion").value=resultado[0][5];
          document.getElementById("orden-compra").value=resultado[0][6];
          document.getElementById("pista").value=resultado[0][7];
          document.getElementById("doc").value=resultado[0][8];
          
      })
      .catch(err=>{console.log(err);})
  })