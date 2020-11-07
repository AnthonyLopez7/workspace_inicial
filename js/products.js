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
            <a href="product-info.html" class="list-group-item-action mb-4 mt-2 col-md-4 col-sm-12 itemsContainer">
                <div class="card mb-4">
                    <img src="` + products.imgSrc + `" alt="Image of vehicle loading" class="image">
                </div>
                <div id="myDIV">
                    <h4 class="filterName">`+ products.name + `</h4>
                    <p class="filterDescription">`+ products.description + `</p>
                    <div class="d-flex justify-content-between" id="myDIV">
                        <span>`+ products.currency + ` ` + products.cost + `</span>
                        <label>` + products.soldCount + ` vendidos</label>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("product_container").innerHTML = htmlContentToAppend;
    }
}

function filterProducts() {
    let inputFilter = document.getElementById("myInputSearch"); // obtenemos el el valor del input search
    let filter = inputFilter.value.toUpperCase()                // y convertimos sus caracteres en mayúscula

    let productList = document.getElementById("product_container"); //obtenemos el contenedor principal de los items(ubicado en HTML)
    let nameFilter = productList.getElementsByTagName("a"); //obtenemos los items
    
    // ciclo for para recorreer los items buscando si los nombres de los items
    // son iguales a los ingresados en el input
    // y devolver un resultado con los mismos
    for (i = 0; i < nameFilter.length; i++) {
        let name = nameFilter[i].getElementsByClassName("filterName")[0];
        let textValue = name.textContent || name.innerHTML;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            nameFilter[i].style.display = "";
        } else {
            nameFilter[i].style.display = "none";
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
}

// funccion con condicional para desplegar burger menu
function openResponsiveFilter() {
    var x = document.getElementById("filterResponsive");
    if (x.className === "containerResponsive") {
        x.className += "responsive";
    } else {
        x.className = "containerResponsive";
    }
}
function openResponsiveMenu() {
    var x = document.getElementById("navbarResponsive");
    if (x.className === "navbarContainer") {
        x.className += " responsiveNavbar";
    } else {
        x.className = "navbarContainer";
    }
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
    
});
