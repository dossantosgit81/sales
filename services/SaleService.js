const { max } = require("../database/Connection");
const Connection = require("../database/Connection");

class SaleService {
//Comece da aula 11
    async returnLastSale(){

        try{
            const lastIdSale = await Connection("sales").max("id");
            return lastIdSale[0].max;
        }catch(err){
            return {status: false, err};
        }

    }


}

module.exports = SaleService;

