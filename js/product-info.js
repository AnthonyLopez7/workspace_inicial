var vehicle = {};
var carRatinComments = {};
var maxRating = 5;

function showImagesGallery(array) {

    let htmlContentToAppend = "";

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

function showRating(array) {
    let html = "";

    for (let i = 0; i < array.length; i++) {
        let carRating = array[i]

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

function addComents() {
    var commentary = document.getElementById("commentary").value;
    let valoration = document.getElementById("valoration").value;
    var userName = localStorage.getItem("user");
    var actualDate = new Date();
    var dia = actualDate.getDate();
    var mes = actualDate.getMonth();
    var anio = actualDate.getFullYear();

    var hora = actualDate.getHours()
    var min = actualDate.getMinutes()
    var seg = actualDate.getSeconds()

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

            let carNameHTML = document.getElementById("carName");
            let carDescriptionHTML = document.getElementById("carDescription");
            let carSoldCountHTML = document.getElementById("carSoldCount");
            let carCategoryHTML = document.getElementById("carCategory");
            let carCostHTML = document.getElementById("carCost");

            // completar la funcion mostrando la informacion en el html de videogames-info
            carNameHTML.innerHTML = vehicle.name;
            carDescriptionHTML.innerHTML = vehicle.description;
            carSoldCountHTML.innerHTML = vehicle.soldCount;
            carCategoryHTML.innerHTML = vehicle.category;
            carCostHTML.innerHTML = vehicle.cost;
            // showRating();
            //Muestro las imagenes en forma de galería
            showImagesGallery(vehicle.images);
            // showRelatedGames(vehicle.relatedVideogames);
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carRatinComments = resultObj.data;

            showRating(carRatinComments)
        }
    })
});
