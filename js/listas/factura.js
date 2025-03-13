document.addEventListener('DOMContentLoaded',buscar_dia)
document.getElementById("fecha-dia").addEventListener('change',buscar_dia2);

async function buscar_dia(){
    let dataenviar=new Object();
    // dataenviar.dia=document.getElementById("fecha-dia").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutalistafac,fetchobj)
        let paso2= await paso1.json();
        let paso3= await JSON.parse(paso2);
        
        for(const item in paso3){
            let contenedorinferior=document.createElement('div');

            let tituloh3=document.createElement('h3');
            tituloh3.classList.add("text-sm","text-gray-700");
            let linkh3=document.createElement('a');
            linkh3.href="#";
            let spanh3=document.createElement('span');
            spanh3.setAttribute("aria-hidden",true)
            spanh3.classList.add("absolute","inset-0")
            let ncoti=document.createElement('p');
            ncoti.textContent=paso3[item][1];
            linkh3.appendChild(spanh3);
            linkh3.appendChild(ncoti);
            tituloh3.appendChild(linkh3);

            let parrafo=document.createElement('p');
            parrafo.classList.add("mt-1","text-sm","text-gray-500");
            parrafo.textContent=paso3[item][2];

            contenedorinferior.appendChild(tituloh3)
            contenedorinferior.appendChild(parrafo)

            let parrafo3=document.createElement('p');
            parrafo3.classList.add("text-sm","font-medium","text-gray-900");
            parrafo3.textContent="$"+paso3[item][3];

            let parrafo4=document.createElement('p');
            parrafo4.classList.add("text-sm","font-medium","text-gray-900");
            parrafo4.textContent=paso3[item][4];
            
            let parrafo5=document.createElement('p');
            parrafo5.classList.add("text-sm","font-medium","text-gray-900");
            parrafo5.textContent="/"+paso3[item][5];

            let contenedormedio=document.createElement('div')
            contenedormedio.classList.add("mt-4","flex","justify-between");
            contenedormedio.appendChild(contenedorinferior)
            contenedormedio.appendChild(parrafo3)
            contenedormedio.appendChild(parrafo4)
            contenedormedio.appendChild(parrafo5)

            let img=document.createElement('img');
            img.src="logotipo.png";
            img.alt="Front of men&#039;s Basic Tee in black.";
            // img.classList.add("aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80");
            img.className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80";

            let contenedorsuperior=document.createElement('div');
            // contenedorsuperior.classList.add("group relative");
            contenedorsuperior.className="group relative";
            contenedorsuperior.appendChild(img)
            contenedorsuperior.appendChild(contenedormedio)

            document.getElementById("nfactus").appendChild(contenedorsuperior);
        }
        // console.log(typeof paso3);
        // console.log(paso3);
    }
    catch(err){
        console.log(err);
        let contenedorinferior=document.createElement('div');

            let tituloh3=document.createElement('h3');
            tituloh3.classList.add("text-sm","text-gray-700");
            let linkh3=document.createElement('a');
            linkh3.href="#";
            let spanh3=document.createElement('span');
            spanh3.setAttribute("aria-hidden",true)
            spanh3.classList.add("absolute","inset-0")
            let ncoti=document.createElement('p');
            ncoti.textContent="SIN RESULTADOS";
            linkh3.appendChild(spanh3);
            linkh3.appendChild(ncoti);
            tituloh3.appendChild(linkh3);

            let parrafo=document.createElement('p');
            parrafo.classList.add("text-sm","font-medium","text-gray-900");
            contenedorinferior.appendChild(tituloh3)
            contenedorinferior.appendChild(parrafo)

            let contenedormedio=document.createElement('div')
            contenedormedio.classList.add("mt-4","flex","justify-between");
            contenedormedio.appendChild(contenedorinferior)

            let img=document.createElement('img');
            img.src="logotipo.png";
            img.alt="Front of men&#039;s Basic Tee in black.";
            // img.classList.add("aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80");
            img.className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80";

            let contenedorsuperior=document.createElement('div');
            // contenedorsuperior.classList.add("group relative");
            contenedorsuperior.className="group relative";
            //contenedorsuperior.appendChild(img)
            contenedorsuperior.appendChild(contenedormedio)

            document.getElementById("nfactus").appendChild(contenedorsuperior);
    }
}

async function buscar_dia2(){
    document.getElementById("nfactus").innerHTML="";
    let dataenviar=new Object();
    dataenviar.dia=document.getElementById("fecha-dia").value;
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutalistafacdia,fetchobj)
        let paso2= await paso1.json();
        let paso3= await JSON.parse(paso2);
        
        for(const item in paso3){
            let contenedorinferior=document.createElement('div');

            let tituloh3=document.createElement('h3');
            tituloh3.classList.add("text-sm","text-gray-700");
            let linkh3=document.createElement('a');
            linkh3.href="#";
            let spanh3=document.createElement('span');
            spanh3.setAttribute("aria-hidden",true)
            spanh3.classList.add("absolute","inset-0")
            let ncoti=document.createElement('p');
            ncoti.textContent=paso3[item][1];
            linkh3.appendChild(spanh3);
            linkh3.appendChild(ncoti);
            tituloh3.appendChild(linkh3);

            let parrafo=document.createElement('p');
            parrafo.classList.add("mt-1","text-sm","text-gray-500");
            parrafo.textContent=paso3[item][2];

            contenedorinferior.appendChild(tituloh3)
            contenedorinferior.appendChild(parrafo)

            let parrafo3=document.createElement('p');
            parrafo3.classList.add("text-sm","font-medium","text-gray-900");
            parrafo3.textContent="$"+paso3[item][3];

            let parrafo4=document.createElement('p');
            parrafo4.classList.add("text-sm","font-medium","text-gray-900");
            parrafo4.textContent=paso3[item][4];

            let parrafo5=document.createElement('p');
            parrafo5.classList.add("text-sm","font-medium","text-gray-900");
            parrafo5.textContent="/"+paso3[item][5];

            let contenedormedio=document.createElement('div')
            contenedormedio.classList.add("mt-4","flex","justify-between");
            contenedormedio.appendChild(contenedorinferior)
            contenedormedio.appendChild(parrafo3)
            contenedormedio.appendChild(parrafo4)
            contenedormedio.appendChild(parrafo5)

            let img=document.createElement('img');
            img.src="logotipo.png";
            img.alt="Front of men&#039;s Basic Tee in black.";
            // img.classList.add("aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80");
            img.className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80";

            let contenedorsuperior=document.createElement('div');
            // contenedorsuperior.classList.add("group relative");
            contenedorsuperior.className="group relative";
            contenedorsuperior.appendChild(img)
            contenedorsuperior.appendChild(contenedormedio)

            document.getElementById("nfactus").appendChild(contenedorsuperior);
        }
    }
    catch(err){
        console.log(err);
        let contenedorinferior=document.createElement('div');

            let tituloh3=document.createElement('h3');
            tituloh3.classList.add("text-sm","text-gray-700");
            let linkh3=document.createElement('a');
            linkh3.href="#";
            let spanh3=document.createElement('span');
            spanh3.setAttribute("aria-hidden",true)
            spanh3.classList.add("absolute","inset-0")
            let ncoti=document.createElement('p');
            ncoti.textContent="SIN RESULTADOS";
            linkh3.appendChild(spanh3);
            linkh3.appendChild(ncoti);
            tituloh3.appendChild(linkh3);

            let parrafo=document.createElement('p');
            parrafo.classList.add("text-sm","font-medium","text-gray-900");
            contenedorinferior.appendChild(tituloh3)
            contenedorinferior.appendChild(parrafo)

            let contenedormedio=document.createElement('div')
            contenedormedio.classList.add("mt-4","flex","justify-between");
            contenedormedio.appendChild(contenedorinferior)

            let img=document.createElement('img');
            img.src="logotipo.png";
            img.alt="no encontrado";
            // img.classList.add("aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80");
            img.className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80";

            let contenedorsuperior=document.createElement('div');
            // contenedorsuperior.classList.add("group relative");
            contenedorsuperior.className="group relative";
            //contenedorsuperior.appendChild(img)
            contenedorsuperior.appendChild(contenedormedio)

            document.getElementById("nfactus").appendChild(contenedorsuperior);
    }
}