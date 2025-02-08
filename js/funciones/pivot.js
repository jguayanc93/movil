document.getElementById("conjunto-id").addEventListener('click',buscar_pivot)

async function buscar_pivot(){
    let dataenviar=new Object();
    dataenviar.sugerencia='pivot';
    let fetchobj = new Object();
    fetchobj.method="POST";
    fetchobj.headers={"Content-Type":"application/json"};
    fetchobj.mode="cors";
    fetchobj.credentials="include";
    fetchobj.body=JSON.stringify(dataenviar);
    try{
        let paso1= await fetch(rutapivot,fetchobj)
        let paso2= await paso1.json();
        let paso3= await JSON.parse(paso2);
        console.log(paso3);
        
    }
    catch(err){
        console.log(err);
    }
}