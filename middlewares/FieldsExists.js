const ServiceGeneric = require("../services/ServiceGeneric");
const ClienteSchema = require("../schemas/ClientSchema");

module.exports = async function(req, res, next){
    const {rg, cpf, email, celphone} = req.body;
    
    const ServiceObject = new ServiceGeneric();
    const findByEmail = await ServiceObject.findByGeneric("*", {email: email}, "client");
    const findByCpf = await ServiceObject.findByGeneric("*", {cpf: cpf}, "client");
    const findByRg = await ServiceObject.findByGeneric("*", {rg: rg}, "client");
    const findByCelphone = await ServiceObject.findByGeneric("*", {celphone: celphone}, "client");

    if(findByEmail.status == 
        false && findByCpf.status == false && findByRg.status == false && findByCelphone.status == false){
           
            try{
                await ClienteSchema.validate(req.body)
                     next();
             }catch(err){
                 res.status(400);
                 
                 err.errors.forEach(erro => {
                     res.send(erro);
                }); 
             }

    } 
     
    if(findByEmail.status){
        res.status(422);
        res.send("Já existe um usuario com esse email");
        return;  
    }
    
    if(findByCpf.status){
        res.status(422);
        res.send("Já existe um usuario com esse cpf");
        return;  
    }
     
    if(findByRg.status){
        res.status(422);
        res.send("Já existe um usuario com esse rg");
        return;
    }
    
    if(findByCelphone.status){
        res.status(422);
        res.send("Já existe um usuario com esse número");
        return;
    }

}
  

