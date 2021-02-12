const Product = require("../models/Product");
const ServiceGeneric = require("../services/ServiceGeneric");
const ProductService = require("../services/ProductService");

class ProductController {

    async create (req, res){

        const {description, price, quantity_stock, provider_id} = req.body;
        const ProductObj = new Product(description, price, quantity_stock, provider_id);
        const saveObj = await new ServiceGeneric().save(ProductObj, "product");

        if(saveObj.status){
            res.status(200).json({message: "Produto cadastrado com sucesso"});
        }else{
            res.status(401).json({message: "Error desconhecido"});
            console.log(saveObj.err)
        }

    }

    async update(req, res){
      const result = await new ServiceGeneric().update(req.body, "product", "Erro atualizar produto");

      if(result != undefined){
        if(result.status){
            res.json({message: "Tudo OK!"})
        }else{
            res.status(406).json(result.err);
        }
      }else{
          res.status(406).json({message : "Ocorreu um erro no servidor"});
      }

    }

    async index(req, res){
        
        const result = await ProductService.findAll();

        if(result.status){
            res.status(200).json(result.products);
        }else{
            res.status(401).json({message : "Não conseguimos listar os produtos"});
            console.log(result.err);
        }
        
    }

    async remove(req, res){
        const id = req.params.id;
        const productDelete = await new ServiceGeneric().delete("*", {id : id}, "product");
        if(productDelete.status){
            res.status(200).json({message: "Produto deletado com sucesso"});
        }else if(!productDelete.status){
            res.status(406).json({message: "Produto não encontrado"});
        }else{
            res.status(403).json({message: "Error desconhecido"})
        }

    }

    async findById(req, res){

        const id = req.body.id;
        const obj = await new ServiceGeneric().findByGeneric("*", {id : id}, "product");
        if(obj.status){
           res.json(obj.result);
        }else{
            res.status(404).json("Usuario não encontrado");
        }

    }

    async lowStock(req, res){
        const {id, qtd_new} = req.body;
        const result = await ProductService.lowStock(id, qtd_new);
        console.log(result);
        if(result.status){
            res.status(200).json("Produto atualizado");
        }else{
            result.status(404).json("Erro interno");
        }
    }

    async returnStockCurrent(req, res){
        const {id} = req.params;
        const result = await ProductService.returnStockCurrent(id);
        console.log(result.result[0].quantity_stock);
        if(result.status){
            res.status(200).json(result.result[0].quantity_stock);
        }else{
            res.status(404);
            console.log(result.err);
        }
    }

}

module.exports = new ProductController();