const ORDER_ASC_BY_COST = "Asc";
const ORDER_DESC_BY_COST = "Des";
const ORDER_DESC_BY_RELEVANCIA = "Rel";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var currentCategoriesArray = [];
var products = [];

function sortCategories(criteria, array) {
    let result = [];
    // Ordenar de forma ascendente por el costo
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            return a.cost - b.cost;
        });
    // Ordenar de forma descendente por el costo
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            return b.cost - a.cost;
        });
    // Ordenar por relevancia (cantidad de vendidos)
    } else if (criteria === ORDER_DESC_BY_RELEVANCIA) {
        result = array.sort(function (a, b) {
            return b.soldCount - a.soldCount;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let products = currentCategoriesArray[i];

        // condicional para filtrar en un mínimo y máximo de precios
        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item-action mb-4 mt-2 col-md-4 col-sm-12">
                <div class="card mb-4">
                    <img src="` + products.imgSrc + `" alt="Image of vehicle loading" class="image">
                </div>
                <div id="myDIV">
                    <h4>`+ products.name + `</h4>
                    <p>`+ products.description + `</p>
                    <div class="d-flex justify-content-between" id="myDIV">
                        <p>`+ products.currency + ` ` + products.cost + `</p>
                        <label>` + products.soldCount + ` vendidos</label>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("product_container").innerHTML = htmlContentToAppend;
        filterProducts(products);
    }
}

function filterProducts(products) {
    // obtenemos el el valor del input search y convertimos sus caracteres en mayúscula
    inputFilter = document.getElementById("myInputSearch").value.toUpperCase();

    // ciclo para que al filtrar un vehículo aparezca en pantalla solamente el vehículo filtrado
    for (var i = 0; i < products.length; i += 1) {
        if (products[i].dataset.filterName.toUpperCase().includes(inputFilter)
            || products[i].dataset.filterDesc.toUpperCase().includes(inputFilter)) {
            products[i].parentNode.style.display = "block";
        } else {
            products[i].parentNode.style.display = "none";
        }
    }
}

function sortAndShowProducts(sortCriteria, categoriesArrays) {
    currentSortCriteria = sortCriteria;

    if (categoriesArrays != undefined) {
        currentCategoriesArray = categoriesArrays;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las productos ordenadas
    showProductsList();
    filterProducts(products)
}

document.addEventListener("DOMContentLoaded", function (e) {
    // Obtener productos al cargar la página
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data;
            showProductsList(currentCategoriesArray);
        }
        products = document.getElementById("product_container").getElementsByClassName("productContainer");
    });

    // Filtrar por rango de precios
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        // Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        // de productos por categoría.
        minCount = document.getElementById("rangeFilterPriceMin").value;
        maxCount = document.getElementById("rangeFilterPriceMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });

    // Limpiar filtro por rango de precios y mostrar nuevamente todos los productos 
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    // Ordenamos de forma ascendente por el precio
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    // Ordenamos de forma descendente por el precio
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    // Ordenamos por relevancia en función de los vehículos vendidos
    document.getElementById("sortRelevancia").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_RELEVANCIA);
    });

    // Filtramos vehículos de acuerdo a los caracteres ingresados en el input search
    document.getElementById("myInputSearch").addEventListener("keyup", function () {
        filterProducts(products);
    });
});
