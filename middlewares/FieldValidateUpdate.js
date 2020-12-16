const ServiceGeneric = require("../services/ServiceGeneric");
const ClienteSchema = require("../schemas/ClientSchema");

module.exports = async function(req, res, next){
    const {rg, cpf, email, celphone} = req.body;
    
    const ServiceObject = new ServiceGeneric();
    
    const findByEmail = await ServiceObject.findByGeneric("*", {email: email}, "client");
    const findByCpf = await ServiceObject.findByGeneric("*", {cpf: cpf}, "client");
    const findByRg = await ServiceObject.findByGeneric("*", {rg: rg}, "client");
    const findByCelphone = await ServiceObject.findByGeneric("*", {celphone: celphone}, "client");

    if(findByEmail.status && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse email"});
        return;

    }else if(findByCpf.status && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse CPF"});
        return;  
    }else if(findByRg.status && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse RG"});
        return;

    }else if(findByCelphone.status && findByEmail.result[0].id != req.body.id){
        res.status(422).json({error: "Já existe um usuario com esse número de telefone"});
        return;

    }else{
        try{
            await ClienteSchema.validate(req.body)
                next();
         }catch(err){      
             err.errors.forEach(erro => {
                res.status(406).json({erro});
            }); 
         }
    }


}
  

