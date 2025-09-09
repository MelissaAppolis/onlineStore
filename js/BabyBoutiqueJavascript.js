//Jquery to slide down and up for dropdown menu in navigation bar.
$(document).ready(function() {
    $(".mainNavigation li").hover(function() {
        $(".dropdown-menu", this).slideDown();
    }, function() {
        $(".dropdown-menu", this).stop().slideUp();
    });

    $("input[name='optradio']").click(function() {
        if ($("#delivery").is(":checked")) {
            $(".reveal-if-active").show();
        } else if ($("#collection").is(":checked")) {
            $(".reveal-if-active").hide();
        }
    });
});

/*Created an products variable with an array of products item objects defined in shop.html
to track how many times a specific product has been added to the cart.*/
let products = [{
        name: "Long Sleeve Button Vests",
        tag: "longsleevebuttonvests",
        price: 120.00,
        inCart: 0
    },
    {
        name: "Grey Top, Pants & Beanie Set",
        tag: "greytop,pants&beanieset",
        price: 250.00,
        inCart: 0
    },
    {
        name: "Long Sleeve Growers",
        tag: "longsleevegrowers",
        price: 190.00,
        inCart: 0
    },
    {
        name: "Girls Short Sleeve Vests",
        tag: "girlsshortsleevevests",
        price: 100.00,
        inCart: 0
    },
    {
        name: "Long Sleeve Bear Growers",
        tag: "longsleevebeargrowers",
        price: 150.00,
        inCart: 0
    },
    {
        name: "Boys Crew Neck & Pants Set",
        tag: "boyscrewneck&pantsset",
        price: 210.00,
        inCart: 0
    },
    {
        name: "Girls Floral Pants",
        tag: "girlsfloralpants",
        price: 150.00,
        inCart: 0
    },
    {
        name: "Knitted Jerseys",
        tag: "knittedjerseys",
        price: 200.00,
        inCart: 0
    }
];
//Target the class quickAddToCart in shop.html
let carts = document.querySelectorAll(".quickAddToCart");
// Adding a button to quickAddToCart.
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
        // Call function cartNumbers and totalCost that was created below.
        // Passing the products object into cartNumbers and totalCost to get the product properties.
        cartNumbers(products[i]);
        totalCost(products[i]);
        totalVatCost(products[i]);
        finalTotal(products[i]);
        alertTotalCost(products[i]);
    });
}

/* Adding a function to check if there are products that has been added to the cart 
when browser is loaded using localStorage as well as save the number of product in the cart that has been 
added after page has been loaded. The notification badge in nav bar will change according to the amount of products in cart. */
/* The number of products in cart will change if minus and plus button is clicked. */
function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem("cartNumbers"); // Checking to see if there are products in my cart when page is loaded.
    // Converting productNumbers from string to an integer.
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    // If delete action is clicked cartNumbers on localStorage will increase by 1 as well as notificationBadge in nav bar.
    if (action == "fa-minus-circle") {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector(".cart-container .notificationBadge").textContent = productNumbers - 1;
    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".cart-container .notificationBadge").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".cart-container .notificationBadge").textContent = 1;
    }
    setItems(product);
}

/* function to check if there are products when browser is loaded or refreshed in my cart 
and add to the notification badge situated in the navigation bar. */
function onloadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if (productNumbers) {
        document.querySelector(".cart-container .notificationBadge").textContent = productNumbers;
    }
}

// Created a function to add each product object to localStorage.
function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems); // Passing cartItems from JSON to a Javascript object.
    // If there are products in cart already if statement will run.
    if (cartItems != null) {
        // The below if statements allows more than one product object to be added to productsInCart.
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1; // This will increase the value of inCart when a product is added.
    } else {
        product.inCart = 1; // Set product.inCart value as 1. else statement will run if is the first time a user adds the product.
        cartItems = {
            [product.tag]: product
        }
    }
    // Passing the cartItems as a JSON string.
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Created a function to calculate and display total cost, vat cost of each product object as well as total balance.
/* Coupon code and delivery code will be displayed as 0 if there are products in cart. 
There values will only change once their functions has run. */
function totalCost(product, action) {
    let cartCost = localStorage.getItem("totalCost");
    let vatCost = localStorage.getItem("totalVatCost");
    let totalBalance = localStorage.getItem("totalBalance");
    let couponCode = localStorage.getItem("couponCode");
    let deliveryTot = localStorage.getItem("deliveryTot");
    deliveryTot = parseInt(deliveryTot);
    vatNumber = 14;

    if (action == "fa-minus-circle") { // If minus button has been clicked totalCost in localStorage will be minus from the product price.
        cartCost = parseInt(cartCost);
        vatCost = parseInt(vatCost);
        totalBalance = parseInt(totalBalance);
        couponCode = parseInt(couponCode);
        deliveryTot = parseInt(deliveryTot);
        localStorage.setItem("totalCost", cartCost - product.price);
        localStorage.setItem("totalVatCost", (vatNumber / 100) * cartCost);
        localStorage.setItem("totalBalance", vatCost - cartCost);
        localStorage.setItem("couponCode", 0);
        localStorage.setItem("deliveryTot", 0);
    } else if (cartCost != null) { // If cartCost is not null i.e if there is a number that exists the following code will run.
        cartCost = parseInt(cartCost);
        vatCost = parseInt(vatCost);
        totalBalance = parseInt(totalBalance);
        couponCode = parseInt(couponCode);
        deliveryTot = parseInt(deliveryTot);
        localStorage.setItem("totalCost", cartCost + product.price);
        localStorage.setItem("totalVatCost", (vatNumber / 100) * cartCost);
        localStorage.setItem("totalBalance", vatCost + cartCost);
        localStorage.setItem("couponCode", 0);
        localStorage.setItem("deliveryTot", 0);
    } else {
        cartCost = parseInt(cartCost);
        vatCost = parseInt(vatCost);
        totalBalance = parseInt(totalBalance);
        couponCode = parseInt(couponCode);
        deliveryTot = parseInt(deliveryTot);
        localStorage.setItem("totalCost", product.price);
        localStorage.setItem("totalVatCost", (vatNumber / 100) * cartCost);
        localStorage.setItem("totalBalance", vatCost + cartCost);
        localStorage.setItem("couponCode", 0);
        localStorage.setItem("deliveryTot", 0);
    }
}

// Calculate total vat cost of each product item.
function totalVatCost(product) {
    let vatCost = localStorage.getItem("totalVatCost");
    let cartCost = localStorage.getItem("totalCost");
    let vatNumber = 14;

    if (cartCost) {
        vatCost = parseInt(vatCost);
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalVatCost", ((vatNumber / 100) * cartCost).toFixed(2));

    }
}

// Calculate total balance.
function finalTotal(product) {
    let totalBalance = localStorage.getItem("totalBalance");
    let vatCost = localStorage.getItem("totalVatCost");
    let cartCost = localStorage.getItem("totalCost");
    vatNumber = 14;

    if (cartCost) {
        vatCost = parseInt(vatCost);
        cartCost = parseInt(cartCost);
        totalBalance = parseInt(totalBalance);
        localStorage.setItem("totalBalance", ((vatNumber / 100) * cartCost + cartCost).toFixed(2));
    }
}

//function to pop up an alert to notify user their total balance in cart when user clicks add to cart in shop.html.
function alertTotalCost(product) {
    let totalCostAlert = localStorage.getItem("totalBalance");

    if (totalCostAlert) {
        totalCostAlert = parseInt(totalCostAlert);
        swal({
            title: "Added to your cart",
            icon: "success",
            text: "Your total balance is R" + totalCostAlert
        });
    }
}

// Calculate coupon code.
function coupon() {
    let couponCode = localStorage.getItem("couponCode");
    let totalBalance = localStorage.getItem("totalBalance");
    let a = document.getElementById("couponC").value;
    let couponDiscountValue = 20;

    if (a == "DiscountOFF") {
        couponCode = parseInt(couponCode);
        totalBalance = parseInt(totalBalance);
        localStorage.setItem("couponCode", ((couponDiscountValue / 100) * totalBalance).toFixed(2));
    } else {
        localStorage.setItem("couponCode", 0);
        alert("Coupon code does not exist, please enter a valid coupon.");
    }
}

// Calculate delivery cost.
function deliveryTotal() {
    let deliveryTot = localStorage.getItem("deliveryTot");
    let deliveryMethods = document.getElementsByName("optradio");

    for (let i = 0; i < deliveryMethods.length; i++) {
        if (deliveryMethods[i].checked) {
            deliveryTot = parseInt(deliveryTot);
            localStorage.setItem("deliveryTot", deliveryMethods[i].value);
        }
    }
}

// Update total balance if coupon code and delivery charge has been applied.
function updateTotal() {
    let totalBalance = localStorage.getItem("totalBalance");
    let couponCode = localStorage.getItem("couponCode");
    let deliveryTot = localStorage.getItem("deliveryTot");

    if (couponCode && deliveryTot > 1) {
        totalBalance = parseInt(totalBalance);
        couponCode = parseInt(couponCode);
        deliveryTot = parseInt(deliveryTot);
        localStorage.setItem("totalBalance", ((totalBalance + deliveryTot) - couponCode).toFixed(2));
    }
    displayCart();
}

// Function to delete a product and update total cost.
function deleteButtons() {
    let deleteButtons = document.querySelectorAll(".product i"); // <i> in class=product above will act as the delete button
    let productName;
    let prouctNumbers = localStorage.getItem("cartNumbers");
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem("totalCost");
    let totalBalance = localStorage.getItem("totalBalance");
    let vatCost = localStorage.getItem("totalVatCost");
    let vatNumber = 0.14;
    let vatNumber2 = 1.14;
    let couponCode = localStorage.getItem("couponCode");

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", () => {
            // ProductName will be the exact name as the product tag.
            // Parent element will get the product class as i is within product.
            // Trim will delete spaces before and after text.
            // toLowerCase will change the text to all lowercase.
            // Replace will take away all spaces within the text, using regex.
            productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');

            localStorage.setItem("cartNumbers", prouctNumbers - cartItems[productName].inCart);

            localStorage.setItem("totalCost", cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            localStorage.setItem("totalVatCost", vatCost - ((cartItems[productName].price * cartItems[productName].inCart) * vatNumber).toFixed(2));

            localStorage.setItem("totalBalance", totalBalance - (cartItems[productName].price * cartItems[productName].inCart * vatNumber2).toFixed(2));

            localStorage.setItem("couponCode", 0)

            delete cartItems[productName];
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            // Refresh/update functions once the delete button as been activated or clicked on.
            displayCart();
            onloadCartNumbers();
        });
    }
}

// The below function will enable users to change the quantity of a product in the ShoppingCart.html.
function manageQuantity() {
    let decreaseButtons = document.querySelectorAll(".fa-minus-circle");
    let increaseButtons = document.querySelectorAll(".fa-plus-circle");
    cartItems = localStorage.getItem("productsInCart");
    let currentQuantity = 0;
    let currentProduct = "";
    cartItems = JSON.parse(cartItems);


    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener("click", () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector("span").textContent;
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector("span").textContent.toLowerCase().replace(/ /g, '').trim();

            if (cartItems[currentProduct].inCart > 1) { // Users will only be able to decrese an product quantity if the quantity is equal to or more than one, they cannot decrease to 0.
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "fa-minus-circle");
                totalCost(cartItems[currentProduct], "fa-minus-circle");
                totalVatCost(cartItems[currentProduct], "fa-minus-circle");
                finalTotal(cartItems[currentProduct], "fa-minus-circle");
                localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                displayCart();
            }
        });
    }

    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener("click", () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector("span").textContent;
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector("span").textContent.toLowerCase().replace(/ /g, '').trim();

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            totalVatCost(cartItems[currentProduct]);
            finalTotal(cartItems[currentProduct], "fa-minus-circle");
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            displayCart();
        });
    }
}

// Generate an Order Number when ser clicks on confirm order button.
function generateOrderNum() {
    let orderNum = Math.random().toString(36).slice(5);
    swal({
        title: "Yaay! Your order has been placed",
        icon: "success",
        text: "Order Number: " + orderNum
    });
}

// Display products in cart as well as all the costs.
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
    let vatCost = localStorage.getItem("totalVatCost");
    let totalBalance = localStorage.getItem("totalBalance");
    let couponCode = localStorage.getItem("couponCode");
    let deliveryTot = localStorage.getItem("deliveryTot");

    /* This function will only run if cartItems and productContainer exits on the page. */
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        // Used Object.values to check the values of the cartItems.
        Object.values(cartItems).map(item => {
            // The += will add each item on the HTML page that has been added to the cart and not overide each item.
            // Back ticks used to add variables inside with strings.
            productContainer.innerHTML += ` 
			<div class="product">
				<i class="fa fa-close"></i>
				<img src="/Images/Shop Images/${item.tag}.jpg">
				<span>${item.name}</span>
			</div>
			<div class="price">R${item.price}.00</div>
			<div class="quantity">
				<i class="fa fa-minus-circle"></i>
				<span>${item.inCart}</span>
				<i class="fa fa-plus-circle"></i>
			</div>
			<div class="total">
				R${item.inCart * item.price}.00
			</div>
			`;
        });

        productContainer.innerHTML += `
			<form class="discountForm">
				<div class="form-group"> <label>Do you have a coupon code?</label>
					<div class="input-group"> 
						<input type="text" id="couponC" class="form-control coupon" name="Couponcode" placeholder="Coupon code"> 
							<span class="input-group-append"> 
								<button class="btn btn-primary btn-apply coupon" onclick="coupon()">Apply</button> 
							</span> 
					</div>
				</div>
			</form>
			<div class="container">
  				<h2 id="deliveryName">Delivery method</h2>
  				<form>
  					<div class="form-group"
    					<div class="form-check-label">
      						<label class="form-check-label devTitle" for="collection">
        						<input type="radio" class="form-check-input" id="collection" name="optradio" value="0">Collection
        					</label>
    					</div>
    					<div class="form-check-label">
      						<label class="form-check-label devTitle" for="delivery">
        						<input type="radio" class="form-check-input" id="delivery" name="optradio" value="0">Delivery
        					</label>
        					<div class="deliveryMethods">
    							<div class="form-check-label reveal-if-active">
    								<label class="form-check-label" for="deliveryOption1">
    									<input type="radio" class="form-check-input" id="deliveryOption1" name="optradio" value="0">FREE delivery (5-7 working days)
    								</label>
    							</div>
    							<div class="form-check-label reveal-if-active">
    								<label class="form-check-label" for="deliveryOption2">
    									<input type="radio" class="form-check-input" id="deliveryOption2" name="optradio" value="20">R20 - Standard delivery (3-5 working days)
    								</label>
    							</div>
    							<div class="form-check-label reveal-if-active">
    								<label class="form-check-label" for="deliveryOption3">
    									<input type="radio" class="form-check-input" id="deliveryOption3" name="optradio" value="35">R35 - 2-day delivery (2 working days)
    								</label>
    							</div>
    							<div class="form-check-label reveal-if-active">
    								<label class="form-check-label" for="deliveryOption4">
    									<input type="radio" class="form-check-input" id="deliveryOption4" name="optradio" value="50">R50 - Same-day delivery
    								</label>
    							</div>
    						</div>
    						<span class="input-group-append"> 
    							<button class="btn btn-submitDelivery" onclick="deliveryTotal()">Submit</button>
    						</span>
    					</div>
    				</div>
    			</form>
			</div>
			<table class="totalContainer">
				<thead>
					<tr>
						<th scope="col" colspan="2" class="orderSummaryTitle">ORDER SUMMARY</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="basketSubtotalTitle">SUBTOTAL (ex. VAT)</td>
						<td class="basketSubtotalTotal">R${cartCost}.00</td>
					</tr>
					<tr>
						<td class="totalVATTitle">TOTAL VAT (14%)</td>
						<td class="totalVAT">R${vatCost}</td>
					</tr>
					<tr>
						<td class="discountTitle">DISCOUNT</td>
						<td class="discountTotal">- R${couponCode}</td>
					</tr>
					<tr>
						<td class="deliveryTitle">DELIVERY</td>
						<td class="deliveryTotal">R${deliveryTot}.00</td>
					</tr>
					<tr>
						<td class="basketTotalTitle"><strong>TOTAL</strong></td>
						<td class="basketTotal"><strong>R${totalBalance}</strong></td>
					</tr>
					<tr>
						<td><button id="updatePrice" class="btn" onclick="updateTotal()">Update Total</button></td>
					</tr>
				</tbody>
			</table>
				<button id="confirmOrder" class="btn" onclick="generateOrderNum()">Confirm Order</button>
			`;
    }
    deleteButtons();
    manageQuantity();
}
//Called the function when page loads.
onloadCartNumbers();
displayCart();