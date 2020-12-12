const Connection = require("../database/Connection");

class ServiceGeneric {

    async save(Obj, table){

        try{
            await Connection.insert(Obj).table(table);
        }catch(err){
            console.log("Erro na inserção " + err);
        }
    }

    async update(obj, table, conditional){
        const field = await this.findByGeneric("*", {id: obj.id}, table);

        

    }

    async findByGeneric(select, findObject, table){
    
        try{
            const result = await Connection.select(select).where(findObject).limit(1).table(table);
            if(result.length > 0){
                return {status: true, result};
            }else{
                return {status: false};
            }

        }catch(err){
            console.log("Error" + err);
        }
      
    }

}

module.exports = ServiceGeneric;