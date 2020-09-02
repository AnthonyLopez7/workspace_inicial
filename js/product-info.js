var currentProductInfoArray = [];

function showProductsInfo() {
    console.log(currentProductInfoArray);
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductInfoArray.length; i++) {
        let productsInfo = currentProductInfoArray[i];

        htmlContentToAppend += `
        <div class="containerScreen">
            <p>` + productsInfo.name + `</p>
            <h6>` + productsInfo.currency + `</h6><p>` + productsInfo.cost + `</p>
            <p>` + productsInfo.description + `</p>
            <p>` + productsInfo.soldCount + ` cantidad</p>
            // <p>Categoría: ` + productsInfo.category + `</p>
            // <div class="imageContainer">
            //     <img src="` + productsInfo.images + `" alt="Image of vehicle loading" class="image">
            // </div>
            // <p>` + productsInfo.relatedProducts + `</p>
        </div>
        `

        document.getElementById("product_info_container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfoArray = resultObj.data;
            showProductsInfo(currentProductInfoArray);
        }
        // console.log(showProductsInfo());
    });
});