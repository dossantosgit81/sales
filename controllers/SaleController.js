const ServiceGeneric = require("../services/ServiceGeneric");
const Sale = require("../models/Sale");
const SaleService = require("../services/SaleService");

class SaleController {

    async create(req, res){


        const now = new Date();
        const date_sale = `${now.getFullYear()}-${now.getMonth()+(1)}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`; 
 
        const total_sale = req.body.total_sale;
        const obs = req.body.obs;
        const client = req.body.client;
        const SaleObj = new Sale(client, date_sale, total_sale, obs);
        
        const result = await new ServiceGeneric().save(SaleObj, "sales");
        if(result.status){
            res.status(200);
        }else{
            console.log(result.err);
            res.status(404).json("Não conseguimos concluir a operação");
        }
    }

    async findByCpf(req, res){
        const cpf = req.body.cpf;
        const obj = await new ServiceGeneric().findByGeneric("*", {cpf : cpf}, "client");
        if(obj.status){
           res.json(obj.result);
        }
    }

}

module.exports = new SaleController();