var faker = require("faker");

function listProducts() {
    console.log("===============");
    console.log("WELCOME TO MY SHOP!");
    console.log("===============");
    for (var i = 0; i < 3; i++) {
        var productName = faker.commerce.productName(); // Rowan Nikolaus
        var price = "$" +faker.commerce.price(); // Rowan Nikolaus
        console.log(productName + " - " + price);
    }

}

listProducts();