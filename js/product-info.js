var vehicle = {};
var carRatinComments = {};
var maxRating = 5;

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    // ciclo para cargar todas las imágenes del vehículo
    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("carImagesWrapper").innerHTML = htmlContentToAppend;
    }
}

// Función para mostrar en lista nombre, comentario, valoración del producto y fecha en la que se hizo el comentario
function showRating(array) {
    let html = "";

    // Ciclo para cargar los comentarios en lista
    for (let i = 0; i < array.length; i++) {
        let carRating = array[i]

        // Ciclo y condicional para pintar la cantidad de estrellas correctas acorde a cada comentario
        let stars = "";
        for (let i = 1; i <= maxRating; i++) {
            if (i <= carRating.score) {
                stars += '<i class="fa fa-star checked"></i>';
            } else {
                stars += '<i class="fa fa-star"></i>';
            }
        }

        html += `
            <div class="containerComments">
                <div class="ratingDescription">
                    <h3>`+ carRating.user + `</h3>
                    <span>  ${stars}</span>
                </div>
                <p>`+ carRating.description + `</p>
                <div class="dateTime">
                    <p class="p-0">`+ carRating.dateTime + `</p>
                </div>
            </div>
        `
        document.getElementById("rating").innerHTML = html;
    }
}

// Función para añadir un nuevo comentario
function addComents() {
    var commentary = document.getElementById("commentary").value; // Obtenemos el comentario ingresado en el textarea
    let valoration = document.getElementById("valoration").value; // Obtenemos la valoración del producto
    var userName = localStorage.getItem("user"); // Tomamos el nombre del usuario logeado desde el localStorage
    // Tomamos fecha y hora actual
    var actualDate = new Date();
    // Tomamos dia, mes y año actual
    var dia = actualDate.getDate();
    var mes = actualDate.getMonth();
    var anio = actualDate.getFullYear();
    // Tomamos hora, minutos y segundos actuales
    var hora = actualDate.getHours()
    var min = actualDate.getMinutes()
    var seg = actualDate.getSeconds()

    // Condicional para mostrar crear nuevo comentario o enviar alerta para completar los campos.
    if (commentary == "" || valoration == "") {
        alert("Para añadir un comentario debe completar ambos campos (valoración y escribir dicho comentario).");
    }
    else {
        let html = "";

        let stars = "";
        for (let i = 1; i <= maxRating; i++) {
            if (i <= valoration) {
                stars += '<i class="fa fa-star checked"></i>';
            } else {
                stars += '<i class="fa fa-star"></i>';
            }
        }

        html += `
            <div class="containerComments">
                <div class="ratingDescription">
                    <h3>`+ userName + `</h3>
                    <span>  ${stars}</span>
                </div>
                <p>`+ commentary + `</p>
                <div class="dateTime">
                    <p class="p-0">`+ anio+"-"+(mes + 1)+"-"+dia+" "+hora+":"+min+":"+seg + `</p>
                </div>
            </div>
            `

        document.getElementById("newComments").innerHTML = html;
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            vehicle = resultObj.data;

            // Obtenemos el ID del campo donde será ingresada la información, 
            let carNameHTML = document.getElementById("carName");
            let carDescriptionHTML = document.getElementById("carDescription");
            let carSoldCountHTML = document.getElementById("carSoldCount");
            let carCategoryHTML = document.getElementById("carCategory");
            let carCostHTML = document.getElementById("carCost");

            // completar la funcion mostrando la informacion en el html de videogames-info
            carNameHTML.innerHTML = vehicle.name; // Cargamos el nombre del vehículo
            carDescriptionHTML.innerHTML = vehicle.description; // Cargamos la descripción del vehiculo
            carSoldCountHTML.innerHTML = vehicle.soldCount; // Cargamos la cantidad de vehiculos vendidos
            carCategoryHTML.innerHTML = vehicle.category; // Cargamos la categoría a la que pertenece el vehiculo
            carCostHTML.innerHTML = vehicle.cost; // Cargamos el valor del vehículo.
            
            //Muestro las imagenes en forma de galería
            showImagesGallery(vehicle.images);
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carRatinComments = resultObj.data;

            // Cargamos en lista los comentarios, valoración, nombre del usuario, fecha y hora actual
            showRating(carRatinComments)
        }
    })
});
