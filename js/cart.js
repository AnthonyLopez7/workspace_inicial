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
        <div id=${i} class="buyProductContainer">
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
                        <input class="totalCantUnit" type="number" id="productCant" style="width:60px;" value="${products.count}" min="0">
                    </div>
                </div>
            </div>
            <div class="costContainer">
                <div class="priceContainer">
                    <p>Precio unitario: `+ products.currency + ` ` + `<span class="unitCost">` + products.unitCost + `</span></p>
                    <p>Precio total: UYU <span class="totalCostU" id="totalCost${i}">` + unitTotal + `</span></p>
                </div>
                <div class="productDeleteContainer">
                    <i onclick="deleteProduct(${i})" class="iconDelete material-icons" style="font-size:25px">close</i>
                </div>
            </div>
		</div>
        `

        document.getElementById("bodyContainer").innerHTML = htmlContentToAppend;
    }

    totalCostUnit() // función para calcular el costo total de cada producto
    totalAmount() // función para calcular el costo total sumando tipo de envío
}

// función para eliminar productos 
function deleteProduct(position) {
    let dad = document.getElementById("bodyContainer") // obtenemos el contenedor padre(encapsula ambos productos) - se encuentra en el archivo cart.html
    let child = document.getElementById(position) // obtenemos los productos por su id

    dad.removeChild(child); // removemos el producto del contenedor padre

    totalAmount(); // función para calcular el costo total sumando tipo de envío
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
            // let cantUnit = document.getElementsByClassName("totalCantUnit"); // obtenemos la cantidad de productos
            var unitCant = this.value;

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

    // obtener el tipo de envío que se seleccionó y el valor del mismo acorde al subTotal
    var formulario = document.forms[0];
    for (var i = 0; i < formulario.options.length; i++) {
        if (formulario.options[i].checked) {
            break;
        }
    }
    let marcado = formulario.options[i].value; // aquí se almacena el tipo de envío seleccionado

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

//input tarjeta de credito
function inputCardNumber() {
    var cardNumber = document.getElementById('cardNumber');
    var cardLogoContainer = document.getElementById('cardLogoContainer');

    cardNumber.addEventListener('keyup', (e) => {
        let valorInputCard = e.target.value

        cardNumber.value = valorInputCard
            // utilizamos expreciones regulares para que el input de tarjeta de crédito se vea mas bonito
            //eliminamos espacios en blanco
            .replace(/\s/g, '')
            //eliminar las letras
            .replace(/\D/g, '')
            //espaciado cada 4 números
            .replace(/([0-9]{4})/g, '$1 ')
            //elimina el ultimo espaciado
            .trim();

        // si eliminamos los numeros de la tarjeta de crédito se elimina la imagen del logo de la tarjeta
        if (valorInputCard == '') {
            cardLogoContainer.innerHTML = '';
        }

        // condicional para detectar si es tarjeta visa o mastercard y que acción tomar
        if (valorInputCard[0] == 4) {
            cardLogoContainer.innerHTML = '';
            const image = document.createElement('img');
            image.src = './img/visa.png';
            cardLogoContainer.appendChild(image);
        } else if (valorInputCard[0] == 5) {
            cardLogoContainer.innerHTML = '';
            const image = document.createElement('img');
            image.src = './img/mastercard.png';
            cardLogoContainer.appendChild(image);
        }
    })
}

// select año de expiración generando dinamicamente
function expirationCard() {
    var selectYear = document.getElementById('selectYear'); //obtenemos el select donde irá el año

    const yearActual = new Date().getFullYear(); // obtenemos loa ños

    // ciclo para que nos liste a partir del año actual(incluyéndolo) 8 años más
    for (let i = yearActual; i <= yearActual + 8; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        selectYear.appendChild(option);
    }
}

//función para mostrar forma de pago seleccionada
function showPayType() {
    var inputCard = document.getElementById("inputCard") //obtenemos el input de tarjeta de credito
    var inputBank = document.getElementById("inputBank") //obtenemos el input de transferencia bancaria

    // condicional para identificar que forma de pago se seleccionó
    if (inputCard.checked) {
        document.getElementById('showTypePay').innerHTML = inputCard.value // mostrar forma de pago en el DOM
    } else if (inputBank.checked) {
        document.getElementById('showTypePay').innerHTML = inputBank.value // mostrar forma de pago en el DOM
    }
}

// función para finalizar la compra con éxito
function finalizePurchase() {
    // datos sobre producto
    let cantProduct = document.getElementsByClassName("totalCantUnit") // obtenemos la cantidad de productos
    // datos sobre dirección
    let street = document.getElementById("street").value //obtenemos el input donde ingresamos la calle
    let houseNumber = document.getElementById("houseNumber").value //obtenemos el input donde ingresamos el n° de la casa
    let country = document.getElementById("country").value //obtenemos el input donde seleccionamos el país en donde recide
    let corners = document.getElementById("corners").value //obtenemos el input donde seleccionamos el país en donde recide
    // datos sobre forma de pago
    var cardInput = document.getElementById("inputCard") //obtenemos el input de tarjeta de credito
    var bankInput = document.getElementById("inputBank") //obtenemos el input de transferencia bancaria
    var showTypePay = document.getElementById("showTypePay").textContent //obtenemos la forma de pago seleccionada
    let cardNumber = document.getElementById("cardNumber").value //obtenemos el número de la tarjeta de crédito
    let cardCodeSecurity = document.getElementById("cardCvv").value //obtenemos el código de seguridad de la tarjeta de crédito
    let bankNumberAccount = document.getElementById("bankNumberAccount").value //obtenemos el numero de cuenta de banco

    // recorremos el array y obtenemos el valor de esos campos
    for (let i = 0; i < cantProduct.length; i++) {
        var unitCant = cantProduct[i].value;
    }
    // aplicamos una condicional para determinar que acción tomar
    if (unitCant == 0) {
        alert("Debe seleccionar la cantidad de productos")
    }
    else if (street == "" || houseNumber == "" || country == "" || corners == "") {
        alert("Debe proporcionar los datos relacionados a dirección")
    }
    else if (showTypePay == "") {
        alert("Debe seleccionar una forma de pago")
    }
    else if (cardInput.checked && (cardNumber == "" || cardCodeSecurity == "")) {
        alert("Debe ingresar todos los datos correspondientes a tarjeta de crédito")
    }
    else if (bankInput.checked && bankNumberAccount == "") {
        alert("Debe ingresar número de cuenta para realizar la transferencia bancaria")
    }
    else {
        openModal() // si ya se estan todos los cmapos correctamentes ingresados finalizamos la compra
    }
}

// función con la cual abrimos el modal de éxito (si la compra se realiza correctamente)
function openModal() {
    document.getElementById("backdrop").style.display = "block"
    document.getElementById("exampleModal").style.display = "block"
    document.getElementById("exampleModal").className += "show"
}

// función con la cual cerramos el modal de éxito (si la compra se realiza correctamente)
function closeModal() {
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("exampleModal").style.display = "none"
    document.getElementById("exampleModal").className += document.getElementById("exampleModal").className.replace("show", "")
}

// Obtenemos el modal
var modal = document.getElementById('exampleModal');

// Función para cuando el modal ya esta abierto!
//Si se da click fuera del modal, se cierra.
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal()
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data.articles;

            showProductsBuy(cartInfo)
        }
    })
    totalAmount() //llamamos la función que muestra la suma de productos
    showPayType() //llamamos la función que muestra el tipo de pago seleccionado
    inputCardNumber() //llamamos la función que detecta eventos en el input de tarjeta de credito
    expirationCard() //llamamos la función que genera los años dinamicamente
});