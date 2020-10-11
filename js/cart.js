var cartInfo = []; // array con productos

// función para mostrar productos
function showProductsBuy() {

    let htmlContentToAppend = "";

    // recorremos el array para mostrar los productos en un listado
    for (let i = 0; i < cartInfo.length; i++) {
        let products = cartInfo[i];

        // condicional para saber si está en UYU o USD y realizar la conversión de USD a UYU
        if (products.currency != "USD") {
            var unitTotal = products.unitCost * products.count
        } else {
            var unitTotal = (products.unitCost * 40) * products.count
        }

        // agregamos al DOM el contenido con los estilos adecuados
        htmlContentToAppend += `
        <div class="buyProductContainer">
            <div class="imgNameContainer">
                <div class="imgContainer">
                    <img src="`+ products.src + `" alt="..." height="100%">
                </div>
                <div class="nameCountContainer">
                    <div class="nameContainer">
                        <h5>`+ products.name + `</h5>
                    </div>
                    <div class="productCount">
                        <p>Cantidad: </p>
                        <input class="totalCantUnit" type="number" id="productCant" style="width:60px;" value="${products.count}" min="1">
                    </div>
                </div>
            </div>
            <div class="costContainer">
                <p>Precio unitario: `+ products.currency + ` ` + `<span class="unitCost">` + products.unitCost + `</span></p>
                <p>Precio total: UYU <span class="totalCostU" id="totalCost${i}">` + unitTotal + `</span></p>
            </div>
		</div>
        `

        document.getElementById("bodyContainer").innerHTML = htmlContentToAppend;
    }

    totalCostUnit() // función para calcular el costo total de cada producto
    totalAmount() // función para calcular el costo total sumando tipo de envío
}

function totalCostUnit() {
    var arrayTotalCostU = document.getElementsByClassName("totalCostU"); // obtenemos el costo total de los productos y almacenamos en un array

    let totalCosto = 0;
    // recorremos el array y calculamos la suma de productos
    for (let i = 0; i < arrayTotalCostU.length; i++) {
        
        let subIndividual = arrayTotalCostU[i];
        totalCosto += parseFloat(subIndividual.innerText)
    }
    document.getElementById("subTotalFin").innerHTML = totalCosto // agregar al DOM costo total sin la suma del tipo de envío
    document.getElementById("totalAmount").innerHTML = totalCosto // agregar al Dom el costo total con la suma del tipo de envío
    
    let cantUnit = document.getElementsByClassName("totalCantUnit"); // obtenemos la cantidad de productos

    // recorremos el arreglo con las cantidades de producto
    for (let i = 0; i < cantUnit.length; i++) { 
        cantUnit[i].addEventListener("change", function () {
            var unitCant = cantUnit[i].value;

            // nuevamente comprobamos si es UYU o USD y convertimos USD a UYU
            if (cartInfo[i].currency != "USD") {
                var costUnit = cartInfo[i].unitCost
            } else {
                var costUnit = cartInfo[i].unitCost * 40
            }

            var totalForUnit = unitCant * costUnit; // calculamos cantidad * precio total del producto

            document.getElementById("totalCost" + i).innerHTML = totalForUnit; // agregamos el contenido al DOM
            totalAmount()
        })
    }
}

// función para calcular costo total de productos,
// tipo de envío y valor en UYU del mismo acorde a la suma del precio de los productos y
// suma total a pagar.
function totalAmount() {
    var arrayTotalCostU = document.getElementsByClassName("totalCostU"); // obtenemos el costo total de los productos y almacenamos en un array

    let totalCosto = 0;
    // recorremos el array y calculamos la suma de productos
    for (let i = 0; i < arrayTotalCostU.length; i++) {
        
        let subIndividual = arrayTotalCostU[i];
        totalCosto += parseFloat(subIndividual.innerText)
    }
    console.log(totalCosto); // costo total por productos ya con la cantidad adecuada
    
    // obtener el tipo de envío que se seleccionó y el valor del mismo acorde al subTotal
    var formulario = document.forms[0];
    for (var i = 0; i < formulario.options.length; i++) {
        if (formulario.options[i].checked) {
            break;
        }
    }
    let marcado = formulario.options[i].value; // aquí se almacena el tipo de envío seleccionado
    console.log("se marco " + marcado);
    
    // condicional para calcular el precio en UYU del tipo de envío 
    if (marcado === "premium") {
        // costo total del producto + el valor según el tipo de envío
        var sendCost = Math.round(totalCosto * 0.15)
    } else if (marcado === "express") {
        // costo total del producto + el valor según el tipo de envío
        var sendCost = Math.round(totalCosto * 0.07)
    } else if (marcado === "standard") {
        // costo total del producto + el valor según el tipo de envío
        var sendCost = Math.round(totalCosto * 0.05)
    } 

    // calcular el costo total:
    let envioCost = 0
    let costoEnvio = envioCost + sendCost // almacenamos el valor en UYU del tipo de envío
    let totalCost = costoEnvio + totalCosto // almacenamos el costo total a pagar

    document.getElementById("subTotalFin").innerHTML = totalCosto // agregar al DOM costo total sin la suma del tipo de envío
    document.getElementById("typeShipping").innerHTML = costoEnvio // agregar al DOM el costo del envío en UYU
    document.getElementById("totalAmount").innerHTML = totalCost // agregar al Dom el costo total con la suma del tipo de envío
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data.articles;

            showProductsBuy(cartInfo)
            totalAmount()
        }
    })
    totalAmount()

});