
// document.getElementById("enviar").addEventListener("click",()=>{
//     let dataenviar=new Object();
//     dataenviar.opc1=document.getElementById("leer").value;
//     let fetchobj = new Object();
//     fetchobj.method="POST";
//     fetchobj.headers={"Content-Type":"application/json"};
//     fetchobj.mode="cors";
//     fetchobj.credentials="include";
//     fetchobj.body=JSON.stringify(dataenviar);
//     fetch(rutactualisar,fetchobj)
//     .then(resultado=>resultado.ok?resultado.json():resultado.text())
//     .then(resultado=>JSON.parse(resultado))///agregado para conversion
//     .then(resultado=>{
//         objfactura=[];
//           document.getElementById("tipo-despacho").value=resultado[0][1];
//           document.getElementById("transportista").textContent=resultado[0][3];
//           document.getElementById("atencion").textContent=resultado[0][4];
//           document.getElementById("direccion").textContent=resultado[0][5];
//           document.getElementById("vendedor-asignado").value=resultado[0][6];
//           document.getElementById("observacion").value=resultado[0][7];
//           document.getElementById("orden-compra").value=resultado[0][8];
//         //   document.getElementById("pista").value=resultado[0][9];
//         //   document.getElementById("doc").value=resultado[0][10];
//           objfactura=[resultado[0][9],resultado[0][10]]
//       })
//       .catch(err=>{console.log(err);})
//   })

if(document.getElementById("enviar1")){
  document.getElementById("enviar1").addEventListener("click",()=>{
    let dataenviar=new Object();
    dataenviar.opc1=document.getElementById("leer").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    fetch(rutafacturacampodespacho,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>JSON.parse(resultado))///agregado para conversion
    .then(resultado=>{
      objfactura=[];
      objfactura=[resultado[0][2],resultado[0][3]];
      document.getElementById("tipo-despacho").value=resultado[0][1];
    })
    .catch(err=>{console.log(err);})
  })
}
if(document.getElementById("enviar2")){
  document.getElementById("enviar2").addEventListener("click",()=>{
    let dataenviar=new Object();
    dataenviar.opc1=document.getElementById("leer").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    fetch(rutafacturacampotransportista,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>JSON.parse(resultado))///agregado para conversion
    .then(resultado=>{
      objfactura=[];
      objfactura=[resultado[0][2],resultado[0][3]];
      document.getElementById("transportista").textContent=resultado[0][1];
      })
      .catch(err=>{console.log(err);})
  })
}
if(document.getElementById("enviar3")){
  document.getElementById("enviar3").addEventListener("click",()=>{
    let dataenviar=new Object();
    dataenviar.opc1=document.getElementById("leer").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    fetch(rutafacturacampoatencion,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>JSON.parse(resultado))///agregado para conversion
    .then(resultado=>{
      objfactura=[];
      objfactura=[resultado[0][1],resultado[0][2]];
      document.getElementById("atencion").textContent=resultado[0][0];
      })
      .catch(err=>{console.log(err);})
  })
}
if(document.getElementById("enviar4")){
  document.getElementById("enviar4").addEventListener("click",()=>{
    let dataenviar=new Object();
    dataenviar.opc1=document.getElementById("leer").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    fetch(rutafacturacampodireccion,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>JSON.parse(resultado))///agregado para conversion
    .then(resultado=>{
      objfactura=[];
      objfactura=[resultado[0][1],resultado[0][2]];
      document.getElementById("direccion").textContent=resultado[0][0];
      })
      .catch(err=>{console.log(err);})
  })
}
if(document.getElementById("enviar5")){
  document.getElementById("enviar5").addEventListener("click",()=>{
    let dataenviar=new Object();
    dataenviar.opc1=document.getElementById("leer").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    fetch(rutafacturacampovendedor,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>JSON.parse(resultado))///agregado para conversion
    .then(resultado=>{
      objfactura=[];
      objfactura=[resultado[0][1],resultado[0][2]];
      document.getElementById("vendedor-asignado").value=resultado[0][0];
    })
      .catch(err=>{console.log(err);})
  })
}
if(document.getElementById("enviar6")){
  document.getElementById("enviar6").addEventListener("click",()=>{
    let dataenviar=new Object();
    dataenviar.opc1=document.getElementById("leer").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    fetch(rutafacturacampoobservacion,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>JSON.parse(resultado))///agregado para conversion
    .then(resultado=>{
      objfactura=[];
      objfactura=[resultado[0][1],resultado[0][2]];
      document.getElementById("observacion").value=resultado[0][0];
    })
      .catch(err=>{console.log(err);})
  })
}
if(document.getElementById("enviar7")){
  document.getElementById("enviar7").addEventListener("click",()=>{
    let dataenviar=new Object();
    dataenviar.opc1=document.getElementById("leer").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    fetch(rutafacturacampoorden,fetchobj)
    .then(resultado=>resultado.ok?resultado.json():resultado.text())
    .then(resultado=>JSON.parse(resultado))///agregado para conversion
    .then(resultado=>{
      objfactura=[];
      objfactura=[resultado[0][1],resultado[0][2]];
      document.getElementById("orden-compra").value=resultado[0][0];
    })
      .catch(err=>{console.log(err);})
  })
} 