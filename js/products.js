//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var categoriesArray = [];

function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];

        htmlContentToAppend += `
        <div class="hola">
            <hr>
            <div class="productContainer">
                <div class="itemsContainer">
                    <div class="imageContainer">
                        <img src="` + products.imgSrc + `" alt="Image of vehicle loading" class="image">
                    </div>
                    <div class="informationContainer">
                        <div class="nameDescription">
                            <h4 class="mb-1">`+ products.name + `</h4>
                            <p>`+ products.description + `</p>
                        </div>
                        <div class="coinPrice">
                            <small class="text-muted">` + products.soldCount + ` artículos</small>
                            <p>`+ products.currency + ` ` + products.cost + `</p>
                        <div/>
                    </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("product_container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro los productos ordenadas
            showProductsList(categoriesArray);
        }
    });
});
