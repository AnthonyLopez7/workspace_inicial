//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

// función para abrir formulario para editar los datos del usuario
function openFormEditProfile() {
    var buttonEdit = document.getElementById('buttonEdit'); //obtenemos el botón que abre el formulario para editar los datos del usuarios
    // var buttonSaveData = document.getElementById('btnSaveData'); //obtenemos el botón que guarda los datos del formulario
    var formEditProfile = document.getElementById('formUserDate'); // obtenemos el formulario donde estaran los campos para completar los datos

    // evento para "abrir" el formulario para editar los datos
    buttonEdit.addEventListener('click', () => {
        formEditProfile.classList.toggle('active');
    });

    // buttonSaveData.addEventListener('click', () => {
    //     formEditProfile.classList.toggle('active');
    // });
}

// functión para agregar algunas correctiones en los inputs de edad y contacto
function inputAgeAndContactCorrect() {
    var inputAge = document.getElementById('inputEdad');

    // evento para escuchar que se escribe en el input de edad
    inputAge.addEventListener('keyup', (e) => {
        let valorInputAge = e.target.value

        inputAge.value = valorInputAge
            // utilizamos expreciones regulares para que el input de tarjeta de crédito se vea mas bonito
            //eliminamos espacios en blanco
            .replace(/\s/g, '')
            //eliminar las letras
            .replace(/\D/g, '');
    });

    var inputContact = document.getElementById('inputContact');
    // evento para escuchar que se escribe en el input de contacto
    inputContact.addEventListener('keyup', (e) => {
        let valorInputContact = e.target.value

        inputContact.value = valorInputContact
            // utilizamos expreciones regulares para que el input de tarjeta de crédito se vea mas bonito
            //eliminar las letras
            .replace(/\D/g, '');
    });
}

function dontSaveInvalidAge() {
    var inputAge = document.getElementById('inputEdad').value;

    if (inputAge > 110) {
        alert("Edad no válida");
    } else if (inputAge == "") {
        alert("Debe ingresar una edad")
    }
}

// función para guardar datos
function saveData() {
    let nameUser = document.getElementById('inputNombre');
    let surnameUser = document.getElementById('inputApellidos');
    let ageUser = document.getElementById('inputEdad');
    let contactUser = document.getElementById('inputContact');
    let emailUser = document.getElementById('inputEmail');

    // aqui se almacenan los datos que el usuario agrego al input
    let userData = {
        names: nameUser.value,
        surnames: surnameUser.value,
        age: ageUser.value,
        contact: contactUser.value,
        email: emailUser.value,
    }

    localStorage.setItem("datosUsuario", JSON.stringify(userData)); //convertimos a un JSON los datos
    let saveLocal = JSON.parse(localStorage.getItem("datosUsuario")); // obtenemos datos de localStoraje y lo convertimos en texto con JSON.parse

    if (nameUser.value == "" || surnameUser.value == "" || ageUser.value == "" || contactUser.value == "" || emailUser.value == "") {
        alert("Debe completar todos los campos para poder guardar la información")
    } else if (ageUser.value > 110 || ageUser.value < 18) {
        alert("Edad no válida");
    } else {
        document.getElementById("spanName").innerHTML = saveLocal.names //agregamos al HTML los nombres del usuario que obtuvimos del localStorage
        document.getElementById("spanSurnames").innerHTML = saveLocal.surnames //agregamos al HTML los apellidos del usuario que obtuvimos del localStorage
        document.getElementById("spanAge").innerHTML = saveLocal.age //agregamos al HTML la edad del usuario que obtuvimos del localStorage
        document.getElementById("spanContact").innerHTML = saveLocal.contact //agregamos al HTML el contacto del usuario que obtuvimos del localStorage
        document.getElementById("spanEmail").innerHTML = saveLocal.email //agregamos al HTML el email del usuario que obtuvimos del localStorage

        var buttonSaveData = document.getElementById('btnSaveData'); //obtenemos el botón que guarda los datos del formulario
        var formEditProfile = document.getElementById('formUserDate'); // obtenemos el formulario donde estaran los campos para completar los datos
        // cerramos el formulario con click luego de guardar los datos
        buttonSaveData.addEventListener('click', () => {
            formEditProfile.classList.toggle('active');
        });
        // cerramos el formulario al presionar la tecla enter luego de guardar los datos
        buttonSaveData.addEventListener('keyup', () => {
            formEditProfile.classList.toggle('active');
        });
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    openFormEditProfile() // se llama función para abrir el formulario para editar datos
    inputAgeAndContactCorrect() // se llama función que aplica condiciones a los inputs de edad y contacto

    let saveLocal = JSON.parse(localStorage.getItem("datosUsuario")); // obtenemos datos de localStoraje y lo convertimos en texto con JSON.parse

    document.getElementById("spanName").innerHTML = saveLocal.names //agregamos al HTML los nombres del usuario que obtuvimos del localStorage
    document.getElementById("spanSurnames").innerHTML = saveLocal.surnames //agregamos al HTML los apellidos del usuario que obtuvimos del localStorage
    document.getElementById("spanAge").innerHTML = saveLocal.age //agregamos al HTML la edad del usuario que obtuvimos del localStorage
    document.getElementById("spanContact").innerHTML = saveLocal.contact //agregamos al HTML el contacto del usuario que obtuvimos del localStorage
    document.getElementById("spanEmail").innerHTML = saveLocal.email //agregamos al HTML el email del usuario que obtuvimos del localStorage
});