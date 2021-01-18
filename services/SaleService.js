const { max } = require("../database/Connection");
const Connection = require("../database/Connection");

class SaleService {

    async returnLastSale(){

        try{
            const lastIdSale = await Connection("sales").max("id");
            return lastIdSale[0].max;
        }catch(err){
            return {status: false, err};
        }

    }

    async findSalesDateInitFinal(date_init, date_final){
        try{

           const fields = await Connection("sales")
           .join("client", "client.id", "=", "sales.client_id")
           .select(["sales.id", "sales.date_sales", "client.name", "sales.total_venda"])
           .whereBetween("date_sales", [date_init, date_final]);
           console.log(fields);
           return {status: true, fields};

        }catch(err){
            return {status: false, err}
        }
    }


}

module.exports = SaleService;

