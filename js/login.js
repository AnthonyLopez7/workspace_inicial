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
