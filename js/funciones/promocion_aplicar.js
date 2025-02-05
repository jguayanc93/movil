
async function promociones(){
    let dataenviar=new Object();
    dataenviar.promo=document.getElementById("opg").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1 = await fetch(rutapromocion,fetchobj)
        let paso2 = await paso1.json()
        let paso3 = await JSON.parse(paso2);
        console.log(paso3);
        // let paso3 = await paso2=="sin resultados?"?rechazado(paso2):aceptado(paso2);
        let recolector=[];
        for(let indice in paso3){
            // let resultado=minfiltrador(paso3[indice][0]);
            let resultado=minfiltrador(paso3[indice]);
            if(resultado!=false){
                recolector.push(JSON.parse(resultado));
            }
        }

        if(recolector.length>0){
            for(let valor of recolector){
                for(let indice in valor){
                    let escondido1=document.createElement("p");
                    escondido1.textContent=valor[indice][0];
                    let mensaje1=document.createElement("td");
                    mensaje1.appendChild(escondido1);

                    let escondido2=document.createElement("p");
                    escondido2.textContent=valor[indice][1];
                    let mensaje2=document.createElement("td");
                    mensaje2.appendChild(escondido2);

                    let escondido3=document.createElement("p");
                    escondido3.textContent=valor[indice][2];
                    let mensaje3=document.createElement("td");
                    mensaje3.appendChild(escondido3);

                    let renglon=document.createElement("tr");
                    renglon.appendChild(mensaje1);
                    renglon.appendChild(mensaje2);
                    renglon.appendChild(mensaje3);
                    let contenedor=document.getElementById("promos");
                    contenedor.appendChild(renglon);
                }
            }
        }
        else{ document.getElementById("prom-respuesta").textContent="no existe productos al cual aplicar tu opg"; }
    }
    catch(err){
        console.log("tu promocion ya vencio su fecha");
        console.log(err);
    }
}

function minfiltrador(objeto){
    let conjunto={};
    console.log(agrupacion);
    for(let indice in agrupacion){
        if(indice==objeto[0]){
            let dsct=(parseFloat(objeto[3])*0.18).toFixed(2);
            let nompro=objeto[1];
            let dsct_con_igv=parseFloat(objeto[3]);
            let dsct_sin_igv = (parseFloat(objeto[3])-dsct).toFixed(2);
            let totalisado = (parseInt(agrupacion[indice][1])*dsct_con_igv).toFixed(2);
            conjunto[indice]=[agrupacion[indice][0],dsct_sin_igv,totalisado];
            ////////////////////////solo para testear el objeto global de promos
            promos_insertadas[indice]=[agrupacion[indice][0],nompro,dsct_sin_igv,dsct_con_igv,totalisado];
        }
    }

    for(let propiedad in conjunto){
        if(Object.hasOwn(conjunto,propiedad)){ return JSON.stringify(conjunto); }
    }
    return false;
}