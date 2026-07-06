
const botonCreacion = document.getElementById("creacion");
if (botonCreacion) {
    botonCreacion.addEventListener("click", () => {
        if (typeof window.crearCotizacion === "function") {
            window.crearCotizacion();
        }
    });
}