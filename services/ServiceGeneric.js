const Connection = require("../database/Connection");

class ServiceGeneric {

    async save(Obj, table){

        try{
            await Connection.insert(Obj).table(table);
            return {status: true};
        }catch(err){
            return {status: false, err};
        }
    }

    async update(obj, table, message){

        const field = await this.findByGeneric("*", {id: obj.id}, table);

        if(field != undefined){
            try{            
               const field = await Connection.update(obj).where({id: obj.id}).table(table);
               return {status : true, field};
            }catch(err){
                return {status: false, err};
            }
        }else{
            return {status: false, err: message};
        }

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

    async findAll(fields, table){
        try{
            const result = await Connection.select(fields).table(table);
            return {status: true, result};
        }catch(err){
            return {status: false, err};
        }
    }

    async delete(select, findobject, table){
        try{
            const user = await this.findByGeneric(select, findobject, table);
            if(user.status){
                await Connection.delete().where(findobject).table(table);
                return {status: true};
            }else{
                return {status: false};
            }
        }catch(err){
            console.log(err);
        }

    }    

}

module.exports = ServiceGeneric;