//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

// onclick="location.href='index.html'"
// onclick="validation"

// document.addEventListener("DOMContentLoaded", function(e){
// });

function validar() {
    var usuario = document.getElementById("usuario").value;
    var Contraseña = document.getElementById("pass").value;

    if (usuario == "" || Contraseña == "") {
        alert("Debe completar todos los campos");
    }
    else {
        location.href='index.html'
    }
}
