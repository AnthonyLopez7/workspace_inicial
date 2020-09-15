//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

// mostrar nombre de usario que inicio sesión
var data = localStorage.getItem("user");
document.getElementById("name").innerHTML = data

document.addEventListener("DOMContentLoaded", function (e) {

});