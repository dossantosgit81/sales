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

    async findSalesDateInitFinalTeste(date_init, date_final){
        try{
            //SELECT * FROM SALES WHERE CAST (DATE_SALES AS DATE) = '2021-01-29';
            //`select s.id, s.date_sales, s.total_venda from sales as s inner join client as c on(s.client_id = c.id) where CAST (date_sales as DATE) BETWEEN ${date_init} and ${date_final} ;`
            //console.log(fields.toQuery());
           const query = "select s.id, s.date_sales, s.total_venda from sales as s inner join client as c on(s.client_id = c.id) where CAST (date_sales as DATE) BETWEEN "+ "'" + date_init + "'" +" and " + "'" +date_final + "'";
           let fields = await Connection.raw(query);
           const arr = [];
           let teste = fields.rows.forEach(el=>{
               arr.push(el);
               
           });
           return {status: true, arr};

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

