const Connection = require("../database/Connection");

class ProductService{

    async findAll(){

        try{
            const products = await Connection
            .select(
                [
                    "product.id as id", 
                    "product.description as descricao", 
                    "product.price as preco" ,
                    "product.quantity_stock as quantidade",
                    "provider.name as fornecedor",
                    "provider.id as id_fornecedor"
                ]).table("product")
            .innerJoin("provider", "product.provider_id", "provider.id");

            return {status : true, products};
        }catch(err){
            return {status: false, err};
        }

    }

    async lowStock(id, qtd_new){

        try{
            await Connection.update({quantity_stock: qtd_new}).where({id: id}).table("product");
            return {status: true};
        }catch(err){
            return {status: false, err};
        }

    }

    async returnStockCurrent(id){
        
        try{
            const result = await Connection.select("quantity_stock").where({id:id}).table("product");
            return {status: true, result};
        }catch(err){
            return {status: false, err};
        }

    }

}

module.exports = new ProductService();