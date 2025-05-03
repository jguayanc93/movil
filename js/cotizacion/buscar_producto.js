
document.getElementById("producto").addEventListener("input",(ev)=>{
    document.getElementById("recorrer-productos").innerHTML="";
    ev.target.value!='' ? buscar_producto() : document.getElementById("recorrer-productos").innerHTML="";
})
/////CAMBIO DE BUSUQEDA
// document.getElementById("productof").addEventListener("input",(ev)=>{
//     document.getElementById("recorrer-productos").innerHTML="";
//     // let rutatemporalparabuscar;
//     // console.log(document.getElementById("currency2").value)
//     // if(document.getElementById("currency2").value=='2')
//     ev.target.value!='' ? buscar_producto() : document.getElementById("recorrer-productos").innerHTML="";
// })

// document.getElementById("currency2").addEventListener('change',()=>{
//     console.log("ejecutando cambio")
//     document.getElementById("voz").disabled=false;
//     document.getElementById("voz").className="bg-sky-500";
// })

// document.getElementById("currency2").addEventListener('change',(ev)=>{
//     if(ev.target.value=="2"){
//         document.getElementById("producto").classList.add("hidden");
//         document.getElementById("productof").classList.remove("hidden");
//     }
//     if(ev.target.value=="1"){
//         document.getElementById("producto").classList.remove("hidden");
//         document.getElementById("productof").classList.add("hidden");
//     }
// })