const { max } = require("../database/Connection");
const Connection = require("../database/Connection");
const ServiceGeneric = require("../services/ServiceGeneric");

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

    // async totalSaleDate(){
    //     try{
    //         const dates = await new ServiceGeneric().findAll("date_sales", "sales");
    //         console.log(dates.result.forEach(item=>{
    //             console.log(item);
    //         }));
    //         // let date = total_date.toString().split(' ')[0];
    //         // const totalSale = await Connection('sales')
    //         // .sum('total_venda')
    //         // .where({});
    //         // console.log(totalSale);
    //     }catch(err){
    //         return {status: false, err};
    //     }
        
    // }

    async totalSaleDate(date){
        
        try{

           const fields = await Connection("sales")
            .sum("total_venda")
           .whereBetween("date_sales", [`${date} 00:00:00`, `${date} 23:59:59`]);
           return {status: true, fields};

        }catch(err){
            return {status: false, err}
        }
    }


}

module.exports = SaleService;

