const Connection = require("../database/Connection");

class ItemsSalesService {

    async findItemsSales(id_sale){
        
        try{

           const fields = await Connection
           .select([
               "i.id",
               "p.description",
               "i.qtd",
               "p.price",
               "i.subtotal"
           ])
           .table("items_sales as i")
           .innerJoin("product as p", "i.product_id", "p.id")
           .where({"i.sale_id":id_sale});
          return {status: true, fields};

        }catch(err){
            return {status: false, err}
        }
    }


}

module.exports = ItemsSalesService;

