let carts = document.querySelectorAll('.add-cart');

let products = [{
        name: 'Borderlands 3',
        image: 'https://gamespot1.cbsistatic.com/uploads/scale_tiny/1593/15930215/3549304-screen%20shot%202019-06-17%20at%2010.15.07%20am.png',
        price: 121,
        inCart: 0
    },
    {
        name: 'Call Of Duty: Black Ops3',
        image: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Black_Ops_3.jpg',
        price: 406,
        inCart: 0
    },
    {
        name: 'Doom: Eternal',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Cover_Art_of_Doom_Eternal.png/220px-Cover_Art_of_Doom_Eternal.png',
        price: 673,
        inCart: 0
    },
    {
        name: 'The Elder Scrolls V: Skyrim',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2KNRDAJoHmS2cd0Sgl_jZmWx-G2mwzdCmrWMUHea3DamtFXky&usqp=CAU',
        price: 185,
        inCart: 0
    },
    {
        name: 'CyberPunk 2077',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Cyberpunk_2077_box_art.jpg/220px-Cyberpunk_2077_box_art.jpg',
        price: 1250,
        inCart: 0
    },
    {
        name: 'Fallout VR',
        image: 'https://images.g2a.com/newlayout/323x433/1x1x0/7f641caf4d12/5a2fddbfae653a350b0b41b3',
        price: 205,
        inCart: 0
    },
    {
        name: 'Mount&Blade2 Bannerlord',
        image: 'https://instantdown.net/wp-content/uploads/2020/03/Mount-Blade-2-Bannerlord-cracked-pc.jpg',
        price: 682,
        inCart: 0
    },
    {
        name: 'Red Dead Redemption 2',
        image: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
        price: 969,
        inCart: 0
    },
    {
        name: 'AIM  mechanical keyboard',
        image: 'https://images.g2a.com/newlayout/2000x2000/1x1x0/f7b9d6c4b1a9/5bc9e955ae653a87811e3a08',
        price: 499,
        inCart: 0
    },
    {
        name: 'Logitech K310 Universal Washable Keyboard',
        image: 'https://images.g2a.com/newlayout/470x470/1x1x0/386a9ac62403/5e0b13a946177c232623dba2',
        price: 562,
        inCart: 0
    },
    {
        name: 'Razer Gigantus Gaming Mouse Pad',
        image: 'https://images.g2a.com/newlayout/470x470/1x1x0/97d34bbced2f/5e42668d46177c50001cd6d8',
        price: 1069,
        inCart: 0
    },
    {
        name: 'Sandberg Gaming Starter Kit Nordic',
        image: 'https://images.g2a.com/newlayout/470x470/1x1x0/f6be4d2e6adf/5c08fb2b5bafe35552408977',
        price: 1500,
        inCart: 0
    },
];

if (carts.length == 1) {
    let game = document.getElementById("gameName").innerHTML;
    let gameId = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].name == game) {
            gameId = i;
        }
    }
    carts[0].addEventListener('click', () => {
        cartNumbers(products[gameId]);
        totalCost(products[gameId]);
        alertCustomer(products[gameId]);

    });
} else {

    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
            totalCost(products[i]);
            alertCustomer(products[i]);

        });
    }
}

function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1);
    }

    setItem(products);
}

function setItem(products) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[products.name] == undefined) {
            products.inCart = 1;
            cartItems = {
                ...cartItems,
                [products.name]: products
            }

        } else {
            cartItems[products.name].inCart++;
        }

    } else {
        products.inCart = 1;
        cartItems = {
            [products.name]: products
        }
    }




    localStorage.setItem("productsInCart", JSON.stringify(cartItems));


}

function totalCost(products) {
    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);

    } else {

        localStorage.setItem("totalCost", products.price);
    }


}

function alertCustomer() {
    let cartCost = localStorage.getItem("totalCost");
    alert("Total:" + " " + cartCost);
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productsContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");

    if (cartItems && productsContainer) {
        productsContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productsContainer.innerHTML += `
			<div class="test">
			<div id="products">
				<img src="${item.image}" width="80" height="100">
				<span>${item.name}</span>
			</div>
			<div id="price">R${item.price},00</div>
			<div id="quantity">
			${item.inCart}
			</div>
			<div id="total">
			R${item.inCart * item.price},00
			</div>
			</div>
			`;
        });

        productsContainer.innerHTML += `

		<div class="basketTotalContainer">
			<h4 class="basketTotalTitle">
			Total :
			</h4>
			<h4 class="basketTotal" id="basketTotal">
				R${cartCost},00
			</h4>
			`;
    }
}

function show() {
    document.getElementById("showMore").innerHTML = '<h5>Please select delivery option</h5><div onclick="deliveryOption()"><label>Express 1-3 days (R350)</label><input type="radio" name="deliveryOption"><br><label>Normal 7-12 days (R100)</label><input type="radio" name="deliveryOption"></div><br><br>';
}

function hide() {
    document.getElementById("showMore").innerHTML = ' ';
}

function clearcart() {
    localStorage.clear();
}

function applyCoupon() {
    let coupon = parseFloat(localStorage.getItem("totalCost")) - 100;
    document.getElementById("basketTotal").innerHTML = "R" + coupon + ",00";
    localStorage.setItem("totalCost", coupon);
}

function confirmOrder() {
    let d = new Date();
    let refferal = Math.floor(Math.random() * 100000) + 1;
    let cartCost = localStorage.getItem("totalCost");
    alert("Your order has been placed" + " " + "a total of" + " " + "R" + cartCost + " " + "has been charged to your card");
    alert("Your refferal code is :" + " " + refferal + d.getFullYear() + d.getMonth() + d.getDate());
}

function deliveryOption() {
    let option = document.getElementsByName("deliveryOption");

    if (option[0].checked) {

        let expressCost = parseFloat(localStorage.getItem("totalCost")) + 350;
        document.getElementById("basketTotal").innerHTML = "R" + expressCost + ",00";
        localStorage.setItem("totalCost", expressCost);
    } else {


        let normalCost = parseFloat(localStorage.getItem("totalCost")) + 100;
        document.getElementById("basketTotal").innerHTML = "R" + normalCost + ",00";
        localStorage.setItem("totalCost", normalCost);
    }
}