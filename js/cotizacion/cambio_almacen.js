
document.getElementById("alm").addEventListener('change',()=>{
    almc_id=document.getElementById("alm").value;
    // Recalcular precios si el modal de producto está abierto
    if (typeof recalcularPreciosConMoneda === "function") {
        recalcularPreciosConMoneda();
    }
})