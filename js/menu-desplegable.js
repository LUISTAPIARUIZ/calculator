let botonTresBarras = document.getElementById("menu-desplegable-tres-barras");
let menuDesplegable = document.getElementById("menu-desplegable");
let botonCerrarMenu = document.getElementById("boton-cerrar-menu");
botonTresBarras.addEventListener("click", function(){
    menuDesplegable.classList.toggle("menu-active")
})
botonCerrarMenu.addEventListener("click", function(){
    menuDesplegable.classList.toggle("menu-active");
})