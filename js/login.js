
function validar(user) {
    var usuario = document.getElementById("usuario").value;
    var Contraseña = document.getElementById("pass").value;

    if (usuario == "" || Contraseña == "") {
        alert("Debe completar todos los campos");
    }
    else {
        localStorage.setItem('user', user);
        location.href = 'home.html'
    }
}
// cargamos contenido o función cuando se carga la página
document.addEventListener("DOMContentLoaded", function (e) {
    // limpiamos el localStorage para que si el usuario no se logea no aparezca en la barra del menú
    localStorage.clear()
});
