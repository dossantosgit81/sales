const ServiceGeneric = require("../services/ServiceGeneric");
const SaleService = require("../services/SaleService");
const Items_sales = require("../models/Items_sales");

class ItemsSaleController {

	async create(req, res){
		const {sale_id, product_id, qtd, subtotal} = req.body;
		const obj = new Items_sales(sale_id, product_id, qtd, subtotal);
		const result = await new ServiceGeneric().save(obj, "items_sales");
		if(result.status){
			res.status(200).json("Operação concretizada com sucesso");
		}else{
			console.log(res.err);
			res.status(404).json("Erro na operação");
		}

	}

	async lastSale(req, res){

    	const idSale =  await new SaleService().returnLastSale();
    	res.status(200).json(idSale);
       
	}
}

module.exports = new ItemsSaleController();