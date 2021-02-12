const Provider = require("./Provider");

class Product {

    constructor(description , price, quantity_stock, provider_id){

        this.description = description;
        this.price = price;
        this.quantity_stock = quantity_stock;
        this.for_id = provider_id;

    }


}

module.exports = Product;