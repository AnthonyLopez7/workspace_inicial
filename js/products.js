const ORDER_ASC_BY_COST = "Asc";
const ORDER_DESC_BY_COST = "Des";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var currentCategoriesArray = [];

// mostrar nombre de usario que inicio sesión
var data = localStorage.getItem("user");
document.getElementById("name").innerHTML = data

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            return a.cost - b.cost;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            return b.cost - a.cost;
        });
    } 

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let products = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))) {
                
            htmlContentToAppend += `
            <div class="containerScreen">
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
                                <small class="text-muted">` + products.soldCount + ` artículos vendidos</small>
                                <p>`+ products.currency + ` ` + products.cost + `</p>
                            <div/>
                        </div>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("product_container").innerHTML = htmlContentToAppend;
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

document.addEventListener("DOMContentLoaded", function (e) {
    
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data;
            showProductsList(currentCategoriesArray);
        }
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
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

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });
});
